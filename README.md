# SuperScreenPi

This application provides the web stack required to run SuperScreenPi. By default it opens https://superscreenpi.github.io/launcher and allows you to use the system out-of-the-box.

## Installation

You can pull pre-build binaries for:

 - Debian-based linux (x64 and arm64)
 - Windows x64
 - Mac OS

Check out the [releases](https://github.com/superscreenpi/superscreenpi/releases/latest).

## Command Line Options

`--fullscreen`: open the interface in fullscreen mode.

### Development

To work on this project, you need:

 - Node.js
 - npm
 - yarn

**Update dependencies:** `yarn install`

**Start for development:** `yarn start`

**Build distributable bundle:** `yarn build`

### Release

To make a new release you:

1. If it doesn't exist yet, create a [draft release](https://github.com/superscreenpi/superscreenpi/releases/new).
For "Tag version" you enter the version number from `package.json` prefixed with a `v`. So: `v1.2.3`
2. Merge all features that should be in the release.
3. Once all builds are complete, publish the release.
