

class Tablero {
  constructor() {
    this.tamanoCelda = 120;
    this.tamanoCeldaY=165;
    this.celdas = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
  }

  dibujar() {
    // Dibujar líneas del tablero
    stroke(255);
    strokeWeight(4);

    // Líneas verticales
    for (let i = 1; i < 3; i++) {
      let x = i * this.tamanoCelda;
      line(x, 0, x, height);
    }

    // Líneas horizontales
    for (let i = 1; i < 3; i++) {
      let y = i * this.tamanoCeldaY;
      line(0, y, width, y);
    }

    // Dibujar símbolos en cada celda
    textSize(32);
    textAlign(CENTER, CENTER);
    for (let fila = 0; fila < 3; fila++) {
      for (let col = 0; col < 3; col++) {
        let x = col * this.tamanoCelda + this.tamanoCelda / 2;
        let y = fila * this.tamanoCeldaY + this.tamanoCeldaY / 2;
        let simbolo = this.celdas[fila][col];
        text(simbolo, x, y);
      }
    }
  }

  colocarSimbolo(fila, columna, simbolo) {
    if (this.celdas[fila][columna] === "") {
      this.celdas[fila][columna] = simbolo;
      return true; // Devuelve verdadero si se colocó el símbolo con éxito
    } else {
      return false; // Devuelve falso si la celda ya está ocupada
    }
  }


  
  limpiarTablero() {
    for (let fila = 0; fila < 3; fila++) {
      for (let col = 0; col < 3; col++) {
        this.celdas[fila][col] = "";  // Establece cada celda como vacía
      }
    }
  }
  

  obtenerCelda(fila,columna){
    return this.celdas[fila][columna];
}
}


  