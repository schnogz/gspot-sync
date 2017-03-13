// dependencies
const request = require('request');

module.exports = {
  test: (req, res) => {
    request({
      url: ''
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body));
      } else {
        res.send(response);
      }
    });
  }
};