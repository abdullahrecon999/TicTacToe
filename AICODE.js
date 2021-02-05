let s=new Scribble();
let board=new Array(9);
board.length=9;
let availIdx=new Array();
let addIdx=new Array();
let CurrPlayer='p1';

function setup() {
  createCanvas(400, 400);
  availIdx=[];
  for(i=0;i<9;i++){
    board[i]='';
    availIdx.push(i);
  }
  console.log((board.length>9)?"Error":"");
  s.scribbleLine(3,3,width-3,3);
  s.scribbleLine(3,3,3,height-3);
  s.scribbleLine(3,height-3,width-3,height-3);
  s.scribbleLine(width-3,height-3,height-3,3);
  draw_board();
  //CurrPlayer=random(['p1','p2']);
  CurrPlayer='p2';
  if(CurrPlayer=='p1'){
    textSize(50);
    fill(color(0,0,255,140));
    textAlign('center');
    text('Player 1',width/2,height/2);
  }
  else{
    nextMove();
  }
}

function draw_board(){
  s.scribbleLine(width/3,20,width/3,height-20);
  s.scribbleLine(2*width/3,20,2*width/3,height-20);
  s.scribbleLine(20,height/3,height-20,height/3);
  s.scribbleLine(20,2*height/3,(2*height/2)-20,2*height/3);
}

function drawSymbol(region,symbol){
  board[region]=symbol;
  let x,y;
  switch(region){
    case 0:
      x=1/6*width;
      y=1/6*height;
      break;
    case 1:
      x=((1/3)+1/6)*width;
      y=1/6*height;
      break;
    case 2:
      x=((1/3)+(1/2))*width;
      y=1/6*height;
      break;

    case 3:
      x=1/6*width;
      y=((1/6)+1/3)*height;
      break;
    case 4:
      x=((1/3)+1/6)*width;
      y=((1/6)+1/3)*height;
      break;
    case 5:
      x=((1/3)+(1/2))*width;
      y=((1/6)+1/3)*height;
      break;

    case 6:
      x=1/6*width;
      y=((1/2)+1/3)*height;
      break;
    case 7:
      x=((1/3)+1/6)*width;
      y=((1/2)+1/3)*height;
      break;
    case 8:
      x=((1/3)+(1/2))*width;
      y=((1/2)+1/3)*height;    
      break;
  }

  if(symbol==='o'){
    s.scribbleEllipse(x,y,100,100);
  }
  else if(symbol==='x'){
    s.scribbleLine(x-50,y-50,x+50,y+50);
    s.scribbleLine(x-50,y+50,x+50,y-50);
  }
}

function mousePressed(){
  checkwin();
  noFill();
  if((board[int(mouseX/(width/3))+3*int(mouseY/(height/3))])==null || (board[int(mouseX/(width/3))+3*int(mouseY/(height/3))])=="" && CurrPlayer=='p1'){
    let value=int(mouseX/(width/3))+3*int(mouseY/(height/3));
    drawSymbol(value,'x');
    const index=availIdx.indexOf(value);
    availIdx.splice(index,1);
    console.log("p1");
    CurrPlayer='p2';
    textSize(50);
    fill(color('white'));
    textAlign('center');
    text('Player 1',width/2,height/2);
    textSize(50);
    //fill(color(255,0,0,140));
    textAlign('center');
    text('Player 2',width/2,height/2);
  }
  if(CurrPlayer=='p2'){
    //drawSymbol(int(mouseX/(width/3))+3*int(mouseY/(height/3)),'o');
    nextMove();
  }
  checkwin();
}

function checkwin(){
  let tie=false;
  let count=0;
  for(i=0;i<9;i++){
    if(board[i]==='x' || board[i]==='o'){
      count++;
    }
    if(count>=9){
      tie=true;
    }
    else{
      tie=false;
    }
  }

  for(i=0;i<7;i+=3){
    if(board[i]==='x' && board[i+1]==='x' && board[i+2]==='x'){
      alert("Player 1 Wins");
      board=[];
      setup();
      tie=false;
      return 'p1';
    }
    else if(board[i]==='o' && board[i+1]==='o' && board[i+2]==='o'){
      alert("Player 2 Wins");
      board=[];
      setup();
      tie=false;
      return 'p2';
    }
  }
  for(i=0;i<3;i++){
    if(board[i]==='x' && board[i+3]==='x' && board[i+6]==='x'){
      alert("Player 1 Wins");
      board=[];
      setup();
      tie=false;
      return 'p1';
    }
    else if(board[i]==='o' && board[i+3]==='o' && board[i+6]==='o'){
      alert("Player 2 Wins");
      board=[];
      setup();
      tie=false;
      return 'p2';
    }
  }
  if(board[0]==='x' && board[4]==='x' && board[8]==='x'){
    alert("Player 1 Wins");
    board=[];
    setup();
    tie=false;
    return 'p1';
  }
  else if(board[0]==='o' && board[4]==='o' && board[8]==='o'){
    alert("Player 2 Wins");
    board=[];
    setup();
    tie=false;
    return 'p2';
  }
  else if(board[2]==='o' && board[4]==='o' && board[6]==='o'){
    alert("Player 2 Wins");
    board=[];
    setup();
    tie=false;
    return 'p2';
  }
  else if(board[2]==='x' && board[4]==='x' && board[6]==='x'){
    alert("Player 1 Wins");
    board=[];
    setup();
    tie=false;
    return 'p1';
  }
  
  if (tie === true){
    alert("Its a Draw");
    board=[];
    setup();
    tie=false;
    return 'tie';
  }
}

