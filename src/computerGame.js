const MyGrid = document.getElementById("creategame")
const createGame = document.getElementById("startGame")
const main = document.getElementById("main")
const MyShipsGrid = document.getElementById("myGrid")
const enemyGrid = document.getElementById("enemyGrid")
const enemyItem = document.getElementsByClassName("grid-item")
const GameOver = document.getElementById("gameover");
const h1win = document.getElementById("h1win")

var rotated = "horizontal"
class ship {
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
var ChoiseShip = [new ship(5), new ship(4), new ship(3), new ship(3), new ship(2)]

export class createGameboard {
    constructor() {
        this.mapArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.ships = []

    }

    pushShip(y, x, length) {
        const newShip = new ship(length);
        this.ships.push(newShip);

        if (rotated === "horizontal") {
            for (let i = 0; i < length; i++) {
                this.mapArray[y][x + i] = 1;
            }
        } else if (rotated === "vertical") {
            for (let i = 0; i < length; i++) {
                this.mapArray[y + i][x] = 1;
            }
        }

        createmygird.displaygameboard();
    }
    computerPlay() {
        let x, y;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.mapArray[y][x] === 2 || this.mapArray[y][x] === 3);

        const ship = this.ships.find(ship => {
            if (ship.live && this.mapArray[y][x] === 1) {
                return true;
            }
            return false;
        });

        if (ship) {
            console.log("Barco aliado impactado");
            this.mapArray[y][x] = 2;
            ship.hit();
            ship.isSunk();
            createmygird.verifyShip();
        } else if (this.mapArray[y][x] === 0) {
            console.log("Disparo fallido");
            this.mapArray[y][x] = 3;
        }
        createmygird.displaygameboard();
    }
    verifyShip() {
        let i = 0
        this.ships.forEach(element => {
            if (!element.live) {
                i += 1
                if (i === this.ships.length) {
                    h1win.textContent = "Gano El bot!!"
                    GameOver.style.display = "block"
                    restartGameBox.style.display = "block"
                }
            }
        });
    }
    displaygameboard() {
        // Limpiar el contenido existente
        MyGrid.innerHTML = '';

        this.mapArray.forEach((row, rowIndex) => {
            row.forEach((cellValue, columnIndex) => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");


                if (cellValue === 0) {

                } else if (cellValue === 1) {
                    gridItem.style.backgroundColor = "green";

                } else if (cellValue === 2) {
                    gridItem.style.backgroundColor = "red";

                } else if (cellValue === 3) {
                    gridItem.style.backgroundColor = "gray";

                }




                // Agregar el nuevo elemento a la cuadrícula
                MyGrid.appendChild(gridItem);

            });
        });
    }

}
export const createmygird = new createGameboard
var rotateButoon = document.getElementById("rotationButton")
var input = document.getElementById("CordSubmit")

input.addEventListener("click", () => {
    if (ChoiseShip.length === 0) {
        createGame.style.display = "none"
        main.style.display = "grid"
        MyShipsGrid.appendChild(MyGrid)

    }
    let ShipPositionX = document.getElementById("ShipPositionX")
    let ShipPositionY = document.getElementById("ShipPositionY")

    if (rotated === "horizontal") {
        if (createmygird.mapArray[parseInt(ShipPositionY.value)][parseInt(ShipPositionX.value)] === 1 || createmygird.mapArray[parseInt(ShipPositionY.value)][parseInt(ShipPositionX.value) + ChoiseShip[0].lenght] === 1) {
            alert("!! La posicion no es valida, vuelve a intentarlo")
        }
        else if (parseInt(ShipPositionX.value) + ChoiseShip[0].lenght > createmygird.mapArray[0].length) {
            alert("!! La posicion no es valida, vuelve a intentarlo")
        }
        else {

            createmygird.pushShip(parseInt(ShipPositionY.value), parseInt(ShipPositionX.value), ChoiseShip[0].lenght, "horizontal");
            console.log(createmygird.mapArray)
            ChoiseShip.shift()
        }
    } else if (rotated === "vertical") {
        if (
            createmygird.mapArray[parseInt(ShipPositionY.value)][parseInt(ShipPositionX.value)] === 1 ||
            (parseInt(ShipPositionY.value) + ChoiseShip[0].length > createmygird.mapArray.length)
        )
            alert("¡La posición no es válida, vuelve a intentarlo!");
        else {
            createmygird.pushShip(parseInt(ShipPositionY.value), parseInt(ShipPositionX.value), ChoiseShip[0].lenght, "vertical");
            console.log(createmygird.mapArray)
            ChoiseShip.shift()
        }
    }

})
rotateButoon.addEventListener("click", () => {
    if (rotated === "horizontal") {
        rotated = "vertical"
        console.log(rotated)
    } else {
        rotated = "horizontal"
        console.log(rotated)
    }

})



createmygird.displaygameboard()





