const  fs = require('fs');
let obj1 = {'marca': 'Renault', 'color': 'Negro'};
let obj2 = {'marca': 'Fiat', 'color': 'Azul'};
let obj3 = {'marca': 'Tesla', 'color': 'Gris'};
class Contenedor {
    constructor(nombre = '') {
        this.nombre = nombre;
    }
    save(newObj) {
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
    getById(Number) {
        let objeto = null;
        let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
        if(data !== ''){
            let arr = JSON.parse(data);
            objeto = arr[Number] !== undefined ? arr[Number] : objeto;
        }
        return objeto;
    }
    getAll() {
        let data = fs.readFileSync(`./${this.nombre}`, 'utf-8');
        if(data !== '')
            data = JSON.parse(data);
        return data;
    }
    deleteById(Number) {
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
let a = new Contenedor('arc.txt');

console.log(a.save(obj1)); console.log(a.save(obj2)); console.log(a.save(obj3));
console.log(a.getAll());
console.log(a.getById(0));
// console.log(a.deleteAll());