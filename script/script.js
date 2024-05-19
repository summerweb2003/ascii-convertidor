//Le otorga la propiedad al input para que recnozoca cuando el archivo de imagen es cambiado
document.getElementById('inputArchivo').addEventListener('change', seleccionArchivo);

  function seleccionArchivo(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

//Crea un evento lector, el cual a reconocer un archivo ejecuta la funcion para convertir en ASCII
    lector.onload = function(event) {
      const imagen = new Image();
      imagen.onload = function() {
        const ascii = convertiraASCII(this);
        document.getElementById('output').textContent = ascii;
      };
      image.src = event.target.result;
    };
    lector.readAsDataURL(archivo);
  }


  function convertiraASCII(imagen) {
    const canvas = document.createElement('canvas');
    const contexto = canvas.getContext('2d');
    const escala = imagen.width / imagen.height;
    const nuevaAltura = 50;
    const nuevoAncho = Math.floor(escala * nuevaAltura);
    canvas.width = nuevoAncho;
    canvas.height = nuevaAltura;
    contexto.drawImage(imagen, 0, 0, nuevoAncho, nuevaAltura);
    const imagenData = contexto.getImageData(0, 0, nuevoAncho, nuevaAltura);
    const pixeles = imagenData.data;
    let ascii = '';

    for (let i = 0; i < pixeles.length; i += 4) {
      const grises = pixeles[i] * 0.299 + pixeles[i + 1] * 0.587 + pixeles[i + 2] * 0.114;
      const caracter = grisesaCaracter(grises);
      ascii += caracter;
      if ((i / 4 + 1) % nuevoAncho === 0) {
        ascii += '\n';
      }
    }

    return ascii;
  }

  function grisesaCaracter(grises) {
    const caracteres = '@%#*+=-:. ';
    const index = Math.floor((grises / 255) * (caracteres.length - 1));
    return caracteres[index];
  }