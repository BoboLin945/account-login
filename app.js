const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express()

// view setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/', (req,res) => {
  res.render('index')
})

// port setting
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})