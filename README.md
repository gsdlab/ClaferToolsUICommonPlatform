ClaferToolsUICommonPlatform
===========================

v0.4.2

A superset platform used as a submodule by all the three Clafer Web Tools: [ClaferIDE](https://github.com/gsdlab/ClaferIDE), [ClaferMooVisualizer](https://github.com/gsdlab/ClaferMooVisualizer) and [ClaferConfigurator](https://github.com/gsdlab/ClaferConfigurator).

Contributors
------------

* [Alexandr Murashkin](http://gsd.uwaterloo.ca/amurashk). Main developer.
* [Eldar Khalilov](http://gsd.uwaterloo.ca/ekhalilov). Developer. Upgrade to 0.4.2 (replace XML with JSON, test suites).

Installation
------------

### Platform

The platform should be installed as a Git submodule into `Server/commons` folder of [ClaferIDE](https://github.com/gsdlab/ClaferIDE), [ClaferMooVisualizer](https://github.com/gsdlab/ClaferMooVisualizer) and [ClaferConfigurator](https://github.com/gsdlab/ClaferConfigurator).

* in the root folder of the host project, execute

```
git submodule init
git submodule update
git submodule foreach git checkout master
```

When working with a branch other then `master`, you need to checkout that branch in the last command above.

Now, in the host project's source files, you can use the capabilities, components and functions of the platform. See files named `Server/Client/configuration.js` of the three listed projects as examples.

### Backends

This installation procedure applies to all three web tools, which use the same backends installed into some location `<bin>` found on `PATH`.

* Getting Binaries

Binary distributions of the release 0.4.2 of Clafer Tools for Windows, Mac, and Linux, can be downloaded from [Clafer Tools - Binary Distributions](http://http://gsd.uwaterloo.ca/clafer-tools-binary-distributions). There you can get binaries for `Clafer Compiler`, `ClaferIG` and the `ClaferChocoIG` backend.

The fastest way is to unzip a binary distribution into the folder `<bin>`.  
By default, `<bin>=/home/clafertools040`

* Install [ClaferIG](https://github.com/gsdlab/claferIG) following the installation instructions into `<bin>`.

* Install [ClaferChocoIG](https://github.com/gsdlab/ClaferChocoIG) following the installation instructions into `<bin>`.

Upgrading to the latest platform
--------------------------------

* in your project folder, execute
    * `git submodule foreach git pull`

The changes will be pulled and merged into your local repository.

Commiting changes made to the platform
--------------------------------

If you make changes to the files in `Server/commons` folder, you can save them into the platform.

* in your project folder, execute
    * `git submodule foreach add <filename>`
    * `git submodule foreach commit -m "<message>"`
    * `git submodule foreach push`

After that, your chagnes to the platform will be saved online. Then, you can propagate changes to the rest of the tools by following the [Upgrading to the latest platform](#upgrading-to-the-latest-platform) steps described above.

### Important: Branches must correspond

All related projects are following the *simultaneous release model*.
The branch `master` contains releases, whereas the branch `develop` contains code under development.
When building the tools, the branches should match.
Releases from branches `master` are guaranteed to work well together.
Development versions from branches `develop` should work well together but this might not always be the case.

Need help?
==========

* Visit [language's website](http://clafer.org).
* Report issues to [issue tracker](https://github.com/gsdlab/ClaferToolsUICommonPlatform/issues)
