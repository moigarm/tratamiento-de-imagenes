class ImageHandler {

    /**
     * ImageHandler tiene 3 atributos internos.
     * 
     * path: Path de la imagen cuyos pixeles se quieren leer.
     * pixels: Array de arrays (Matriz) que representa cada uno de los pixeles de la imagen. Inicialmente vacío.
     * shape: Array con las dimensiones de la imagen (ancho, alto, profundidad (0)). Inicialmente [0,0,0]
     * @param {*} path Path de la imagen a leer.
     */
    constructor(path) {
        this.path = path;
        this.pixels = [];
        this.shape = [0, 0, 0];
        this._readImage();
    }

    /**
     * getPixels
     * @returns Array de pixeles de la imagen
     */
    getPixels() {}

    /**
     * getShape
     * @returns Array de dimensiones de la imagen
     */
    getShape() {}


    /**
     * Dado un array de pixels, guarda dichos pixeles en la imagen gestionada por el handler.
     * @param {*} pixels - Array de pixeles a guardar en la imagen.
     * @param {*} path - Path de la imagen destino.
     * @param {*} width - Opcional: Ancho de la imagen. Si no se usa, se usara el ancho actual.
     * @param {*} height - Opcional: Altura de la imagen. Si no se usa, se usara la altura actual.
     * 
     * Se recomienda hacer uso de las siguientes librerias:
     *  - fs
     *  - save-pixels
     * 
     */
    savePixels(pixels, path, width = this.shape[0], height = this.shape[1]) {}


    /**
     * _readImage
     * Lee la imagen gestionada por el handler.
     * Se encarga de dar valor al array de pixeles 'pixels' asociado a la imagen.
     * Se encarga de dar valor al array de dimensiones 'shape' asociado a la imagen.
     * 
     * Se recomienda hacer uso de funciones auxiliares.
     * Se recomienda hacer uso de las siguientes librerias:
     *  - get-pixels
     *  - deasync
     *  - ndarray
     * 
     */
    _readImage() {}

}

module.exports = ImageHandler
