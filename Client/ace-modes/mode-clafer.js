ace.define('ace/mode/clafer', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/clafer_highlight_rules', 'ace/mode/folding/clafer'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var ClaferHighlightRules = require("./clafer_highlight_rules").ClaferHighlightRules;

var FoldMode = require("./folding/clafer").FoldMode;

var Mode = function() {
    this.HighlightRules = ClaferHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
       
    this.lineCommentStart = ["//"];
    this.blockComment = [
        {start: "/*", end: "*/"}
    ];
    
}).call(Mode.prototype);

exports.Mode = Mode;
});ace.define('ace/mode/clafer_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

// The same tokens as the TextMate grammar of the VS Code extension (clafer-vscode,
// syntaxes/clafer.tmLanguage.json): keep the two in step. Names may contain apostrophes
// (x'), so words are delimited by (?<![\w']) and (?![\w']), not \b.
var ClaferHighlightRules = function() {

    var word = function(words) {
        return "(?<![\\w'])(?:" + words + ")(?![\\w'])";
    };

    this.$rules = {
        start: [
            { token: ["keyword.other.directive.clafer", "text", "keyword.other.directive.clafer", "variable.parameter.option.clafer"],
              regex: "^(//#)( )(OPTIONS|FRAGMENT|GRAPH|STATS|SUMMARY)(.*)$" },
            { token: "comment.line.double-slash.clafer", regex: "//.*$" },
            { token: "comment.block.clafer", regex: "/\\*", next: "blockComment" },
            { token: "keyword.other.embedded.clafer", regex: "\\[(?:alloy|choco)\\|", next: "embedded" },
            { token: "string.quoted.double.clafer", regex: "\"", next: "string" },
            { token: "constant.numeric.clafer", regex: "\\b\\d+(?:\\.\\d+(?:e-?\\d+)?)?\\b" },
            { token: "storage.modifier.clafer", regex: word("abstract|initial|final|finalref|finaltarget") },
            { token: "keyword.other.clafer", regex: word("enum|assert|minimize|maximize") },
            { token: "keyword.control.clafer", regex: word("if|then|else|let") },
            { token: "keyword.control.temporal.clafer",
              regex: word("never|sometime|lonce|always|must|precede|follow|initially|finally|until|weakuntil|eventually|globally|next|before|after|between|U|W|F|G|X") },
            { token: "keyword.operator.word.clafer", regex: word("xor|or|mux|opt|all|disj|no|not|lone|one|some|in|and") },
            { token: "support.function.clafer", regex: word("sum|product|min|max") },
            { token: "variable.language.clafer", regex: word("this|parent|dref|root|children") },
            { token: "support.type.clafer", regex: word("clafer|int|integer|decimal|string|real|double|boolean") },
            { token: "identifier", regex: "[A-Za-z_][\\w']*" },
            { token: "keyword.operator.clafer",
              regex: "\\]->>|-->>|\\]->|-->|<=>|->>|-\\[|->|<:|:>|&&|\\|\\||\\+\\+|\\*\\*|--|:=|!=|>=|<=|=>|\\.\\.|<<|>>|[#?*+:\\-/%.\\\\,=<>!&|;`]" },
            { token: "paren.clafer", regex: "[\\[\\]{}()]" }
        ],
        blockComment: [
            { token: "comment.block.clafer", regex: "\\*/", next: "start" },
            { defaultToken: "comment.block.clafer" }
        ],
        embedded: [
            { token: "keyword.other.embedded.clafer", regex: "\\|\\]", next: "start" },
            { defaultToken: "text" }
        ],
        string: [
            { token: "constant.character.escape.clafer", regex: "\\\\[\"\\\\nt]" },
            { token: "invalid.illegal.escape.clafer", regex: "\\\\." },
            { token: "string.quoted.double.clafer", regex: "\"", next: "start" },
            { defaultToken: "string.quoted.double.clafer" }
        ]
    };

    this.normalizeRules();
};

oop.inherits(ClaferHighlightRules, TextHighlightRules);

exports.ClaferHighlightRules = ClaferHighlightRules;
});

// folding by indentation (the coffee folding of Ace 1.1)
ace.define('ace/mode/folding/clafer', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode', 'ace/range'], function(require, exports, module) {


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }

        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);

});
