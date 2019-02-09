import projects from '../config/projects';
import querystring from 'querystring';
import { getToken } from '../controllers/auth';
import { findOne as findClient } from '../controllers/clients';

export default function(app) {
  // Frontdoor Routers

  // localhost:9000
  // renders the home screen with all projects
  app.get('/', (req, res) => res.render('home', {projects: projects, user: req.user}) );

  // localhost:9000/login
  // If we are logged in, and the query contains a redirect with clientId, redirect back with the token
  // Otherwise if we are logged in, render the home screen
  // If not logged in, render the login screen
  app.get('/login', (req, res) => {
    const target = req.query.redirect;
    const client = findClient(req.query.clientId);
    
    if( req.user && target && client ) {
      res.redirect( decodeURIComponent(target) + '?' + querystring.stringify({ token: getToken(req.user, client.secret) }));
    } else if (req.user) {
      res.render('home', {projects: projects, user: req.user});
    } else {
      res.render('auth/signin', {signup: false, user: req.user});
    }
  });
  
  // localhost:9000/signup
  // Renders the signup screen. 
  // Notice that the handlebars page is the same as the login but with signup variable as true.
  app.get('/signup', (req, res) => res.render('auth/signin', {signup: true, user: req.user}) );
}