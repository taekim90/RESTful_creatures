// IMPORT express
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

// create an instance of express
const app = express()

// MIDDLEWARES
// tell express to use ejs as the view engine
app.set('view engine', 'ejs')
// express that we're using ejs layouts
app.use(ejsLayouts)
// method override middleware
app.use(methodOverride('_method'))
// body-parser middleware
// this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))
    // tells express how to handle incoming data also called payload data. it wlil parse it and it wil throw it into the object under a body property
    // it processes the form data and allows us to look inside the body property of that request object
    // req.body is what we can use to look at that data.
    // req.body for post. & req.query for get request

// ROUTES
// home route
app.get('/', (req, res) => {
    res.send('Hello Dinos')
})
// Index route (i.e., list all the dinos)
app.get('/dinosaurs', (req, res) => {
    // read in the array from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.query)
    // grabbing the queries name from the url
    let nameFilter = req.query.nameFilter
    // if there IS a query,
    if (nameFilter) {
        // filter out all dinos who don't have the queried name
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    // console.log(dinoData)
    // console.log('Dinosaurs: '+ dinosaurs)
    // res.send(dinoData)
    res.render('index.ejs', {myDinos: dinoData})
})
// New route (renders the new dino form)
app.get('/dinosaurs/new', (req, res) => {
    res.render('new.ejs')
})
// Edit form route (renders edit form)
app.get('/dinosaurs/edit/:idx', (req, res) => {
    // snatch the dino to be updated
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the idx param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})
// PUT ROUTE
app.put('/dinosaurs/:idx', (req, res) => {
    // console.log(`You've hit the put route for editing dino with ID of ${req.params.idx}`)
    // read in our existing dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // replace dino fields with field from form
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // once the dinosaur has been edited, do a get request to the index route
    res.redirect('/dinosaurs')
})
// Show route (i.e., show all info about a single dino)
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
app.delete('/dinosaurs/:idx', (req, res) => {
    // console.log(`you're trying to delete dino #${req.params.idx}`)
    // read in our dinos from our json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // remove the deleted dino from dinoData
    dinoData.splice(req.params.idx, 1)
    // write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})


// FOR PREHISTORIC CREATURES
// home route
app.get('/prehistoric_creatures', (req,res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    res.render('prehistoric/index.ejs', {myCreatures: creaturesData})
})
app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('prehistoric/new.ejs')
})
app.get('/prehistoric_creatures/:idx', (req, res) => {
    // read in the dinos from the db
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    // extract the dino corresponding to the idx param
    let creatureIndex = req.params.idx
    let targetCreature = creaturesData[creatureIndex]
    res.render('prehistoric/show.ejs', {creature: targetCreature})
})
app.post('/prehistoric_creatures', (req, res) => {
    // read in our dino data from the json file
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    // add/push the new dino to the dinoData array
    creaturesData.push(req.body)
    // save the dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    // then redirect back to the index route
    // res.redirect takes the url pattern that the get route that you want to run next
    res.redirect('/prehistoric_creatures')
    // the new added dino data is in the req.body
    console.log(req.body)
})


app.listen(8000, () => {
    console.log("DINO CRUD TIME 🦖")
})