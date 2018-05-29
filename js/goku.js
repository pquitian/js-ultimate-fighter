function Goku() {}

Goku.prototype = Object.create(Fighter.prototype); // "El prototipo Teacher va a partir siempre siendo un objeto de tipo Persona". Esto es la HERENCIA. Debe ir SIEMPRE justo después de la definición del Constructor. 

Goku.prototype.constructor = Goku; //Lo que hacemos es "engañar" al prototipo, le decimos que coja las propiedades (sus atributos) de Persona los HEREDA, pero su constructor es Teacher. 