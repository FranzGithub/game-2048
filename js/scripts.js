let score = 0
let best = 0
let matrix = ['','','','',
              '','','','',
              '','','','',
              '','','','']

setupGame()

function setupGame(){
  score = 0
  document.getElementById("score").innerHTML = score
  for (let i = 0; i < 16; i++){
    matrix[i] = document.createElement("div")
    document.getElementById("board").appendChild(matrix[i])
  }
  placeNumber()
  placeNumber()
}

function placeNumber(){
  const remainingFields = emptyFields()
  if(remainingFields.length == 0){
    gameOver()
  }
  else{
    const square = shuffleArray(remainingFields)[0]
    const number = Math.random() < 0.5 ? 2 : 4
    square.innerHTML = number
  }
}

function setScore(score){

}

function gameOver(){
  if(score > best){
    best = score
    document.getElementById("best").innerHTML = best
  }
  alert("Game over")
  document.getElementById("board").innerHTML = ''
  setupGame()
}

function emptyFields(){
  return matrix.filter(i => i.innerHTML == "");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

document.addEventListener('keyup', function (event) {
  if (event.defaultPrevented) {
      return;
  }

  var key = event.key || event.keyCode;

  if (key === 'ArrowUp' || key === 38) {
    rotateBoard90(1)
    for(let i = 3; i < 16; i = i + 4){
      performRotation(i)
      performAddition(i)
    }
    rotateBoard90(3)
    placeNumber()
  }

  if (key === 'ArrowRight' || key === 39) {
    for(let i = 3; i < 16; i = i + 4){
      performRotation(i)
      performAddition(i)
    }
    placeNumber()
  }

  if (key === 'ArrowDown' || key === 40) {
    rotateBoard90(3)
    for(let i = 3; i < 16; i = i + 4){
      performRotation(i)
      performAddition(i)
    }
    rotateBoard90(1)
    placeNumber()
  }

  if (key === 'ArrowLeft' || key === 37) {
    rotateBoard90(2)
    for(let i = 3; i < 16; i = i + 4){
      performRotation(i)
      performAddition(i)
    }
    rotateBoard90(2)
    placeNumber()
  }
})

function rotate(start, end){
  for(let i = end; i > start; i--){
    matrix[i].innerHTML = matrix[i-1].innerHTML
  }
  matrix[start].innerHTML = ""
}

function performRotation(i){
  const rowstart = i - 3
  for(let j = i; j > rowstart; j--){
    const start = rowstart
    const end = j
    
    let rotations = 0
    while(matrix[end].innerHTML == "" && rotations < (end-start)){
      rotate(start, end)
      rotations++
    } 
  }
}

function performAddition(i){
  const rowstart = i - 3
  for(let j = i; j > rowstart; j--){
    const start = rowstart
    const end = j

    if(matrix[end].innerHTML !== ""){
      if(matrix[end].innerHTML === matrix[end-1].innerHTML){
        matrix[end].innerHTML = matrix[end].innerHTML * 2
        score += parseInt(matrix[end].innerHTML)
        document.getElementById("score").innerHTML = score
        matrix[end-1].innerHTML = ""
        rotate(start, end-1)
      }
    }
  }
}

function rotateBoard90(times){
  for(let x = 0; x < times; x++){
    let copy = []
    for(i = 0; i < matrix.length; i++){
      copy[i] = document.createElement("div")
      copy[i].innerHTML = matrix[i].innerHTML
    }
    matrix[3].innerHTML = copy[0].innerHTML
    matrix[7].innerHTML = copy[1].innerHTML
    matrix[11].innerHTML = copy[2].innerHTML
    matrix[15].innerHTML = copy[3].innerHTML
    matrix[2].innerHTML = copy[4].innerHTML
    matrix[6].innerHTML = copy[5].innerHTML
    matrix[10].innerHTML = copy[6].innerHTML
    matrix[14].innerHTML = copy[7].innerHTML
    matrix[1].innerHTML = copy[8].innerHTML
    matrix[5].innerHTML = copy[9].innerHTML
    matrix[9].innerHTML = copy[10].innerHTML
    matrix[13].innerHTML = copy[11].innerHTML
    matrix[0].innerHTML = copy[12].innerHTML
    matrix[4].innerHTML = copy[13].innerHTML
    matrix[8].innerHTML = copy[14].innerHTML
    matrix[12].innerHTML = copy[15].innerHTML
  }
}

const canvas_dom = document.getElementById("board")
canvas_dom.addEventListener("touchstart",  function(event) {event.preventDefault()})
canvas_dom.addEventListener("touchmove",   function(event) {event.preventDefault()})
canvas_dom.addEventListener("touchend",    function(event) {event.preventDefault()})
canvas_dom.addEventListener("touchcancel", function(event) {event.preventDefault()})
