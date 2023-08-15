const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.Port || 5000;
app.use(cors())
const spots = require('./data/spots.json');
const hotels= require('./data/hotels.json');
app.get('/', (req, res) => {
    res.send('travel guru is runnig')
})

app.get('/spots',(req, res)=> {
    res.send(spots);
})
app.get('/hotels',(req,res)=>{
    res.send(hotels);
})
app.get('/spots/:id',(req,res)=>{
    const id = req.params.id
    const selectedSpots= spots.find(spot=> spot.id === id)
    res.send(selectedSpots);
})
app.get('/hotels/:id', (req, res) => {
    const id = req.params.id
    const selectedHotels = hotels.find(hotel => hotel.id === id)
    res.send(selectedHotels);
})
app.get('/spots/:id/hotels',(req,res)=>{
    const id = req.params.id
    const availableHotels = hotels.filter(hotel => hotel.spots_id === id);
    if(availableHotels.length){
        res.send(availableHotels);
    }
    else{
        res.send(hotels);
    }
})

app.listen(port, () => {
    console.log(`travel guru is running on port ${port}`)
})