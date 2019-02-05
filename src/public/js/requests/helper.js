var FetchHelpers = {
  status: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  },
  json: function(response) {
    return response.json();
  },
  errorHandler: function(res) {
    if(res.error) {
      return Promise.reject(new Error(res.error.message || res.error.name || 'Unhandled error message'));
    } else {
      return res;
    }
  },
  method: {
    post: 'POST',
    get: 'GET'
  },
  contentType: {
    json: 'application/json; charset=UTF-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

var Url = {
  build: function(base, params) {
    const paramList = [];
    for (let p in params) {
      paramList.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
    }
    return base + '?' + paramList.join('&');
  },
  getParams: function(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
}