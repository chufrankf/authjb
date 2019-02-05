import jwt from 'jsonwebtoken';
import db from '../models';
import bcrypt from 'bcryptjs';

// User has already had their email and password auth'd
// We just need to give them a token
exports.getToken = function(user, secret, duration) {
  return { token: jwt.sign(user, secret, { expiresIn: duration || '30m' }), user: user };
};

/*
 * email: email to login to
 * password: password to login with
 * callback: params {error, user, message}
 */
exports.signIn = function (body, callback) {
  const { email, password } = body;

  db.Users.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      if ( bcrypt.compareSync(password, user.password) ) {
        // Need to specify the user as an object before deleting a property
        // the result of the dbQuery is a SQL wrapped variable
        var userOut = Object.assign({}, user.get());
        delete userOut['password'];
        return callback(null, userOut );
      } else {
        return callback({ message: 'Unable to login. Invalid password' }, null );
      }
    } else {
      return callback({ message: 'Unable to login. Cannot find email'}, null );
    }
  }).catch( (error) => {
    return callback(error, null);
  });
};


/*
 * email: email to signup to
 * password: password to signup with
 * callback: params {error, user, message}
 */
exports.signUp = function (body, callback) {
  const { email, password } = body;
       
  var salt = bcrypt.genSaltSync(10);
  db.Users.create({
    email: email,
    password: bcrypt.hashSync(password, salt)
  }).then((user) => { 
    // Need to specify the user as an object before deleting a property
    // the result of the dbQuery is a SQL wrapped variable
    var userOut = Object.assign({}, user.get());
    delete userOut['password'];
    return callback(null, userOut); 
  }).catch((error) => {
    return callback(error);
  });
};