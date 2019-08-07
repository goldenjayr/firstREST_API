// this model requires model in order for us to interact with the database
const mongoose = require('mongoose')

// create a schema
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now // if no date is passed default to date.now
    }
})

//export our model to other files
// takes in two parameters ( name of the model displayed to the database, schema)
// the model function allows us to work with the model directly to the database
module.exports = mongoose.model('Subscriber', subscriberSchema)