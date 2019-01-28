import passport from 'passport';
import { getToken } from '../../controllers/auth';
import { findOne as findClient } from '../../controllers/clients';
import { handleCallbackAsJson } from '../handlers';

export default function(app) {

  // Test Authentication
  app.get('/api/auth/version', (req, res) => { 
    handleCallbackAsJson(null, { version: 'Jibaga.REST.v1.0', email: req.user }, null, res); 
  });
  
  // ----- Authentication -----
  // localhost:9000/api/auth/local/login POST
  // input: body {
  //  email: String!
  //  password: String!
  //  clientId: String
  // }
  // action: log the user in, when a client Id exists, 
  //         get the token off the clientSecret. Otherwise just login in
  // results: returns the login token or an error
  app.post('/api/auth/local/login', passport.authenticate('local-login'), (req, res) => {
    const client = findClient(req.body.clientId);
    var result = client ? getToken(req.user, client.secret) : req.user ;
    var message = req.user ? 'Login successful' : 'Login failed';
    handleCallbackAsJson( null, result, message, res);
  });
  
  // localhost:9000/api/local/signup POST
  // input: body {
  //  email: String!
  //  password: String!
  //  clientId: String
  // }
  // action: Adds the user to the database, when the clientId eists, 
  //         get the token off the clientSecret. Otherwise just login in
  // results: Returns the login token or an error, 
  app.post('/api/auth/local/signup', passport.authenticate('local-signup'), (req, res) => {
    const client = findClient(req.body.clientId);
    var result = client ? getToken(req.user, client.secret) : req.user ;
    var message = req.user ? 'Signup successful' : 'Signup failed';
    handleCallbackAsJson( null, result, message, res);
  });

  // localhost:9000/api/logout POST
  // action: destroys the current session
  // results: logout successful message
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(() => (
      handleCallbackAsJson( null, null, 'Logout successful', res ) )
    );
  });

  // localhost:9000/api/auth/token GET
  // action: get the current user token if based off the client Id
  app.get('/api/auth/token', (req, res) => {
    const client = findClient(req.body.clientId);
    var result = req.user && client ? getToken(req.user, client.secret) : null ;
    var message = req.user ? ( result ? null : 'No clientId given' ) : 'User is not logged in' ;
    handleCallbackAsJson( null, result, message, res);
  });
}