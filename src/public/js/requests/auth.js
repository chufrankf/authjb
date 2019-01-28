// requires helper.js
var AuthRequests = {
  //body: email, password, clientId
  login: function(body, callback) {

    fetch('/api/auth/local/login', {
      method: FetchHelpers.method.post,
      headers: {
        'Content-type': FetchHelpers.contentType.json
      },
      body: JSON.stringify(body)
    }).then(FetchHelpers.status)
      .then(FetchHelpers.json)
      .then( function(res) {
        callback( null, res.result, res.log );
      })
      .catch( function(msg) {
        console.log('UI Error: ' + msg);
        callback( msg );
      });
  },
  //body: email, password, clientId
  signup: function(body, callback) {

    fetch('/api/auth/local/signup', {
      method: FetchHelpers.method.post,
      headers: {
        'Content-type': FetchHelpers.contentType.json
      },
      body: JSON.stringify(body)
    }).then(FetchHelpers.status)
      .then(FetchHelpers.json)
      .then( function(res) {
        callback( null, res.result, res.log );
      })
      .catch( function(msg) {
        callback( msg );
      });
  },

};