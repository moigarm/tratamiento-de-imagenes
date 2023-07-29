const fs = require('fs');
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const deasync = require('deasync');

class ImageHandler {
    constructor(path) {
        this.path = path;
        this.pixels = [];
        this.shape = [0, 0, 0]; // Asegúrate de que la tercera dimensión sea 3 para RGB
        this._readImage();
    }
    

    getPixels() {
        console.log("PIXELS ARE...")
        console.log(this.pixels)
        return this.pixels;
    }

    getShape() {
        return this.shape;
    }

    savePixels(pixels, path, width = this.shape[0], height = this.shape[1]) {
        const writableStream = fs.createWriteStream(path);
        savePixels(pixels, 'png').pipe(writableStream);
      
        console.log('Imagen guardada correctamente.');
    }

    _readImage() {
        // Envuelve la función getPixels en una función que acepta un solo argumento de devolución de llamada.
        const getPixelsAsync = deasync((callback) => {
            getPixels(this.path, function(err, pixels) {
                if(err) {
                    console.log("Bad image path");
                    callback(err);
                } else {
                    console.log("got pixels", pixels.shape.slice());
                    callback(null, pixels);
                }
            });
        });
    
        // Llama a la función asíncrona y espera a que se complete.
        try {
            this.pixels = getPixelsAsync();
            console.log("GOT OUT");
            console.log(this.pixels);

            
        } catch (err) {
            console.log('Error reading image:', err);
        }
    }
}

module.exports = ImageHandler;
