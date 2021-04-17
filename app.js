const express = require('express');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');
var morgan = require('morgan');

const logger = () => {
  return (req, res, next) => {
    console.log(`method: ${req.method} path: ${req.url}`);
    next();
  };
};

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Register helper
hbs.registerHelper('grettings', function (language, options) {
  switch (language) {
    case 'en':
      return 'Welcome';
    case 'fr':
      return 'Bienvenue';
    default:
      return 'Welcome';
  }
});

// app.use(morgan('combined'));

app.get('/', (req, res, next) => {
  console.log('get');
  next();
});
// app.post((req, res, next) => {
//   console.log('post');
//   next();
// });

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/about', (req, res, next) => {
  // Obtener datos de la base de datos
  const user = {
    name: 'Thor',
    job: 'Teacher',
    img: 'google/cdjc.jpg',
    language: 'fr',
    hobbies: [
      {
        name: 'Coding',
        description: 'This is a cool hobby',
      },
      { name: 'Flags', description: 'This is a cool hobby' },
      { name: 'Travelling', description: 'This is a cool hobby' },
    ],
  };
  res.render('about', user);
});

app.get('/products/add', (req, res) => {
  res.send('/products/add');
});

// detalle de un producto
// http://dominio/products/12312?test1=value&test2=value2
app.get('/products/:id', (req, res, next) => {
  res.send(
    `product ${req.params.id} query ${req.query.test1} ${req.query.test2}`
  );
});

app.get('/form', (req, res, next) => {
  meta;
  res.render('form', { meta });
});

app.post('/create-user', (req, res, next) => {
  res.send(`name ${req.body.name} ${req.body.lastName}`);
});

app.use((req, res) => {
  res.status(404);
  res.send('Not Found');
});

app.use((error, req, res, next) => {
  res.send(`error ${error}`);
});

app.listen(3000, () => {
  console.log(chalk.bgCyan.black('Server listening on port 3000'));
});
