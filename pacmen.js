const pacMen = []; //acá se almacenan los Pacman
//acá están las imagenes de pacman 
const pacArray = [
  ['pacman1.png', 'pacman2.png'],
  ['pacman3.png', 'pacman4.png'],
];


//esta funcion entrega un objeto con dos valores random
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Fabrica de pacman, crea el objeto con atributos de posición y velocidad
function makePac() {
  var velocity = setToRandom(30); // {x:?, y:?}
  let position = setToRandom(300);

  // le asigna una imagen al nuevo elemento en el div de game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'pacman1.png';
  newimg.width = 100;
  // posición
  newimg.style.left = `${position.x}px`;
  newimg.style.top = `${position.y}px`;
  // nueva imagen hija
  game.appendChild(newimg);


  //regresa los datelles del objeto (pacman)
  return {
    position,
    velocity,
    newimg,
    imageIndex: 0,
  };
}

//MOVIMIENTOS Y COLISIONES DE LOS PACMAN
//Desplazamiento
function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

//cambio de dirección horizontal    
  item.imageIndex = (item.imageIndex + 1) % 2; 
  if (item.velocity.x < 0) {
    item.imageIndex = (item.imageIndex + 2) % 2;
  }

// animación hacia la derecha 
  if (item.velocity.x > 0) {
    item.newimg.src = pacArray[0][item.imageIndex];
  }
// animación hacia la izquierda
  else if (item.velocity.x < 0) {
    item.newimg.src = pacArray[1][item.imageIndex];
  }

  item.newimg.style.left = item.position.x + 'px';
  item.newimg.style.top = item.position.y + 'px';
});
}

//colisión

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
    }};


//crear pacman
function makeOne() {
  pacMen.push(makePac()); // mete el pacman al array pacMen
}

//función para eliminar un pacman
function deleteOne() {
  var removedPac = pacMen.pop();
  var game = document.getElementById('game');
  game.removeChild(removedPac.newimg);
}
// Funciópn para iniciar ala animación
var animationInterval;
function startAnimation() {
  animationInterval = setInterval(update, 70);
}
