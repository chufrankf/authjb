import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

export default function(app) {
  // Handlebars
  app.use(express.static(path.join(__dirname, '../public')));
  app.set('views', path.join(__dirname, '../views'));

  var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts/'),
    partialsDir: path.join(__dirname, '../views/partials/')
  });

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

}