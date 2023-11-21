// 0 player 1 machine 

import { createmygird } from './computerGame.js';
const h1win = document.getElementById("h1win")
const main = document.getElementById("main")
const enemyGrid = document.getElementById("enemyGrid")
const GameOver = document.getElementById("gameover")
const restartGameBox = document.getElementById("restartGameBox")
const playAgainButton = document.getElementById("playAgain")
export class ship {
    constructor(lenght) {
        this.lenght = lenght
        this.live = true
        this.impacts = 0
    }
    // Aumenta el numero de impactos de mi barco
    hit() {

        this.impacts = this.impacts + 1
    }
    // verifica si es que el barco esta undido en funcion de su largo
    isSunk() {
        if (this.impacts >= this.lenght) {
            this.live = false
        }
    }
}

// creaccion de la gameboard
export class gameboard {
    constructor() {
        this.mapArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        ]
        // barcos en tablero
        this.ships = []
        this.failShots = Array.from({ length: 10 }, () => Array(10).fill(0));
        // muetra los disparos fallidos e acertados

    }

    // introduce el barco al tablero 
    pushShip(y, x, length, direction) {
        const newShip = new ship(length);

        // Verificar si la posición está disponible
        if (isPositionAvailable(this.mapArray, x, y, length, direction)) {
            this.ships.push(newShip);

            if (direction === "horizontal") {
                for (let i = 0; i < length; i++) {
                    this.mapArray[y][x + i] = 1;
                }
            } else if (direction === "vertical") {
                for (let i = 0; i < length; i++) {
                    this.mapArray[y + i][x] = 1;
                }
            }
        } else {
            // Si la posición no está disponible, vuelve a intentar con nuevas coordenadas
            this.pushShip(randomnum(10), randomnum(10), length, direction);
        }
    }

    displayGrid() {
        // Limpiar el contenido existente
        enemyGrid.innerHTML = '';

        this.mapArray.forEach((row, rowIndex) => {
            row.forEach((cellValue, columnIndex) => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");


                if (cellValue === 3) {
                    // Lógica para celdas con valor 3
                    gridItem.style.backgroundColor = "gray";
                } else if (cellValue === 2) {
                    gridItem.style.backgroundColor = "red";
                }

                // Agregar el evento de clic
                gridItem.addEventListener("click", () => {

                    enemiboard.Atack(rowIndex, columnIndex);
                    enemiboard.displayGrid();



                });

                // Agregar el nuevo elemento a la cuadrícula
                enemyGrid.appendChild(gridItem);
            });
        });
    }

    // verifica si la bala impacto al barco
    // !!!!! INVESTIGAR FUNCION Y METODO FIN!!!

    Atack(y, x) {



        const ship = this.ships.find(ship => {
            // Check if the ship occupies the specified position
            if (ship.live && this.mapArray[y][x] === 1) {
                return true;
            }

            return false;
        });

        if (ship) {
            console.log("Barco impactado");
            this.failShots[y][x] = 2;
            this.mapArray[y][x] = 2
            ship.hit();  // Call the hit method on the found ship
            ship.isSunk();  // Call the isSunk method on the found ship
            enemiboard.verifyShip()
            createmygird.computerPlay()
        } else if (this.mapArray[y][x] === 0) {
            console.log("Disparo fallido");
            this.mapArray[y][x] = 3
            this.failShots[y][x] = 1;
            createmygird.computerPlay()
        }

    }
    // verifica si todos los barcos estan undidos
    verifyShip() {
        let i = 0
        this.ships.forEach(element => {
            if (!element.live) {
                i += 1
                if (i === this.ships.length) {
                    h1win.textContent = "Ganastee!!"
                    GameOver.style.display = "block"
                    restartGameBox.style.display = "block"
                }
            }
        });
    }
}
function randomnum(rango) {
    var numeroAleatorio = Math.floor(Math.random() * rango);
    return numeroAleatorio;
}

function isPositionAvailable(board, x, y, size, direction) {
    // Verificar si la posición está dentro del tablero
    if (direction === "horizontal" && x + size > board[0].length) {
        return false;
    }
    if (direction === "vertical" && y + size > board.length) {
        return false;
    }

    // Verificar si la posición está ocupada por otro barco
    for (let i = 0; i < size; i++) {
        if (direction === "horizontal" && board[y][x + i] !== 0) {
            return false;
        }
        if (direction === "vertical" && board[y + i][x] !== 0) {
            return false;
        }
    }

    return true;
}

function CreateEnmyShips() {
    enemiboard.pushShip(randomnum(6), randomnum(10), 5, "vertical");
    enemiboard.pushShip(randomnum(10), randomnum(7), 4, "horizontal");
    enemiboard.pushShip(randomnum(10), randomnum(8), 3, "horizontal");
    enemiboard.pushShip(randomnum(10), randomnum(8), 3, "horizontal");
    enemiboard.pushShip(randomnum(9), randomnum(10), 2, "vertical");
}

function pushShip(x, y, size, direction) {
    if (isPositionAvailable(enemiboard.mapArray, x, y, size, direction)) {
        enemiboard.pushShip(x, y, size, direction);
    } else {
        // Si la posición no está disponible, vuelve a intentar con nuevas coordenadas
        CreateEnmyShips();
    }
}


const enemiboard = new gameboard()

CreateEnmyShips()
enemiboard.displayGrid()
console.log(enemiboard)

playAgainButton.addEventListener("click", () => {
    location.reload();
})


