//shuffling the cards when the game stars.
let cards = document.querySelectorAll('.card');
let childrenHolder=[];
for(i=0;i<=15;i++){
  childrenHolder.push(cards[i].firstElementChild);
}
childrenHolder= shuffle(childrenHolder);
for(i=0;i<=15;i++){
  cards[i].removeChild(cards[i].childNodes[0]);
  cards[i].appendChild(childrenHolder[i]);
}


//Declaretion block of global variables.
const deck = document.querySelector('.deck');
const restBtn = document.querySelector('.restart');
let cardCounter=0;
let holdCards=[];
let moveCounter=document.querySelector('.moves').innerHTML;
let starsNumber = document.querySelectorAll(".fa-star");
let timer = document.querySelector(".timer");
let interval;
let sec = 0;
let min = 0;


//When the card is being clicked, then it should be opened, showen, compared, and kept opened if matched. Also, stars should be calculated.
deck.addEventListener('click', whenClicked);


//When a click happens function.
function whenClicked(event){
  if(event.target.className!=="deck"&& event.target.className!=="card open show"&& event.target.className!=="card match" && event.target.className!==null){

    //Assigning a new variable called card and then adding the classes open and show.
    let card= event.target;
    card.classList.add('open','show');

    //Counting the number of moves and the number of cards.Then, holding the card in the array hold cards.
    moveCounter++;
    cardCounter++;
    holdCards.push(card);

    //Showing the move counter in the HTML.
    document.querySelector('.moves').innerHTML=moveCounter;

    //start timer on first click
    if(moveCounter == 1){
        sec = 0;
        min = 0;
        startTimer();
    }

    //Comparing the cards.
    compareCards();

    //Stars calculation
    let starsNumber = document.querySelector(".fa-star");

    if (moveCounter===19) {
      starsNumber.className="deleteStar";
    } else if (moveCounter===25) {
      starsNumber.className="deleteStar";
    }

  }

}


//Reseting the game with a button.
restBtn.addEventListener('click', function(){

    //Reseting the card, move, success, & star counters and the card holder.
    cardCounter=0;
    moveCounter=0;
    document.querySelector('.moves').innerHTML=moveCounter;
    holdCards=[];
    sec=0;
    min=0;

    //Reseting the stars to have three stars
    for(let i=0; i<=starsNumber.length-1; i++){
    starsNumber[i].className="fa fa-star";}
    stopTimer();

    //Reseting the open cards.
    if(document.querySelector('.open')){
      let openedCards= document.querySelector('.open');
      openedCards.className="card";
    }

    //Reseting the matched cards.
    let matchedCardsLength=document.querySelectorAll('.match');
    for(let i=1;i<=matchedCardsLength.length;i++){
    let matchedCards=document.querySelector('.match');
    matchedCards.className="card";
    }

    //Shuffle the cards before you satrt again.
    childrenHolder= shuffle(childrenHolder);
    for(i=0;i<=15;i++){
      cards[i].appendChild(childrenHolder[i]);
    }

})


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//Stop Timer function.
function stopTimer(){
  //The below delay is used to allow for the sec and min to be rested before clearInterval is executed.
  setTimeout(function(){clearInterval(interval)},500);
}


//Timer function will be updated every second.
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = "---<strong>Timer</strong>: "+min+" <strong>mins</strong> "+sec+" <strong>secs</strong>";
    sec++;
    if(sec == 60){
        min++;
        sec=0;
    }
  },1000);
}


//Compare cards function.
function compareCards(){
  //Card counter when it reaches to two then it will invoke the below if statement.
  if(cardCounter===2){
    //storing the cards in variables card one and card two.
    let cardOne=holdCards[0].firstElementChild.className;
    let cardTwo=holdCards[1].firstElementChild.className;

    if(cardOne===cardTwo){
      // Reseting card counter & card holder and flipping the card in match status.
      cardCounter=0;
      holdCards[0].classList.remove('open','show');
      holdCards[0].classList.add('match');
      holdCards[1].classList.remove('open','show');
      holdCards[1].classList.add('match');
      holdCards=[];

      //Counting all matched cards and stars.
      let matchingCardsNumber=document.querySelectorAll(".match").length;
      let starsRating=document.querySelectorAll(".fa-star").length;

      //If game is completed , then matched cards will be 16 and a winning alert message will popup.
      if(matchingCardsNumber===16){
        clearInterval(interval);
        alert("Congratulation, your time: min " + min + " sec "+ sec + "\n For a number of moves: " + moveCounter +"\n Stars Number is: "+ starsRating);
      }

    }else{
      cardCounter=0;
      setTimeout( function waitBeforeRunning(){
      holdCards[0].className="card";
      holdCards[1].className="card";
      holdCards=[];}, 500)
    }
  }
}
