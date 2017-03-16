// dependencies
const SpotifyWebApi = require('spotify-web-api-node');

var redirect_uri = 'http://localhost:3000/loginCallback';  // login callback URL
var scopes = ['user-read-private', 'user-read-email'];     // requested privileges

var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

module.exports = {
  login: (req, res) => {
    // create the authorization URL
    var state = 'spotify_auth_state';
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    res.cookie('state', state);

    // redirect to authorization URL
    res.redirect(authorizeURL);
  },
  loginCallback: (req, res) => {
    var code = req.query.code || null;
    //var state = req.query.state || null;
    //var storedState = req.cookies ? req.cookies['state'] : null;

    // retrieve and store the access token and a refresh token
    spotifyApi.authorizationCodeGrant(code)
      .then(function(data) {
        // set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        res.send({
          access_token: spotifyApi.getAccessToken(),
          refresh_token: spotifyApi.getRefreshToken()
        });
      }, function(err) {
        console.log('Something went wrong with login callback!', err);
      });
  },
  refreshAccessToken: (req, res) => {
    spotifyApi.refreshAccessToken()
      .then(function(data) {
        // save the new access token
        spotifyApi.setAccessToken(data.body['access_token']);
      }, function(err) {
        console.log('Could not refresh access token', err);
      });
  }
};
