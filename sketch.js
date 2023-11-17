
let miTablero;
var fila;
var columna;
let clickDentro=false;
let signo="X";
let mensajeIA;
let mensajeGanador;
let empate;
let turnoJugador = true; // Variable para controlar el turno del jugador
let cantidad;
let IA;
let letraGanadora;
let ganador = null;
let n=false;
let hayGanador = false;


//conexion con el html
const  panta=document.getElementById("panta");
const  puntos=document.getElementById("valor");
const  pUsuario=document.getElementById("cantidad");




function setup() 
{
	var canva=createCanvas(360,500);
	canva.parent(panta);
    




    miTablero=new Tablero();
	mensajeDelIA();

	
}

function draw(){
	background(0,0,0);
	miTablero.dibujar();
	letrasPuesta();
	elganador();
	botonBorrarPantalla();
}

function mousePressed() {
	// Verifica si el clic está dentro del área del tablero
	if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
	  // Calcula la fila y columna según la posición del mouse
	  fila = floor(mouseY / miTablero.tamanoCeldaY);
	  columna = floor(mouseX / miTablero.tamanoCelda);
	 
  
	  // Verifica si la celda está vacía antes de continuar
	  if (miTablero.obtenerCelda(fila, columna) === "") {
		clickDentro = true; // Poniendo el clic dentro
		return clickDentro;
	  }
	}
  }
  

// cual letra va
function letrasPuesta() {
  if (clickDentro&&turnoJugador) {
    if (miTablero.colocarSimbolo(fila, columna, signo)) {
      background(0);
      miTablero.dibujar();
      clickDentro = false;
	  turnoJugador = false; // Cambiar el turno al jugador
      signo = "X";  // (signo === "O") ? "X" : "O"; // Alternar entre "O" y "X"

      // Verificar si el juego ha terminado en empate
      if (esEmpate()) {
		empate=createP("Empate");
		empate.position(width/2,height/2);
        empate.style("color","white");
		setTimeout(function(){
			empate.hide();
		 },700);
      } else {
			// Mostrar el mensaje de la IA está pensando
			mensajeIA.show();
			
		 // Introducir un retraso antes de la jugada de la IA (por ejemplo, 500 milisegundos)
		 setTimeout(function(){
            realizarJugadaIA();
			mensajeIA.hide(); //ocultamos el mensaje de la Ia
		 },700);
      }
    }
  }
}


