const express = require('express')
const router = express.Router()
const { Produits } = require("../models")
application.use(express.json())

//Get
router.get('/', async (req, res)=> {
    const listOfProduits = await  Produits.findAll() //Chercher l'information
    res.json(listOfProduits)
});

//Post 
router.post("/", async (req,res) =>{
    const produit = req.body //Chercher l'information
    await Produits.create(produit) //Ajouter a notre database
    res.json(produit)
})


module.exports = router