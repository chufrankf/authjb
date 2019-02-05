// results should always be in the form of {error = {message, name}, result = {}, message = "", res}
// include res so that we can make a res.json call
exports.handleCallbackAsJson = (error, result, message, res) => {
  let output = {};

  if( error ) {
    if( error.name || error.message ) {
      output.error = { name: error.name, message: error.message };
    }
    else {
      output.error = { message: 'An unhandled error occurred. Please ask an administrator for assistance.' };
    }
  }

  if( result ) {
    output.result = result;
  }

  if( message ) {
    output.log = message;
  }

  return res.json(output);
};

exports.handleErrorAsJson = (error, req, res, next) => {
  var output = {};
  
  if( res.headersSent ) {
    return next(error);
  }

  if( error.name || error.message ) {
    output.error = { name: error.name, message: error.message };
    res.json(output);
  }
  else {
    output.error = { message: 'An unhandled error occurred. Please ask an administrator for assistance.' };
    res.status(400).json(output);
  }
};
