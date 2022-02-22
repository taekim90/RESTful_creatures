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
// body-parser middleware
// this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))
// tells express how to handle incoming data also called payload data. it wlil parse it and it wil throw it into the object under a body property

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
// new route (renders the new dino form)
app.get('/dinosaurs/new', (req, res) => {
    res.render('new.ejs')
})
// show route (i.e., show all info about a single dino)
    // : indicates that the following is a url parameter
app.get('/dinosaurs/:idx', (req, res) => {
    // read in the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the idx param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    console.log(targetDino)
    // console.log('idx' + req.params.idx)
    res.render('show.ejs', {dino: targetDino})
})
// POST a new dino
app.post('/dinosaurs', (req, res) => {
    // read in our dino data from the json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add/push the new dino to the dinoData array
    dinoData.push(req.body)
    // save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // then redirect back to the index route
    // res.redirect takes the url pattern that the get route that you want to run next
    res.redirect('/dinosaurs')
    // the new added dino data is in the req.body
    console.log(req.body)
})


app.listen(8000, () => {
    console.log("DINO CRUD TIME 🦖")
})