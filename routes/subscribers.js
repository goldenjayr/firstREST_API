// this file is for routers to be passed to server js
const express = require('express')
//executes router function for any kind of method
const router = express.Router()
// import the model of subscribers from model/subscribers.js
const Subscriber = require('../models/subscriber')

// Requests
// Getting all
router.get('/', async (req, res) => {
    // gets all subscribers in the database.... .find()
    const subscribers = await Subscriber.find().catch(err => res.status(500).json({
        message: err.message
    }))
    res.json(subscribers) // deliver the response of the req to the client
})

// getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name, // the body is whatever the user sends to us... and we get the name
        subscribedToChannel: req.body.subscribedToChannel

    })

    try {
        const newSubscriber = await subscriber.save() // add this subscriber to the database... if successful return the result to new subscriber variable
        //send status 201 = successfully created an object
        //send response to client
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// updating one... we use patch because we only want to update whatever is passed
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
})

// deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({
            message: 'Deleted Subscriber Successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// this is a middleware to get the subscriber using the id
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        // findById is used to query the subscriber in the database using the ID passed in the request
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message: 'cannot find subscriber'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.subscriber = subscriber
    next()
}

// this line exports the router object to be available to anyone
module.exports = router