// funcion ganador
function elganador() {
	// Verificar filas
	for (let fila = 0; fila < 3; fila++) {
	  if (
		miTablero.obtenerCelda(fila, 0) === miTablero.obtenerCelda(fila, 1) &&
		miTablero.obtenerCelda(fila, 1) === miTablero.obtenerCelda(fila, 2) &&
		miTablero.obtenerCelda(fila, 0) !== ""
	  ) {
		ganador = miTablero.obtenerCelda(fila, 0);
	    hayGanador=true;
	  }
	}
  
	// Verificar columnas
	for (let col = 0; col < 3; col++) {
	  if (
		miTablero.obtenerCelda(0, col) === miTablero.obtenerCelda(1, col) &&
		miTablero.obtenerCelda(1, col) === miTablero.obtenerCelda(2, col) &&
		miTablero.obtenerCelda(0, col) !== ""
	  ) {
		ganador = miTablero.obtenerCelda(0, col);
	    hayGanador=true;
	  }
	}
  
	// Verificar diagonales
	if (
	  miTablero.obtenerCelda(0, 0) === miTablero.obtenerCelda(1, 1) &&
	  miTablero.obtenerCelda(1, 1) === miTablero.obtenerCelda(2, 2) &&
	  miTablero.obtenerCelda(0, 0) !== ""
	) {
	  ganador = miTablero.obtenerCelda(0, 0);
	  hayGanador=true;
	}
  
	if (
	  miTablero.obtenerCelda(0, 2) === miTablero.obtenerCelda(1, 1) &&
	  miTablero.obtenerCelda(1, 1) === miTablero.obtenerCelda(2, 0) &&
	  miTablero.obtenerCelda(0, 2) !== ""
	) {
	  ganador = miTablero.obtenerCelda(0, 2);
	  hayGanador=true;
	}
	
	if (ganador !== null&&hayGanador ) {
        mensajeDelGanador(ganador); //limpia gato*****************************************
		letraGanadora=ganador;
		puntaje(ganador);
		miTablero.limpiarTablero();
		mensajeGanador.hide();
	    hayGanador=false;
	}
  }


 //determina el ganador
  function esGanador(simbolo) {
	// Verificar filas
	for (let fila = 0; fila < 3; fila++) {
	  if (
		miTablero.celdas[fila][0] === simbolo &&
		miTablero.celdas[fila][1] === simbolo &&
		miTablero.celdas[fila][2] === simbolo
	  ) {
		return true;
	  }
	}
  
	// Verificar columnas
	for (let col = 0; col < 3; col++) {
	  if (
		miTablero.celdas[0][col] === simbolo &&
		miTablero.celdas[1][col] === simbolo &&
		miTablero.celdas[2][col] === simbolo
	  ) {
		return true;
	  }
	}
  
	// Verificar diagonales
	if (
	  miTablero.celdas[0][0] === simbolo &&
	  miTablero.celdas[1][1] === simbolo &&
	  miTablero.celdas[2][2] === simbolo
	) {
	  return true;
	}
  
	if (
	  miTablero.celdas[0][2] === simbolo &&
	  miTablero.celdas[1][1] === simbolo &&
	  miTablero.celdas[2][0] === simbolo
	) {
	  return true;
	}
  
	return false;
  }
  

  //funcion es empate
  function esEmpate() {
	for (let fila = 0; fila < 3; fila++) {
	  for (let col = 0; col < 3; col++) {
		if (miTablero.obtenerCelda(fila, col) === "") {
		  // Todavía hay celdas vacías, el juego no es un empate
		  return false;
		}
	  }
	}
	// No hay celdas vacías, el juego es un empate
	return true;
  }
  //juego termino
  function esJuegoTerminado() {
	return esGanador("O") || esGanador("X") || esEmpate();
  }
  
  



  //IA
  function realizarJugadaIA() {
	if(!esJuegoTerminado()){
	// Buscar una celda vacía y realizar la jugada
		for (let fila = 0; fila < 3; fila++) {
		for (let col = 0; col < 3; col++) {
			turnoJugador = true;
			if (miTablero.obtenerCelda(fila, col) === "") {
			// Realizar la jugada para bloquear al oponente o ganar el juego
			if (esJugadaGanadora(fila, col, "O")) {
				miTablero.colocarSimbolo(fila, col, "O");
				return;
			} else if (esJugadaGanadora(fila, col, "X")) {
				miTablero.colocarSimbolo(fila, col, "O");
				return;
			}
			}
		}
	}
	
  
	// Si no se puede ganar o bloquear, hacer una jugada aleatoria
	do {
	  fila = Math.floor(Math.random() * 3);
	  col = Math.floor(Math.random() * 3);
	} while (miTablero.obtenerCelda(fila, col) !== "");
  
	miTablero.colocarSimbolo(fila, col, "O");
  }
  
}



  function esJugadaGanadora(fila, col, simbolo) {
	// Simular la jugada y verificar si resulta en una victoria
	let tableroTemporal = miTablero.celdas.map(row => row.slice());
	tableroTemporal[fila][col] = simbolo;
  
	// Verificar si la jugada resulta en una victoria
	return (
	  verificarVictoria(tableroTemporal, fila, col) ||
	  verificarVictoriaColumna(tableroTemporal, col) ||
	  verificarVictoriaDiagonal(tableroTemporal) ||
	  verificarVictoriaDiagonalInvertida(tableroTemporal)
	);
  }
  
  function verificarVictoria(tablero, fila, col) {
	// Verificar victoria en la fila
	return (
	  tablero[fila].every(celda => celda === tablero[fila][col])
	);
  }
  
  function verificarVictoriaColumna(tablero, col) {
	// Verificar victoria en la columna
	return (
	  tablero[0][col] === tablero[1][col] &&
	  tablero[1][col] === tablero[2][col]
	);
  }
  
  function verificarVictoriaDiagonal(tablero) {
	// Verificar victoria en la diagonal
	return (
	  tablero[0][0] === tablero[1][1] &&
	  tablero[1][1] === tablero[2][2]
	);
  }
  
  function verificarVictoriaDiagonalInvertida(tablero) {
	// Verificar victoria en la diagonal invertida
	return (
	  tablero[0][2] === tablero[1][1] &&
	  tablero[1][1] === tablero[2][0]
	);
  }
  
  //creamos el mensaje de la iA
function mensajeDelIA(){
	//creamos nuestro mensaje
	mensajeIA=createP("JuanIA esta pensando .......");
    mensajeIA.position(150,80);
	mensajeIA.style("front-size","40px");
	mensajeIA.style('color', 'white'); // Establecer el color del texto a blanco
	mensajeIA.hide();
}

function mensajeDelGanador(ganador){
	mensajeGanador=createP("Gano"+" "+ ganador);
	mensajeGanador.position(width/2,height/2);
	mensajeGanador.style("front-size","20px")
	mensajeGanador.style("color","white");
    
}

function limpiaGato(){
	miTablero.limpiarTablero();
	background(0);
	miTablero.dibujar();
	clickDentro = false;
  }


  //funcion de escuchar click de boton para borrar pantalla
  function botonBorrarPantalla(){
    const boton=document.getElementById("boton");
	boton.addEventListener("click",function(){
		limpiaGato();
		turnoJugador = true;
			
	});

  }


function puntaje(ganador) {
  if (hayGanador) {
    if (ganador === "X") {
      cantidad = parseInt(pUsuario.innerHTML);
      cantidad = cantidad + 1;
      pUsuario.innerHTML = cantidad;
    } else if (ganador === "O") {
      IA = parseInt(puntos.innerHTML);
      IA++;
      puntos.innerHTML = IA;
    }
  }
}

// Función para manejar el cambio de tamaño de la ventana
function windowResized() {
	// Ajustar el tamaño del lienzo cuando cambia el tamaño de la ventana
	let canvasContainer = select('#canvas-container');
	resizeCanvas(canvasContainer.width, canvasContainer.height);
  }