// easy
// const row = 10; //imposto il num delle righe della griglia
// const column = 10; //imposto il num delle colonne della griglia
let bombs = [];
//creo funzione per creare la griglia al click del btn
function createGrid (row, column) 
{
    //inizializzo un array vuoto che contenga i numeri da aggiungere alla griglia e la variabile che indica quanto deve essere grande la griglia
    const numbers = []; 
    const totalCells = row * column; 

    //riempo l'array con tanti numeri quante sono le celle
    for (let i = 0; i < totalCells ; i++) 
    {
        numbers.push(i+1);
    }

    //seleziono l'elemento grid dall'html ed eventualmente lo "pulisco"
    const grid = document.querySelector("#grid");
    grid.innerHTML = "";

    //creo l'array di bombe, richiamando la fn
    bombs = createBombs(16, 1, totalCells);
    console.log(bombs);


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

        // aggiungo colore azzurro al click dei quadratini
        square.addEventListener('click', function()
        {
            console.log("I'm working");
            if (bombs.includes(parseInt(this.innerHTML))) {
                console.log(this)
                this.classList.add("bomb");
            } else 
                square.style.backgroundColor = '#7f7fff';
            let check = checkSquare(square);
        });
    }
}

function checkSquare(square) {
    if (square.classList.contains("bomb"))
    {
        console.log("hai perso")
        return true;
    }
        
    else 
    {
        console.log("hai vinto")
        return false;
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

    return arrayBombs
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