function nextMove(){
  // let a=random(availIdx);
  // console.log(availIdx);
  // drawSymbol(a,'o');
  // availIdx.splice(availIdx.indexOf(a),1);
  console.log("Called nextMove");
  let bestS=-Infinity;
  let bestMove;
  let copy=board.slice();

  for(i=0;i<12;i++){
    console.log(copy);
    if(copy[i]===''){
      console.log("here 2");
      //drawSymbol(i,'o');
      copy[i]='o';
      let score=minimax(copy,false);
      //let score=1;
      //copy[i]='';
      //alert(board);
      console.log((board.length>9)?"Error itr: "+i:"");
      if(score>bestS){
        bestS=score;
        bestMove=i;
      }
    }
  }
  console.log("Best move is: "+bestMove);
  console.log("drawn an o at: "+bestMove);
  drawSymbol(bestMove,'o');

  addIdx.push(bestMove);
  availIdx.splice(availIdx.indexOf(bestMove),1);
  //console.log(availIdx);
  CurrPlayer='p1';
  textSize(50);
  fill(color('white'));
  textAlign('center');
  text('Player 2',width/2,height/2);
  fill(color(0,0,255,140));
  text('Player 1',width/2,height/2);
}

let scores={
  'p1':-1,
  'p2':1,
  'tie':0
};

function minimax(board1,isMax){

  let result=Winner();
  console.log("Result: "+result);
  if(result!==undefined){
    console.log("bye");
    return scores[result];
  }

  if(isMax){
    let bestScore=-Infinity;
    for(k=0;k<6;k++){
      if(board1[k]==''){
        console.log("isMax");
        board1[k]='o';
        let score=minimax(board1,false);
        console.log("K: "+k);
        //board1[k]='';
        console.log("cleared");
        bestScore=max(score,bestScore);
      }
    }
    return bestScore;
  }
  else{
    let bestScore=Infinity;
    for(j=0;j<6;j++){
      if(board1[j]==''){
        console.log("not isMax");
        board1[j]='x';
        let score=minimax(board1,true);
        console.log("j: "+j);
        //board1[j]='';
        console.log("cleared");
        bestScore=min(score,bestScore);
      }
    }
    return bestScore;
  }
}

function Winner(){
  console.log("called");
  let tie=false;
  let count=0;
  for(i=0;i<9;i++){
    if(board[i]==='x' || board[i]==='o'){
      count++;
    }
    if(count>=9){
      tie=true;
    }
    else{
      tie=false;
    }
  }

  for(i=0;i<7;i+=3){
    if(board[i]==='x' && board[i+1]==='x' && board[i+2]==='x'){
      tie=false;
      return 'p1';
    }
    else if(board[i]==='o' && board[i+1]==='o' && board[i+2]==='o'){
      tie=false;
      return 'p2';
    }
  }
  for(i=0;i<3;i++){
    if(board[i]==='x' && board[i+3]==='x' && board[i+6]==='x'){
      tie=false;
      return 'p1';
    }
    else if(board[i]==='o' && board[i+3]==='o' && board[i+6]==='o'){
      tie=false;
      return 'p2';
    }
  }
  if(board[0]==='x' && board[4]==='x' && board[8]==='x'){
    tie=false;
    return 'p1';
  }
  else if(board[0]==='o' && board[4]==='o' && board[8]==='o'){
    tie=false;
    return 'p2';
  }
  else if(board[2]==='o' && board[4]==='o' && board[6]==='o'){
    tie=false;
    return 'p2';
  }
  else if(board[2]==='x' && board[4]==='x' && board[6]==='x'){
    tie=false;
    return 'p1';
  }
  
  if (tie === true){
    tie=false;
    return 'tie';
  }
}

function draw(){
  //console.log(int(mouseX/(width/3)),int(mouseY/(height/3)));
  //checkwin();
}