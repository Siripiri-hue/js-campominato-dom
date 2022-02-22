let bombs = [];
let score, maxScore;

const gridWrapper = document.getElementById("grid-wrapper");
const message = document.createElement("div");
gridWrapper.appendChild(message);
message.setAttribute("id", "message");
// message.innerHTML = `Ciao! Seleziona un livello per iniziare a giocare!`;


//creo funzione per creare la griglia al click del btn
function createGrid (row, column) 
{
    //inizializzo un array vuoto che contenga i numeri da aggiungere alla griglia e la variabile che indica quanto deve essere grande la griglia
    const numbers = []; 
    const totalCells = row * column;
    maxScore = totalCells - 16;

    //riempo l'array con tanti numeri quante sono le celle
    for (let i = 0; i < totalCells ; i++) 
        numbers.push(i+1);

    //seleziono l'elemento grid dall'html ed eventualmente lo "pulisco"
    const grid = document.querySelector("#grid");
    grid.innerHTML = "";
    message.innerHTML = "";
    score = 0;

    //creo l'array di bombe, richiamando la fn
    bombs = createBombs(16, 1, totalCells);
    console.log(bombs.sort());

    //creo tanti quadrati quante devono essere le celle totali
    for (let i = 0; i < totalCells ; i++) 
    {
        //creo un quadratino, gli assegno la classe square e lo "appendo" alla griglia
        const square = document.createElement("div"); 
        square.classList.add("square"); 
        square.setAttribute("style", `width: calc(100% / ${row}`);
        grid.appendChild(square); 

        //prendo il numero dall'array e lo scrivo all'interno del quadratino
        let temp = numbers[i];
        square.append(temp);

        //function game over
        function youLost ()
        {
            // grid.addEventListener('click', (event) => event.preventDefault() );
            // grid.setAttribute("pointer-events", "none");
            console.log(`hai perso`);
            message.innerHTML = `Hai perso, hai totalizzato ${score} punti su ${maxScore}`; //scrivo il messaggio
            square.removeEventListener('click', checkSquares);
        }

        function youWon() 
        {
            message.innerHTML = `Hai vinto, hai totalizzato il massimo punteggio: ` + maxScore; //scrivo il messaggio
        }

        // dichiaro fn che mi faccia vedere se ho cliccato una bomba o no
        function checkSquares ()
        {
            // console.log(this);
            if (bombs.includes(parseInt(this.innerHTML))) 
            {
                // console.log(this.innerHTML);
                this.classList.add("bomb"); // aggiungo la classe bomba e coloro la cella di rosso
                youLost(); // se l'utente clicca su una bomba, richiamo la fn "hai perso"
            } 
            else 
            {
                square.style.backgroundColor = '#7f7fff'; //altrimenti la coloro di azzurro
                score += 1; //aggiungo uno al punteggio
                console.log(`punteggio parziale: ` + score); //stampo il punteggio parziale
                this.removeEventListener('click', checkSquares); //rimuovo il click dalla cella
                if (score === maxScore)
                    youWon();
            }
        }

        // aggiungo evento al click dei quadratini e richiamo fn checksquare
        square.addEventListener('click', checkSquares);
    }
}

//creo funzione che crea array di bombe con la fn random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function createBombs (maxBombs, min, totalCells)
{
    const arrayBombs = [];
    do 
    {
        let random = getRndInteger(min, totalCells)
        if (!arrayBombs.includes(random))
            arrayBombs.push(random);
    }
    while (arrayBombs.length < maxBombs);

    return arrayBombs;
}

//seleziono il select e il btn dal dom e, a seconda della difficoltà scelta, creo una griglia

const btn = document.getElementById("selectBtn");

btn.addEventListener('click', function() 
{
    const selectElement = document.getElementById('difficulty');
    switch (selectElement.value)
    {
        case "easy":
            createGrid(10, 10);
            // window.location.reload();
            break;
        case "hard":
            // window.location.reload();
            createGrid(9, 9);
            break;
        case "crazy":
            // window.location.reload();
            createGrid(7, 7);
            break;
    } 
});