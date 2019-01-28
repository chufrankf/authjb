import authRouters from '../routers/auth';

export default function(app) {
  // Log all requests
  app.use( (req, res, next) => { 
    console.log('INFO|Request URL: ' + req.method + ' - ' + req.url);
    next(); 
  });

  // Attach authentication routers
  authRouters(app);

}