const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const path = require('path');
const route = require('./routes')
const db = require('./config/db')
//change mathod
const methodOverride = require('method-override')

var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//cookies
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())
//monggooes
db.connect();

//template 
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource\\views'));


//change method
app.use(methodOverride('_method'))
//routes init
route(app)
//HTTP LOGGER
app.use(morgan('combined'))
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/user/login`)
})