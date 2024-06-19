# iceforge-asis
"As-is" plugin for the [Iceforge](https://github.com/caitlinsalt/iceforge) static site generator.

In operation, Iceforge processes files whose extensions (or names in general) match patterns it knows about, and passes other files through unchanged.

However, out of the box, Iceforge installs handlers for JSON and Markdown files which render them through templates, making it impossible for your site to deliver a file named `example.json` or `something.md`.

Enter `iceforge-asis`.  It lets you pass files through unchanged, aside from removing `.asis` from the filename.

## Usage

1. In your Iceforge site, install iceforge-asis with `npm i iceforge-asis`.
2. In your site `config.json`, add `iceforge-asis` to the plugins section.
3. Rename the JSON or MD files you need to deliver unchanged, by adding `.asis` to the extension.  For example, `example.json` becomes `example.json.asis`

Iceforge's build process will rename the file back to `example.json`, but will not process the file itself.

iceforge-asis is based on the [wintersmith-asis](https://github.com/luckyrandom/wintersmith-asis) plugin for the [Wintersmith](https://wintersmith.io/) static site generator, written by Chenliang Xu.
