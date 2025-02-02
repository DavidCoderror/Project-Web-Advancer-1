import './App.css';
import axios from 'axios'

import {useEffect, useState} from 'react'

import { Formik, Form, Field, ErrorMessage } from "formik";
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
  Descriiption: Yup.string().required("Description est necessaire!!! ")
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


//Section HTML
  return (
    <div className="App">

        <Formik 
        initialValues={valeurInitiales} 
        onSubmit ={enSoummision} 
        validationSchema={verification}
        >
          <Form>
            <label>Nom du Produit: </label>
            <ErrorMessage name ="Nom" component="span"/>
            <Field id = "inputCreationProduits" name="Nom" placeholder="Nom ICI"/>

            <br/>

            <label>Description du Produit: </label>
            <ErrorMessage name ="Descriiption" component="span"/>
            <Field id = "inputCreationProduits" name="Descriiption" placeholder="Description ICI"/>

            <br/>

            <button type="Submit">Creer Produit</button>

          </Form>
        </Formik>

        <br/> 
        <br/>

        {listProduits.map((valeur, cle) => {
          return (
          <div> 
                <div> {valeur.Nom} </div>
                <div> {valeur.Descriiption} </div>
          </div>
          )//Return Fin

        })}
    </div>
  );
}

export default App;
