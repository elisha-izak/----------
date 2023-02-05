
const board = document.getElementById("bord");



   const oneScore = document.createElement("div"); 
   oneScore.className = "score oneScore";
   oneScore.innerHTML = "ראשון: ";
   const oneScoreBoard = document.createElement("span"); 
   oneScoreBoard.className = "oneScoreBoard";
   oneScoreBoard.innerHTML = 0;
   oneScore.appendChild(oneScoreBoard)


   const twoScore = document.createElement("div"); 
   twoScore.className = "score twoScore";
   twoScore.innerHTML = "שני: ";
   const twoScoreBoard = document.createElement("span"); 
   twoScoreBoard.className = "twoScoreBoard";
   twoScoreBoard.innerHTML = 0;
   twoScore.appendChild(twoScoreBoard)




const parti = document.querySelector(".parti"); 
parti.innerHTML = "ברוך הבא";

const oneParti = document.createElement("button");
oneParti.className = "smallGame game";
oneParti.innerHTML = "שחקן אחד";
const toParti = document.createElement("button");
toParti.className = "mediumGame game"
toParti.innerHTML = "שני שחקנים";
oneParti.addEventListener("click", onePartifun)
toParti.addEventListener("click", toPartifun)
parti.appendChild(oneParti)
parti.appendChild(toParti)
let numParti;
let numPartiBul = false;



function onePartifun(){
    numParti = 1;
    parti.style.display = "none";
    size.style.display = ""; 
    twoScore.style.display = "none"; 
    
}

function toPartifun(){
    numParti = 2;
    parti.style.display = "none";
    size.style.display = ""; 
    twoScore.style.display = ""; 
}
   




const size = document.querySelector(".size"); 
size.innerHTML = ":בחר גודל לוח";



const smallGame = document.createElement("button");
smallGame.className = "smallGame game";
smallGame.innerHTML = "קטן";
const mediumGame = document.createElement("button");
mediumGame.className = "mediumGame game"
mediumGame.innerHTML = "בינוני";
smallGame.addEventListener("click", init1)
mediumGame.addEventListener("click", init2)
size.appendChild(smallGame)
size.appendChild(mediumGame)

size.style.display = "none"; 





function playAgainFun() {
   const playAgain = document.createElement("button")
   playAgain.className = ("button")
   playAgain.innerHTML = "משחק חדש";
   playAgain.addEventListener("click", replay)
   return playAgain;
}


function replay() {
    board.innerHTML = "";
   parti.style.display = ""; 
    oneScoreBoard.innerHTML = 0;
    twoScoreBoard.innerHTML = 0;

}



// popup.style.display = "none"; 

// setTimeout(checkWon,500) 







function shufle(crd) {
    
    for (i in crd) {
        let ranI = Math.floor(Math.random() * crd.length);
        let temp = crd[i];
        crd[i] = crd[ranI];
        crd[ranI] = temp;
    }
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.id === 'pressed') return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();

}


function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    pressedCard(firstCard);
    secondCard.removeEventListener("click", flipCard);
    pressedCard(secondCard);
    resetBoard();
    if(numParti == 1){
        oneScoreBoard.innerHTML = Number(oneScoreBoard.innerHTML) + 2;
    }
    else{
         if(numPartiBul){
                      twoScoreBoard.innerHTML = Number(twoScoreBoard.innerHTML) + 2; 
                     }
         else{
              oneScoreBoard.innerHTML = Number(oneScoreBoard.innerHTML) + 2; 
             }
       }
}



function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
    if(numParti == 2){
    if(numPartiBul){
        numPartiBul = false
    }
    else{
    numPartiBul = true
    }
}
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}


function pressedCard(e) {
    e.id = 'pressed';
}









function creatCard(crd,wid) {
    const cardElement = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    const imgs = document.createElement("img");
    // cardElement.id = Number(idx) + 1;
    cardElement.className = "card";
    cardElement.onclick = flipCard;
    cardElement.setAttribute("data-framework", crd.name);
    // cardElement.style.height = '(100/crd.length)%'
    cardElement.style.width = wid;
    front.className = "front";
    imgs.setAttribute("src", crd.img);
    back.className = "back";
    cardElement.appendChild(front);
    cardElement.appendChild(back);
    front.appendChild(imgs)
    return cardElement;
}


function widFun(crd){
    if(crd.length === 12){
        return '23.293%';
    }
   return '15%'};




function init(crd) {
    shufle(crd);
    board.appendChild(oneScore);
    board.appendChild(twoScore);
    let wid = widFun(crd);
    for (c in crd) {
        board.appendChild(creatCard(crd[c],wid));
    } 
    board.appendChild(playAgainFun())
    
}










function init1() {
    let crd = cards.slice(0,12)
    init(crd);   
    size.style.display = "none"; 
}



function init2() {
    let crd = cards.slice(0,24) 
    init(crd);
    size.style.display = "none"; 
}





// init1() 
// init2()
