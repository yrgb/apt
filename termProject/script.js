let m1=document.getElementById("m1")
let m2=document.getElementById("m2")
let m3=document.getElementById("m3")
let m4=document.getElementById("m4")

let h1=document.getElementById("h1")
let h2=document.getElementById("h2")
let h3=document.getElementById("h3")
let h4=document.getElementById("h4")

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
let movesContainer = document.querySelector('.moves');

let ratingvalue = 0;
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

	let stars = [document.querySelectorAll('.fa-star')];
	let moveCounter=0
	const cards = document.querySelectorAll('.memory-card');
	
	let hasFlippedCard = false;
	let lockBoard = false;
	let firstCard, secondCard;
	let counter=0
	
	let t
	function flipCard() {

	  if (lockBoard) return;
	  if (this === firstCard) return;
	  if(moveCounter==0)
	  {
	      t=setInterval(setTime, 1000);
	  }
	  
	  this.classList.add('flip');
	
	 movesContainer.textContent = ++moveCounter;
	 
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

	  if(isMatch)
	  {
		  disableCards()
		  counter+=1
	  }
	  else
	  	unflipCards()
	  	
	  if(counter==cards.length/2)
	  {
		setTimeout(() => {
		alert("You Win! \n time you use is: " + minutesLabel.outerText+"."+secondsLabel.outerText+ "\nYour performance: "+ratingvalue +" star.")
	    reset()

	  }, 700);
	  	
	  }
	  
	}
	
	function disableCards() {
	  firstCard.removeEventListener('click', flipCard);
	  secondCard.removeEventListener('click', flipCard);
	
	  resetBoard();
	}
	
	function unflipCards() {
	  lockBoard = true;
	
	  setTimeout(() => {
	    firstCard.classList.remove('flip');
	    secondCard.classList.remove('flip');
	
	    resetBoard();
	  }, 700);
	  
	  rating()

	}
	
	function resetBoard() {
	  [hasFlippedCard, lockBoard] = [false, false];
	  [firstCard, secondCard] = [null, null];
	}
	
	(function () {

	m1.hidden=true
	m2.hidden=true
	m3.hidden=true
	m4.hidden=true
	h1.hidden=true
	h2.hidden=true
	h3.hidden=true
	h4.hidden=true
	counter=4

	 shuffle()
	})();
	
	function easy()
	{

	location.reload();
	}
	
	function medium()
	{
	    resetLevel()
	    alert("level: medium")

		m1.hidden=false
		m2.hidden=false
		m3.hidden=false
		m4.hidden=false
		counter=2
	}
	
	function hard()
	{
		
		resetLevel()
		alert("level: hard")
		m1.hidden=false
		m2.hidden=false
		m3.hidden=false
		m4.hidden=false
		
		h1.hidden=false
		h2.hidden=false
		h3.hidden=false
		h4.hidden=false
		counter=0;
	   
	}
	function resetLevel()
	{
		m1.hidden=true
		m2.hidden=true
		m3.hidden=true
		m4.hidden=true
		h1.hidden=true
		h2.hidden=true
		h3.hidden=true
		h4.hidden=true		
	 	resetBoard();
		for(let i of cards)
		{
		    i.classList.remove('flip')
			i.addEventListener('click', flipCard)
		}
		moveCounter=0
		movesContainer.textContent =0;
		
		clearInterval(t);
		minutesLabel.textContent="00"
		secondsLabel.textContent="00"
		totalSeconds=0
	}
	
	function reset()
	{
		for(let i of cards)
		{
			i.classList.remove('flip')
			i.addEventListener('click', flipCard)
		}
			
		location.reload();
		
	}
	
	function shuffle()
	{
		cards.forEach(card => {
	    let randomPos = Math.floor(Math.random() * cards.length);
	    card.style.order = randomPos;
	  });
	}


function rating() {

    for (star of stars) {
        if (moveCounter === 10) {
            star[2].classList.remove("gold-star");
            ratingvalue = "  Very Good " + 2;
        } else if (moveCounter === 20) {
            star[1].classList.remove("gold-star");
            ratingvalue = " Good " + 1;
        } else if (moveCounter === 30) {
            star[0].classList.remove("gold-star");
	    ratingvalue = " Bad " + 0;
        } else if (moveCounter <= 19) {
            ratingvalue = " Excellent " + 3;
        }
    }

}

function playAgain() {

    let restartbtn = document.querySelector('.restart');
    restartbtn.onclick = function () {
        location.reload();
    }

}


	
	cards.forEach(card => card.addEventListener('click', flipCard));
	playAgain()
	
	 setTimeout(() => {
	 	alert("level: easy")
	  }, 500);
