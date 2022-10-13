//intializes dependencies
const path = require('path')
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override');
const logger = require('morgan')
const connectDB = require('./config/db')
const morgan = require('morgan')
const validUrl = require('valid-url')

//defined the main routes
const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')
const branchRoutes  = require('./routes/branch')
const leavesRoutes = require('./routes/leaves')
const profileRoutes = require('./routes/profile')

//Allows for .env files for hidden stuff
//Brings in passport
require('dotenv').config({path: './config/config.env'})
require('./config/passport')(passport)

//calls for the mongodb function to establish a connection
connectDB()

//Logger to check the type of CRUD methods, and possible errors
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

//Assigns settings name to value
app.set("view engine", "ejs");
app.set("views", "./views");

//allows for specific middleware to be used whenever a request is sent 
//to the server
app.use(express.static('public')); //allows for static files
app.use(express.urlencoded({ extended: true })) //allows for incoming data to be recognized as string data
app.use(express.json())//allows for incoming data as a JSON object

//allows for method override actions
app.use(methodOverride("_method"));

app.use( //Allows for sessions to occur 
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ //Creates a new store sessions in mongodDB
            mongoUrl: process.env.MONGO_URI,
        })
  })
)
//Allows for passport to start and passport session to work 
app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname, 'public')))

//defining the routes
app.use('/',mainRoutes)
app.use('/auth',authRoutes)
app.use('/branch',branchRoutes)
app.use('/leaves',leavesRoutes)
app.use('/profile',profileRoutes)

//Turns on the server and console logs if it is running and what PORT
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.NODE_ENV} mode on ${process.env.PORT}`)
})