const express = require('express')
const router = express.Router()
const fs = require('fs')

// FOR PREHISTORIC CREATURES
// home route
router.get('/', (req,res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    res.render('prehistoric/index.ejs', {myCreatures: creaturesData})
})
router.get('/new', (req, res) => {
    res.render('prehistoric/new.ejs')
})
router.get('/edit/:idx', (req, res) => {
    // snatch the dino to be updated
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    // extract the dino corresponding to the idx param
    let creatureIndex = req.params.idx
    let targetCreature = creaturesData[creatureIndex]
    res.render('prehistoric/edit.ejs', {creature: targetCreature, creatureId: creatureIndex})
})
router.put('/:idx', (req, res) => {
    // console.log(`You've hit the put route for editing dino with ID of ${req.params.idx}`)
    // read in our existing dino data
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // replace dino fields with field from form
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url
    // write the updated array back to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // once the dinosaur has been edited, do a get request to the index route
    res.redirect('/prehistoric_creatures')
})
router.get('/:idx', (req, res) => {
    // read in the dinos from the db
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoric_creatures)
    // extract the dino corresponding to the idx param
    let creatureIndex = req.params.idx
    let targetCreature = creaturesData[creatureIndex]
    res.render('prehistoric/show.ejs', {creature: targetCreature})
})
router.post('/', (req, res) => {
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
router.delete('/:idx', (req, res) => {
    // console.log(`you're trying to delete dino #${req.params.idx}`)
    // read in our dinos from our json file
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // remove the deleted dino from dinoData
    creatureData.splice(req.params.idx, 1)
    // write the updated array back to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})


module.exports = router