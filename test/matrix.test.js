// The Feature and Quality Matrix and the names of the clafers, in a page simulated by jsdom with the
// tool's jQuery and d3. Run with `npm test` in a tool's Server folder (jsdom is a dev dependency).
"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const client = path.join(__dirname, "..", "Client");

// a page with the matrix's table, and the scripts of the matrix
function page() {
    const dom = new JSDOM('<!DOCTYPE html><div id="mdFeatureQualityMatrix"><div id="table"></div></div>',
        { runScripts: "outside-only", pretendToBeVisual: true });
    const window = dom.window;
    // as the tools serve them, from node_modules
    for (const lib of ["jquery", "d3"])
        window.eval(fs.readFileSync(require.resolve(lib), "utf8"));
    window.$.resizeWindow = function () {};
    for (const file of ["init.js", "visualizers/table_visualizer.js", "model/clafer_processor.js",
                        "modules/md_feature_quality_matrix.js"])
        window.eval(fs.readFileSync(path.join(client, file), "utf8"));
    return window;
}

// the matrix of a tool with the given settings, with the variants 1 and 2
function matrix(window, settings) {
    const calls = [];
    const record = name => function (module, id) { calls.push([name, id]); };
    const m = new window.FeatureQualityMatrix({ loaded() {} }, Object.assign({
        title: "Feature and Quality Matrix",
        layout: {},
        onSelected: record("selected"),
        onDeselected: record("deselected"),
        onMouseOver: record("over"),
        onMouseOut: record("out"),
        onInstanceRemove: record("removed")
    }, settings));
    m.onDataLoaded({ title: "Variants", matrix: [{ id: 1 }, { id: 2 }], instanceIds: [1, 2],
                     instanceCount: 2, instanceMatch: 2, fields: [], fieldsWithChildren: [] });
    m.onRendered();
    return { m, calls };
}

function click(window, element) {
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
}

// The removal button of a variant is in its heading, which selects the variant on a click: the
// button's click reached the heading too and selected the removed variant, on which
// ClaferMooVisualizer's Spider Chart then failed.
test("removing a variant does not select it", () => {
    const window = page();
    const { calls } = matrix(window, {});
    click(window, window.document.getElementById("table-rem2"));
    assert.deepStrictEqual(calls, [["removed", "2"]]);
    assert.ok(!window.document.getElementById("table-th2"), "the variant's column is removed");
    click(window, window.document.getElementById("table-th1"));
    assert.deepStrictEqual(calls.at(-1)[0], "selected", "a click on a heading selects its variant");
});

// The Configurator has no selection of variants (instancesSelectable: false) and gives no
// onSelected: a click on a heading raised "onSelected is not a function". Hovering still
// highlights the column.
test("the headings of a tool without selection are not selectable", () => {
    const window = page();
    const settings = { instancesSelectable: false, onSelected: undefined, onDeselected: undefined };
    const { calls } = matrix(window, settings);
    const heading = window.document.getElementById("table-th1");
    const errors = [];
    window.addEventListener("error", e => errors.push(e.message));
    click(window, heading);
    assert.deepStrictEqual(errors, []);
    assert.ok(!calls.some(([name]) => name === "selected" || name === "deselected"), JSON.stringify(calls));
    heading.dispatchEvent(new window.MouseEvent("mouseover", { bubbles: true }));
    assert.deepStrictEqual(calls.at(-1)[0], "over");
    assert.ok(heading.classList.contains("over"), "hovering highlights the column");
});

// Since Clafer 0.5.7 the UID of a clafer is its name, qualified only where a name is not unique
// (x__size). The names were cut: c<digits>_ was removed from them, as from the UIDs c0_size of
// earlier versions, which also cut abc_def to abdef.
test("the clafers are shown by their UIDs as they are", () => {
    const window = page();
    const processor = Object.create(window.ClaferProcessor.prototype);
    assert.strictEqual(processor.claferFilter("total_cost"), "total_cost");
    assert.strictEqual(processor.claferFilter("abc_def"), "abc_def");
    const table = Object.create(window.TableVisualizer.prototype);
    assert.strictEqual(table.filterClaferValue("abc_def"), "abc_def");
    assert.strictEqual(table.filterClaferValue("Phone__abc_def$0"), "Phone__abc_def");
    assert.strictEqual(table.prettifyPath("root-Phone-abc_def"), "Phone.abc_def");
});
