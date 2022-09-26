class Usuario 
{
    constructor(nombre = '', apellido = '', libros=[], mascotas=[]) {
        this.nombre     = nombre
        this.apellido   = apellido
        this.libros     = libros
        this.mascotas   = mascotas
    }

    getFullName() {
        return `Nombre completo: ${this.nombre} ${this.apellido}` 
    }

    addMoscotas(name) {
        return this.mascotas.push(name);
    }

    countMoscotas() {
        return `Cantidad de mascota: ${this.mascotas.length}`
    }
    
    addBook(nombre='', autor='') {
        return this.libros.push({'nombre': nombre, 'autor': autor});
    }

    getBookNames() {
        return this.libros
    }

}
mascotas = [
    { nombre: 'coco', edad: 4, raza: 'caniche'  },
    { nombre: 'moro', edad: 3, raza: 'labrador'  }
]

books = [{'nombre': 'El señor de los anillos', 'autor': 'J.R.R. Tolkien'}, {'nombre': 'El señor de los anillos 2', 'autor': 'J.R.R. Tolkien'}, {'nombre': 'El señor de los anillos 3', 'autor': 'J.R.R. Tolkien'}];

usuario = new Usuario('Nelson', 'Aguiar', books, mascotas )
console.log( usuario.getFullName() )
usuario.addBook('Mapas de sentidos', 'Jordan Peterson'); 
usuario.addBook('Dos mundos', 'Jordan Peterson');
console.log('Libros', usuario.getBookNames() )
usuario.addMoscotas('coco');
console.log('cantidad de mascotas',usuario.countMoscotas() );