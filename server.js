require('dotenv').config() // requires dotenv library to easily hook up env variables

const express = require('express') //imports the express framework to work with node js better
const app = express() //calls the express function
const mongoose = require('mongoose') // imports mongoose library to easily work with mongodb


// connects to database with passed in .env variables from the .env file
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).catch(result => {
    console.log("Error Connecting to Database:", result)
})

// creates a connection
const db = mongoose.connection
// if error occurs upon connecting to database throw an error
db.on('error', (error) => console.error(error))
// connection happens only once and logs a message
db.once('open', () => console.log('Connected to Database!'))

//sets up server to accept json
app.use(express.json())

// creates a route for subscribers
const subscribersRouter = require('./routes/subscribers')
// ex. localhost:3000/subscribers  <-- this is the path for that
app.use('/subscribers', subscribersRouter)

// starts a server at port 3000 using express
app.listen(3000, () => console.log('Server has started!'))