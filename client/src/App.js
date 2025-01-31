import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {

const [listProduits, setListProduits] = useState([])


//On va chercher le liste
useEffect(() => {
  axios.get("http://localhost:3002/produits").then((reponse) => {
    setListProduits(reponse.data)

  }) //Get Request
}, [])

//Section HTML
  return (
    <div className="App">
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
