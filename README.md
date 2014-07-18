ClaferToolsUICommonPlatform
===========================

v0.3.6.1

A superset platform used as a submodule by all the three Clafer Web Tools: [ClaferIDE](https://github.com/gsdlab/ClaferIDE), [ClaferMooVisualizer](https://github.com/gsdlab/ClaferMooVisalizer) and [ClaferConfigurator](https://github.com/gsdlab/ClaferConfigurator).

Contributors
------------

* [Alexandr Murashkin](http://gsd.uwaterloo.ca/amurashk), MMath Candidate. Main developer.

Getting Clafer Tools
--------------------

Binary distributions of the release 0.3.6.1 of Clafer Tools for Windows, Mac, and Linux, 
can be downloaded from [Clafer Tools - Binary Distributions](http://http://gsd.uwaterloo.ca/clafer-tools-binary-distributions). 

Installation
------------

The platform should be installed as a Git submodule into `Server/commons` folder of [ClaferIDE](https://github.com/gsdlab/ClaferIDE), [ClaferMooVisualizer](https://github.com/gsdlab/ClaferMooVisalizer), and [ClaferConfigurator](https://github.com/gsdlab/ClaferConfigurator).

1. in the root folder of the host project, execute
	* `git submodule init`
	* `git submodule update`
	* `git submodule foreach checkout master`

2. in the host project's source files, you can use the capabilities, components and functions of the platform. See files named `Server/Client/configuration.js` of the three listed projects as examples.

Upgrading to the latest platform
--------------------------------

* In your project folder, execute
	* `git submodule foreach pull`

The changes will be pulled and merged into your local repository.

Commiting changes made to the platform
--------------------------------

If you make changes to the files in `Server/commons` folder, you can save them into the platform.

* In your project folder, execute
	* `git submodule foreach add .`
	* `git submodule foreach commit -m "<commit message>"` 
	* `git submodule foreach push`

After that, your chagnes to the platform will be saved online. Then, you can propagate changes to the rest of the tools by following the `Upgrading to the latest platform` steps described above.

### Important: Branches must correspond

All related projects are following the *simultaneous release model*. 
The branch `master` contains releases, whereas the branch `develop` contains code under development. 
When building the tools, the branches should match.
Releases from branches `master` are guaranteed to work well together.
Development versions from branches `develop` should work well together but this might not always be the case.

Need help?
==========
* See [clafer.org](http://clafer.org) for news, technical reports and more
  * Check out a [Clafer tutorial](http://t3-necsis.cs.uwaterloo.ca:8091/Tutorial/Intro)
  * Try a live instance of [ClaferWiki](http://t3-necsis.cs.uwaterloo.ca:8091)
  * Try a live instance of [ClaferIDE](http://t3-necsis.cs.uwaterloo.ca:8094)
  * Try a live instance of [ClaferConfigurator](http://t3-necsis.cs.uwaterloo.ca:8093)
  * Try a live instance of [ClaferMooVisualizer](http://t3-necsis.cs.uwaterloo.ca:8092)
* Take a look at (incomplete) [Clafer wiki](https://github.com/gsdlab/clafer/wiki)
* Browse example models in the [test suite](https://github.com/gsdlab/clafer/tree/master/test/positive) and [MOO examples](https://github.com/gsdlab/clafer/tree/master/spl_configurator/dataset)
* Post questions, report bugs, suggest improvements [GSD Lab Bug Tracker](http://gsd.uwaterloo.ca:8888/questions/). Tag your entries with `clafer` (so that we know what they are related to) and with `jimmy-liang` or `michal` (so that Jimmy or Michał gets a notification).
