const express = require('express')
const router = express.Router()
const fs = require('fs')


// FOR DINOSAURS
// Index route (i.e., list all the dinos)
router.get('/', (req, res) => {
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
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})
// New route (renders the new dino form)
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})
// Edit form route (renders edit form)
router.get('/edit/:idx', (req, res) => {
    // snatch the dino to be updated
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the idx param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})
// PUT ROUTE
router.put('/:idx', (req, res) => {
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
router.get('/:idx', (req, res) => {
    // read in the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the idx param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    console.log(targetDino)
    // console.log('idx' + req.params.idx)
    res.render('dinosaurs/show.ejs', {dino: targetDino})
})
// POST a new dino
router.post('/', (req, res) => {
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
router.delete('/:idx', (req, res) => {
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


module.exports = router