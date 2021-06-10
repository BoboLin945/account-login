const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')
const session = require('express-session')
const flush = require('connect-flash')
const cookieParser = require('cookie-parser')

const app = express()

// view setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(express.urlencoded({ extended: true }))

// cookie-parser
app.use(cookieParser())

app.use(session({
  secret: 'secret',
  cookie: { maxAge : 60000},
  saveUninitialized: false,
  resave: true,
}))
app.use(flush())

// routes setting
app.use(routes)

// port setting
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})