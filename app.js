const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

// view setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.use(routes)

// port setting
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})