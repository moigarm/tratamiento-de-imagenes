const ImageHandler = require("./ImageHandler.js");

let path = "input/tucan.jpg";
let handler = new ImageHandler(path);

/**
 * Ejemplo de construccion de una imagen
 */
function ejemplo() {
  let outputPath = "output/ejemplo.jpg";
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    console.log("Fila: " + i);
    for (let j = 0; j < columnas; j++) {
      console.log("Columna:" + j);
      let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
      if ((i + j) % 2 === 0) {
        // Si la suma de la fila y la columna es par....
        pixel = [255, 255, 255];
      }
      console.log(
        "Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j
      );
      nuevaFila.push(pixel);
    }
    console.log(nuevaFila);
    pixeles.push(nuevaFila);
  }
  console.log(pixeles);
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
  let outputPath = "output/tucan_red.jpg";
  let pixels = handler.getPixels();

  pixels.forEach((row, i) => {
    row.forEach((pixel, j) => {
      pixels[i][j][1] = 0; // Verde a cero
      pixels[i][j][2] = 0; // Azul a cero
    });
  });

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function greenConverter() {
  let outputPath = "output/tucan_green.jpg";
  let pixels = handler.getPixels();

  pixels.forEach((row, i) => {
    row.forEach((pixel, j) => {
      pixels[i][j][0] = 0; // Rojo a cero
      pixels[i][j][2] = 0; // Azul a cero
    });
  });

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function blueConverter() {
  let outputPath = "output/tucan_blue.jpg";
  let pixels = handler.getPixels();

  pixels.forEach((row, i) => {
    row.forEach((pixel, j) => {
      pixels[i][j][0] = 0; // Rojo a cero
      pixels[i][j][1] = 0; // Verde a cero
    });
  });

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
function greyConverter() {
  let outputPath = "output/tucan_grey.jpg";
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let pixel = pixels[i][j];
      let avg = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3)

      pixel[0] = avg;
      pixel[1] = avg;
      pixel[2] = avg;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
function blackAndWhiteConverter() {
  let outputPath = "output/tucan_black_and_white.jpg";
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      // Accede al pixel en la posición (i, j)
      let pixel = pixels[i][j];

      // Calculamos el valor promedio de los canales R, G y B
      let avg = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);

      // Establecemos los canales R, G y B en 0 o 255 según el umbral
      if (avg > 128) {
        pixel[0] = 255; // Rojo
        pixel[1] = 255; // Verde
        pixel[2] = 255; // Azul
      } else {
        pixel[0] = 0; // Rojo
        pixel[1] = 0; // Verde
        pixel[2] = 0; // Azul
      }
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 */
function scaleDown() {
  let outputPath = "output/tucan_scale_down.jpg";
  let pixels = handler.getPixels();

  let newWidth = handler.getShape()[1] / 2;
  let newHeight = handler.getShape()[0] / 2;

  // Utilizo Array.from en vez de for o un foreach que agregaría complejidad
  let newPixels = Array.from(
    { length: newHeight },
    // Ignoro el elemento actual
    (_, i) => Array.from(
      { length: newWidth },
      // Ignoro el elemento actual
      (_, j) => pixels[i * 2][j * 2]
    )
  );

  handler.savePixels(newPixels, outputPath, newHeight, newWidth);
}


/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qe recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
  let outputPath = "output/tucan_dimed.jpg";
  let pixels = handler.getPixels();

  pixels.forEach(row => {
    row.forEach(pixel => {
      pixel.forEach((color, index) => {
        pixel[index] = Math.min(255, Math.max(0, color * dimFactor));
      });
    });
  });

  handler.savePixels(pixels, outputPath);
}


/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
  let outputPath = "output/tucan_inverse.jpg";
  let pixels = handler.getPixels();

  pixels.forEach(row => {
    row.forEach(pixel => {
      pixel.forEach((color, index) => {
        pixel[index] = 255 - color;
      });
    });
  });

  handler.savePixels(pixels, outputPath);
}


/**
 * merge - Junta dos imagenes con cierto factor de fusion
 *
 * Una forma de conseguirlo es recorrer los pixeles de ambas imagenes y construir una nueva imagen donde
 * cada pixel sera el resultado de multiplicar los canales rgb de la primera imagen por el factor 1 y los
 * canales rgb de la segunda imagen por el factor 2.
 * @param alphaFirst Parametro a aplicar sobre la primera imagen
 * @param alphaSecond Parametro a aplicar sobre la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler("input/cat.jpg");
  let dogHandler = new ImageHandler("input/dog.jpg");
  let outputPath = "output/merged.jpg";

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

   // Creamos un nuevo array de píxeles mediante el mapeo de cada fila y cada pixel en catPixels.
  // Utilizamos 'Array.from' para crear un nuevo pixel que es una combinación del pixel del gato y el pixel del perro.
  let pixels = catPixels.map((row, i) => 
    row.map((catPixel, j) => {
      // Para cada pixel de gato, obtenemos el correspondiente pixel de perro
      let dogPixel = dogPixels[i][j];

      // Retornamos un nuevo pixel que es una combinación del pixel de gato y el de perro
      return Array.from(catPixel, (color, index) => {
        // Calculamos el nuevo color. Esto se hace multiplicando cada color del pixel de gato y el pixel de perro por sus respectivos factores alfa, y sumando los resultados.
        let mergedColor = color * alphaFirst + dogPixel[index] * alphaSecond;

        // Nos aseguramos de que el color resultante esté dentro del rango de 0 a 255.
        return Math.min(255, Math.max(0, mergedColor));
      });
    })
  );

  dogHandler.savePixels(pixels, outputPath);
}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
let optionN = 9;

switch (optionN) {
    case 1: redConverter(); break;
    case 2: greenConverter(); break;
    case 3: blueConverter(); break;
    case 4: greyConverter(); break;
    case 5: blackAndWhiteConverter(); break;
    case 6: scaleDown(); break;
    case 7: dimBrightness(2); break;
    case 8: invertColors(); break;
    case 9: merge(0.3, 0.7); break;
    default: ejemplo();
}
