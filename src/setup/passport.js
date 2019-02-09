import { Strategy as LocalStrategy} from 'passport-local';
import { findOne } from '../controllers/users';
import { signIn, signUp } from '../controllers/auth';
import passport from 'passport';
import session from 'express-session';
import config from '../config';

export default function(app) {

  var sessionConfig = { 
    secret: config.sessionSecret, 
    resave: true, 
    saveUninitialized: false,
    name: 'authjb.sid',
    cookie: {}
  };

  if ( config.envSecure === 'https' ) {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
  }

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser( (user, callback) => callback(null, user) );
  passport.deserializeUser( (user, callback) => findOne(user.email, callback) );
  
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    signIn({ email: email, password: password }, (error, user, message) => {
      done(error, user, message );
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    signUp({ email: email, password: password }, (error, user, message) => {
      done(error, user, message );
    });
  }));
}