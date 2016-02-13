# HBBP

## Index

<!-- MarkdownTOC -->

- [Overview](#overview)
- [Quickstart](#quickstart)
- [Boilerplate structure](#boilerplate-structure)
- [Server side features](#server-side-features)
    - [Harp](#harp)
    - [Makefile](#makefile)
    - [Main LESS file](#main-less-file)
    - [Gulpfile](#gulpfile)
- [License](#license)

<!-- /MarkdownTOC -->


## Overview

**HBBP** *(Harp Bootstrap BoilerPlate)* is a multi-purpose [Harp](http://harpjs.com/) boilerplate that use [Bower](http://bower.io) to install the assets, a **Main LESS file** that import the necessary style-sheets, an small [Gulp](http://gulpjs.com/) file to automatize deployment the project and a **Makefile** to copy the required JS libraries to the proper place. 

> **NOTE** This boilerplate only aims to offer a structure to start working with Bootstrap, LESS and layouts in seconds. There isn't any customized CSS or JS.

The assets installed are:

* [jQuery](http://jquery.com/), a fast, small, and feature-rich JavaScript library.
* [Twitter Bootstrap](http://getbootstrap.com/), the most popular front-end framework for developing responsive, mobile first projects on the web.
* Recommended libraries for old browser compatibility: [html5shiv](https://github.com/aFarkas/html5shiv) and [respond](https://github.com/scottjehl/Respond).

Optional assets:

* [Font-Awesome](http://fontawesome.io/), the iconic font designed for Bootstrap.
* [Bootswatch themes](http://bootswatch.com/), some free themes for Bootstrap that you can easily change in the [main.less](public/assets/css/main.less) file.
* [HighlightJS](https://highlightjs.org/), a JS library to prettify your code blocks.

![snapshot](public/assets/images/snapshot.jpg)

## Quickstart

Clone this repo, then install [NodeJS](http://nodejs.org/), [Bower](http://bower.io), [Gulp](http://gulpjs.com) and [Harp](http://harpjs.com). After that you can download the project dependencies and start the Harp server. If your OS have a SHELL, you can do all this throught the `Makefile` with this commands:

```bash
$ git clone https://github.com/isidrorg/hbbp # Clone repository
$ make harp       # Install NodeJS, NPM, Bower, Gulp and Harp
$ make install    # Install project dependencies
$ harp server     # Start Harp server
```

Installation complete!!!, go to <http://localhost:9000> and take a look.

## Boilerplate structure

This is the structure of the project:

```bash
hbbp/
├── bower_components/             # Installed dependences via Bower
├── public/                       # The source documents of the project
│   ├── assets/
│   │   ├── css/                    # Main LESS file and LESS includes
│   │   ├── fonts/                  # Iconic fonts (Glyphicons and Font-Awesome)
│   │   ├── img/                    # Images
│   │   │   ├── tile-wide.png         # Tiles images for Metro UI
│   │   │   └── tile.png            
│   │   └── js/                     # JS libraries
│   │       ├── lib/                # Vendor JS copied from Bower installation
│   │       │   ├── jquery.js         # Source lib for debug
│   │       │   ├── jquery.min.js     # Compressed version for production
│   │       │   └── ...
│   │       └── main.js
│   ├── _partials/                  # Some useful partials
│   ├── blog/                       # Blog section of the website
│   │   ├── 
│   │   └── 
│   ├── doc/                        # Documentation section of the website
│   │   ├── 
│   │   └── 
│   ├── 404.html                    # An error page
│   ├── _data.json                  # Data propierties of this folder
│   ├── _layout.jade                # Default layout
│   ├── 404.html                    # An error page
│   ├── apple-touch-icon-precomposed.png   # Icon of the website
│   ├── browserconfig.xml           # Add tiles in IE in the new Windows UI
│   ├── crossdomain.xml             # Grants permission to handle data across  domains
│   ├── favicon.ico                 # Small icon for web explorers
│   ├── humans.txt                  # Responsible & technology colophon
│   ├── index.jade                  # Initial document
│   ├── robots.txt                  # Grants user agent permission to visit website
│   └── sitemap.xml.jade            # Report website pages to search engines
├── www/                          # The compiled documents of the project
├── bower.json                    # Indicate Bower packages to install
├── harp.json                     # Data propierties of the project
└── Makefile                      # Helpful script to install the project
```


## Server side features

### Harp

Run `harp` to see the avaliable commands of the Harp server. Commonly you will use:

- `harp server` to start a local server on <localhost:9000>
- `harp compile` to build the static website with HTML, CSS and JS.

### Makefile

Run `make` to see the avaliable commands in the `Makefile`:

```text
  Avaliable commands

  Commands:

    install      Install NPM and Bower dependencies of this project
    clean        Remove installed NPM and Bower dependecies
    chmod        Change files and directory permissions to 750 and 640
    initBranch   Build hosted web branch (default: gh-pages)
    harp         Install NodeJS, Bower, Gulp and Harp (Ubuntu/Debian)

  Usage: make <command>
```

### Main LESS file

Maybe the `main.less`, along with the `Makefile`, are the most particular files of this boilerplate. Then, let's take a look to the `main.less` file:

```js
//
// Main LESS file
// --------------------------------------------------------

// Paths
@bower: "../../../bower_components";

// Twitter Bootstrap <http://getbootstrap.com/>
// A copy oh the Bootstrap main file to personalize the framework easily.
// Default: all selected except glyphicons (replaced with Font-Awesome)
@import "@{bower}/bootstrap/less/bootstrap.less";

// Bootswatch themes <http://bootswatch.com/>
// @import "@{bower}/bootswatch/THEME/bootswatch.less";
// @import "@{bower}/bootswatch/THEME/variables.less";

// Font-Awesome <http://fontawesome.io/>
// @import "@{bower}/font-awesome/less/font-awesome.less";

// HighlightJS <http://highlightjs.org/>
// @import (less) "@{bower}/highlightjs/styles/github.css";

// Your custom CSS or LESS files
@import "_variables.less";
@import "_mixins.less";
@import "_base.less";
@import "_utilities.less";
```

As you can see the vendor LESS files are required from the `bower_components` directory. That's because when you compile the project, with `harp compile`, the obtained CSS file will have everything so it isn't necessary and it's more easy to upgrade the dependences by this way.

### Gulpfile

If you are interested to deploy your compiled project via Git, the `gulpfile` will help you to do it fast and easy. 

First, you need to configure `harp.json` to set `remoteRepository`  with the remote url of your repo, after that you can run `make initBranch` to create the web branch in your remote repository. 

Then you only need to run `gulp deploy` every time you want to update the website.

**HAVE FUN**

## License

The MIT License (MIT)

Copyright (c) 2014 Isidro Rodríguez González

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.