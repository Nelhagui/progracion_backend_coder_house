const express   = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

app.get('/',(req,res)=>{
    res.json('Ingresa en la url "productos" o "productoRandom"')
});
app.get('/productos',(req,res)=>{
    const allProducts =  productos.getAll().then((unProducto) =>{
        res.json(unProducto);
    })
});
app.get('/productoRandom',(req,res)=>{
    
    const random = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const productRandom =  productos.getAll().then((unProducto) =>{
        res.json(unProducto[random(0,unProducto.length-1)]);
    })
});
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`))

class Contenedor {
    constructor(nombre = '') {
        this.nombre = `./${nombre}.txt`;
    }
    async save(newObj) {
        let respuesta = 'No existe el archivo con el nombre ingresado';
        if(fs.existsSync(`./${this.nombre}`)){
            let id_asignado = 0;
            let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
            if(data === '') {
                fs.appendFileSync(`./${this.nombre}`, `[${JSON.stringify(newObj)}]`);
            }
            else {
                let arr = JSON.parse(data);
                arr.push(newObj);
                fs.writeFileSync(`./${this.nombre}`, `${JSON.stringify(arr)}`);
                id_asignado = arr.length - 1;
            }
            respuesta = 'Objeto guardado correctamente'
        }
        return respuesta; 
    }
    async getById(Number) {
        let objeto = null;
        let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
        if(data !== ''){
            let arr = JSON.parse(data);
            objeto = arr[Number] !== undefined ? arr[Number] : objeto;
        }
        return objeto;
    }
    async getAll() {
        let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
        if(data !== '')
            data = JSON.parse(data);
        return data;
    }
    async deleteById(Number) {
        let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
        let respuesta = 'No hay elementos para eliminar';
        if(data !== '') {
            let arr = JSON.parse(data);
            if(arr[Number] !== undefined){
                let arr = JSON.parse(data);
                arr.splice(Number, 1);
                fs.writeFileSync(`./${this.nombre}`, `${JSON.stringify(arr)}`);
                respuesta = arr;
            }
            else {
                respuesta = 'No existe el elemento que desea eliminar';
            }
        }
        return respuesta;
    };
    deleteAll() {
        fs.writeFileSync(`./${this.nombre}`, '');
        return 'Borrado';
    }
}
const productos = new Contenedor('productos');
