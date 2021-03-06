const express = require('express');
const chalk = require('chalk');
const PORT = process.env.PORT || 3000
const app = express();
app.set('view engine', 'hbs');

require('dotenv').config();


const database = require('./conf');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Ruta GET para ver todas las jugadoras
app.get('/', (req, res)=>{
  database.query('SELECT * FROM jugadoras_femenino', (error, results)=>{
    if(error){
      res.send(error)
    } else {
      res.send(results)
    }
  })
})

//Ruta GET para crear una nueva jugadora
app.get('/crear-jugadora', (req, res)=>{
  res.render('crear-jugadora')
})

//Ruta POST para crear una nueva jugadora
app.post('/crear-jugadora', (req, res)=>{
  database.query('INSERT INTO jugadoras_femenino SET ?', req.body, (error, results)=>{
    if(error){
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

app.listen(PORT, ()=>{
  console.log(chalk.green.inverse.bold('Conectado en el puerto 3000'))
})

