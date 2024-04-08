import Alumno from "./models/alumno.js"
import express from "express"
import cors from "cors"
import {PI, sumar, multiplicar} from "./modules/matematica.js"
import {OMDBSearchPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/OMBDWrappper.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ya respondo');
})

app.get('/saludar/:nombre', (req, res) => {
    let nombre = req.params.nombre
    res.send('hola ' + nombre)
    res.status(200).send('todo OK')
})

app.listen(port, () => {  
    console.log(`Listening on http://localhost:${port}`) 
})