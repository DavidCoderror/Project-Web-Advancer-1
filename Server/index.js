const express = require('express');
const app = express()
const db = require('./models') //path pour representer notre database
const cors = require('cors')

app.use(express.json());
app.use(cors()) //Doit installez cors pour "whitelister" mon connection

// Routers pour attacher mon database a mon back-end par un route predifni
const produitRouter = require('./routes/Produits')
app.use("/produits", produitRouter)

//Verifier si tous les tables dans models existe, si non il creer pour nous
db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("Server Marche!")
    })
})

