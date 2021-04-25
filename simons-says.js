//global variable
const round_num = 5;// to set how many rounds to play
let q_box = [];// question box, value set by simon_says()
let a_box = [];// answer box, value set by answer_select()
let index = 0;// for locating the question & answer
let startGame = false; //boolean to set condition

//function to start the game
function start_game() {
  startGame = true;//set true to allow answer can be enter in a_box
  document.getElementById("start_btn").disabled = true;

  if(!q_box.length || q_box.length < round_num){//to check if the q_box are full
    let rand = Math.floor(Math.random() * 9);
    q_box.push(rand); 
    document.getElementById("roundnum").innerHTML = q_box.length;
    index = 0;
    simon_says();
    console.log(q_box);
  } else {
    alert("Game is done! Click 'RE-START' to play.");
    document.getElementById("start_btn").disabled = false;
    document.getElementById("start_btn").innerText = "RE-START";
  }
}

//function to which button to display
function simon_says(){
  
  setTimeout(function(){
    
    let box = document.getElementById("qb_"+q_box[index]);
    box.style.backgroundColor= "red";
    setTimeout(function(){box.style.backgroundColor = ""}, 500);
    index++;
    
    if(index < q_box.length){
      simon_says();
    }
  }, 1000);
}

//function to click which box to answer
function answer_select(ans_box){
  if(startGame){
  a_box.push(ans_box);
  
    if(a_box.length === q_box.length){

      if(check_result(a_box.length)) {
          document.getElementById("result").innerText = "CORRECT!";
          document.getElementById("result").style.color = "green";
        a_box.length = 0;
        start_game();
      } else {
        document.getElementById("result").innerText = "WRONG";
        document.getElementById("result").style.color = "red";
        setTimeout(function(){
          document.getElementById("result").innerText = "RE-START to play";
          document.getElementById("result").style.color = "";
          document.getElementById("roundnum").innerText = 0;
          document.getElementById("start_btn").innerText = "RE-START";
          document.getElementById("start_btn").disabled = false;
        }, 3000);
        startGame = false;
        q_box.length = 0;
        a_box.length = 0;
      }
    }
  }
}

//function to check the result of the selected box
function check_result(ans_num){
  let all_correct = true;
  for(let i=0; i < ans_num; i++){
    if(a_box[i] !== q_box[i]){
      console.log("there's incorrect answer");
      all_correct = false;
    }
  }
  return all_correct;
}