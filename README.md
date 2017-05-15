# spotify-concert-playlists
[![Dependencies](https://david-dm.org/schnogz/spotify-concert-playlists.svg)](https://david-dm.org/schnogz/spotify-concert-playlists.svg)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/schnogz/spotify-concert-playlists/issues)

## Overview
A web app that creates Spotify playlists filled with tunes from bands that will soon be in the users
current or chosen location.

## Setup
* Run `npm install`

## Local Development
* Run `npm run dev` to fire up Webpack
* In another terminal window run `npm start` to start electron

## Running Production
* Run `npm run postinstall` to compile all your assets into `dist/bundle.js`
* Change the script tag in `dist/index.html` to use `bundle.js` as its source
* Run `npm start` to start electron
