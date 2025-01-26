const express = require('express')
const app = express()

const db = require('./models') //path pour representer notre database

//Verifier si tous les tables dans models existe, si non il creer pour nous
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server Marche!")
    })
})

