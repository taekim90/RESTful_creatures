// import express
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

// create an instance of express
const app = express()

// MIDDLEWARES
// tell express to use ejs as the view engine
app.set('view engine', 'ejs')
// express that we're using ejs layouts
app.use(ejsLayouts)

// ROUTES
// home route
app.get('/', (req, res) => {
    res.send('Hello Dinos')
})
// index route (i.e., list all the dinos)
app.get('/dinosaurs', (req, res) => {
    // read in the array from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // console.log('Dinosaurs: '+ dinosaurs)
    // res.send(dinoData)
    res.render('index.ejs', {myDinos: dinoData})
})
// show route (i.e., show all info about a single dino)
// : indicates that the following is a url parameter
app.get('/dinosaurs/:idx', (req, res) => {
    // read in the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // extract the dino corresponding to
    console.log('idx' + req.params.idx)
})


app.listen(8000, () => {
    console.log("DINO CRUD TIME 🦖")
})