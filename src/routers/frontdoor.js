export default function(app) {
  // Frontdoor Routers
  app.get('/', (req, res) => res.render('home', {user: req.user}) );
  app.get('/login', (req, res) => res.render('auth/signin', {signup: false, user: req.user}) );
  app.get('/signup', (req, res) => res.render('auth/signin', {signup: true, user: req.user}) );
}