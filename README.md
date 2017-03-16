# gspot-sync
An Electron app to manage and sync playlists between Google Play Music and Spotify


## Setup
* Run `npm install`

## Local Development
* Run `npm run dev` to fire up Webpack
* In another terminal window run `npm start` to start electron

## Running Production
* Run `npm run postinstall` to compile all your assets into `dist/bundle.js`
* Change the script tag in `dist/index.html` to use `bundle.js` as its source
* Run `npm start` to start electron
