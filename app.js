
// Access all boxes of game
let boxes = document.querySelectorAll(".box");

// Access reset button to reset game at any point
let resetBtn = document.querySelector("#reset-btn");

// Access New Game button to paly game again
let newGameBtn = document.querySelector("#new-btn");

// Access container to display message 
let msgContainer = document.querySelector(".msg-container");

// Access message paragraph 
let msg = document.querySelector("#msg");

// To track alternate turns of players (PlayerX , Player0)
let turnO = true; 

// Count button clicks 

let clickCount = 0;

// 2D Array to store winning patterns (Horizonral, vertical, diagonal)

const winPatterns = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

// reset game

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickCount = 0;
}

// Adding Event Listeners on every box/button

boxes.forEach((box => {
    box.addEventListener("click", () =>{
        clickCount++;
        console.log(clickCount);
        if(turnO){  //PlayerO
            box.innerText = "O";
            turnO = false;
        }else{  //PlayerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner(); // function t chex if there is a winner
    })
}));

// Disable all buttons after winner is announced
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

// Enable all buttons to play again
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// Function to Show Winner

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// Function to Show Draw match

const matchDraw = () => {
    msg.innerText = `Its a Draw. Play Again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
}

// Function to Track Winning Patterns

const checkWinner = () =>{

    let winnerFound = false;
    // clickCount++;
    for(let pattern of winPatterns){

        // Getting all positions against all entries
        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                break; // stop checking after finding winner
            }
        } 
    }  
    // If no winner found and all 9 moves played, it's a draw
    if (!winnerFound && clickCount === 9) {
        matchDraw();
    }
}

// reset game eventlistener

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);