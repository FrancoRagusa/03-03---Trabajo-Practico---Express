import Alumno from "./models/alumno.js"
import express from "express"
import cors from "cors"
import {PI, sumar, multiplicar} from "./modules/matematica.js"
import {OMDBSearchPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/OMBDWrappper.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('ya respondo');
})

app.get("/saludar/:nombre", (req, res) => {
    let nombre = req.params.nombre
    res.send('hola ' + nombre)
    res.status(200).send('todo OK')
})

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => { 
    const mes = parseInt(req.params.mes);
    const fecha = Date.parse(req.params.ano + "-" + (mes) + "-" + req.params.dia);
    if (!isNaN(fecha)) {
        res.status(200).send("la fecha valida: " + new Date(fecha));
    } else {
        res.status(400).send("no es una fecha válida");
    }
});

app.get("/matematica/sumar", (req, res) =>{
    const {n1, n2} = req.query
    const suma = sumar(parseInt(n1), parseInt(n2))
    res.status(200).send(suma.toString());
})

app.get("/matematica/restar", (req, res) => {
    const { n1, n2 } = req.query;
    const suma = restar(parseInt(n1), parseInt(n2));
    res.status(200).send(suma.toString());
})

app.get("/matematica/multiplicar", (req, res) => {
    const { n1, n2 } = req.query;
    const suma = multiplicar(parseInt(n1), parseInt(n2));
    res.status(200).send(suma.toString());
})

app.get("/matematica/dividir", (req, res) => {
    const { n1, n2 } = req.query;
    const suma = dividir(parseInt(n1), parseInt(n2));
    res.status(200).send(suma.toString());
})

app.get("/ombd/searchbypage", async (req, res) => {
    const {texto, pagina} = req.query
    let datos = await OMDBSearchPage(texto, pagina)
    res.status(200).send("datos:" + datos)
})

app.get("/ombd/searchcomplete", async (req, res) => {
    const texto = req.query
    let datos = await OMDBSearchComplete(texto)
    res.status(200).send("datos:" + datos)
})

app.get("/ombd/getbyomdbid",async (req,res)=> {
    const imdb = req.query
    let datos = await OMDBGetByImdbID(imdb)
    res.status(200).send("datos:" + datos)
})

const alumnosArray = [];
alumnosArray.push(new Alumno("Rodrigo De Polshu", "44594635", 21))
alumnosArray.push(new Alumno("Keko Jones", "40234432", 25))
alumnosArray.push(new Alumno("Maria Unpajote", "24274039", 49))

app.get("/alumnos", (req, res) => {  
    res.status(200).send("alumnos: " + alumnosArray)
})

app.get("/alumnos/:dni", (req, res) => {
    const dni = alumnosArray.find((dni))
    res.send("el dni es: " + dni)
})



app.listen(port, () => {  
    console.log(`Listening on http://localhost:${port}`) 
})