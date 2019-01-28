import db from '../models';

/*
 * email: email to search for in Users Database
 * callback: params {error, user, message}. 
 * If success errors will be null, if fail user will be null.
 */
exports.findOne = function(email, callback) {
  db.Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      // Need to specify the user as an object before deleting a property
      // the result of the dbQuery is a SQL wrapped variable
      var userOut = Object.assign({}, user.get());
      delete userOut['password'];
      return callback(null, userOut);
    } else {
      return callback({ message: 'User email not found' }, null);
    }
  }).catch( (error) => {
    return callback(error, false);
  });
};