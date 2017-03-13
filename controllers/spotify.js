// dependencies
const request = require('request');

module.exports = {
  // fetches current BTC price across multiple exchanges
  // using X-testing header allows for 100 requests per 24 hours
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