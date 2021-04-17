const express = require('express');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// Register helper
hbs.registerHelper('grettings', function(language, options){
  console.log(options);
  switch(language){
    case "en":
      return "Welcome"
    case "fr":
      return "Bienvenue"
    default:
      return "Welcome"
  }
})

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/about', (req, res, next) => {
  // Obtener datos de la base de datos
  const user = {
  name: "Thor",
  job: "Teacher",
  img: "google/cdjc.jpg",
  language: "fr",
  hobbies: [{ 
    name: "Coding",
    description: "This is a cool hobby" },
   { name: "Flags",
     description: "This is a cool hobby"},
  { name: "Travelling",
    description: "This is a cool hobby"}]
}
  res.render('about', user);
});

app.listen(3000, () => {
  console.log(chalk.bgCyan.black('Server listening on port 3000'));
});