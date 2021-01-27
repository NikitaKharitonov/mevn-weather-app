const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

router.get('/', async (req, res) => {
    const locationsCollection = await loadLocationsCollection()
    const locatoinsArray = await locationsCollection.find({}).toArray()
    res.send(locatoinsArray)
})

router.post('/', async (req, res) => {
    const locationsCollection = await loadLocationsCollection()
    const name = req.body.name
    await locationsCollection.insertOne({name: name})
    res.status(201).send()
})

router.delete('/:id', async (req, res) => {
    const locationsCollection = await loadLocationsCollection()
    const id = new mongodb.ObjectID(req.params.id)
    await locationsCollection.deleteOne({_id: id})
    res.status(200).send()
})

async function loadLocationsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://Nikita:1234@cluster0.ic1hq.mongodb.net/mevn-weather-app?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    return client.db('mevn-weather-app').collection('locations')
}

module.exports = router