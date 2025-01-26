//Ceci est pour creer un table dans notre Database
module.exports = (sequelize, DataTypes) => {

    const Produits = sequelize.define("Produits", {

        Nom: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        Descriiption: {
            type: DataTypes.STRING, //Type de Data (String, Int, etc..)
            allowNull: false, //Ceci est forcer
        },

    })

    return Produits
}