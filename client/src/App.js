import './App.css';
import axios from 'axios'

import {useEffect, useState} from 'react' //Pour les Get et Post

import { Formik, Form, Field, ErrorMessage } from "formik"; // Utiliser pour les forms
import * as Yup from 'yup'

function App() {

const [listProduits, setListProduits] = useState([])

//On va chercher le liste
useEffect(() => {
  axios.get("http://localhost:3002/produits").then((reponse) => {
    setListProduits(reponse.data)

  }) //Get 
}, [])


//Verifier que c'est pas Null les entrez des utilisateur
const verification = Yup.object().shape({
  Nom: Yup.string().required("Nom est necessaire!!! "),
  //Descriiption: Yup.string().required("Description est necessaire!!! ")
})
//Necessaire
const valeurInitiales = {
  Nom:"",
  Descriiption:"",
}
//Pour la Soummision du data, dans un array et pas object
const enSoummision = (data) => {
  axios.post("http://localhost:3002/produits", data).then((reponse) => {
    setListProduits((prev) => [...prev, reponse.data]);
  })
}
//Delete, on cherche l'id specifique du produit, puis on le cherche et passe le query
const produitDelete = (id) => {
  axios.delete(`http://localhost:3002/produits/${id}`).then(() => {

    setListProduits((prev) => prev.filter((produit) => produit.id !== id));
  });
};


//Section HTML
  return (
    <div className="App">
      <h2 class="header">Home</h2>

        <Formik 
        initialValues={valeurInitiales} 
        onSubmit ={enSoummision} 
        validationSchema={verification}
        >
          <Form class="form">
            <label>Nom du Produit: </label>
            <ErrorMessage name ="Nom" component="span"/>
            <Field id = "inputCreationProduits" name="Nom" placeholder="Nom ICI"/>

            <br/>

            <label>Description du Produit: </label>
            <Field id = "inputCreationProduits" name="Descriiption" placeholder="Description ICI"/>

            <br/>

            <button type="Submit" class="bouton-add">Creer Produit</button>

          </Form>
        </Formik>

        <h1 class="titre">Produits</h1>
        <br/> 
        <br/>

        <div class = "produits-header"> 
          <p>Nom</p>
          <p>Description</p>
          <p>Actions</p>
        </div>

        <hr class="ligne"></hr>

        {listProduits.map((valeur, cle) => {
          return (
            <div>
                <div class = "produits-layout"> 
                    <p>{valeur.Nom} </p>
                    <p> {valeur.Descriiption} </p>
                    <div> 
                      <button class="bouton-edit"> Edit </button>
                      <button class="bouton-delete" onClick={() => produitDelete(valeur.id)}> Delete </button>
                    </div>
                </div>
                <hr class="ligne"></hr>
          </div>
          )//Return Fin

        })}
    </div>
  );
}

export default App;
