let s=new Scribble();
let board=new Array();
let CurrPlayer='p1';

function setup() {
  createCanvas(400, 400);
  s.scribbleLine(3,3,width-3,3);
  s.scribbleLine(3,3,3,height-3);
  s.scribbleLine(3,height-3,width-3,height-3);
  s.scribbleLine(width-3,height-3,height-3,3);
  draw_board();
  CurrPlayer=random(['p1','p2']);
  if(CurrPlayer=='p1'){
    textSize(50);
    fill(color(0,0,255,140));
    textAlign('center');
    text('Player 1',width/2,height/2);
  }
  else{
    textSize(50);
    fill(color(255,0,0,140));
    textAlign('center');
    text('Player 2',width/2,height/2);
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
  noFill();
  if((board[int(mouseX/(width/3))+3*int(mouseY/(height/3))])==null && CurrPlayer=='p1'){
    drawSymbol(int(mouseX/(width/3))+3*int(mouseY/(height/3)),'x');
    console.log("p1");
    CurrPlayer='p2';
    textSize(50);
    fill(color('white'));
    textAlign('center');
    text('Player 1',width/2,height/2);
    textSize(50);
    fill(color(255,0,0,140));
    textAlign('center');
    text('Player 2',width/2,height/2);
  }
  else if((board[int(mouseX/(width/3))+3*int(mouseY/(height/3))])==null && CurrPlayer=='p2'){
    drawSymbol(int(mouseX/(width/3))+3*int(mouseY/(height/3)),'o');
    console.log("p2");
    CurrPlayer='p1';
    textSize(50);
    fill(color('white'));
    textAlign('center');
    text('Player 2',width/2,height/2);
    textSize(50);
    fill(color(0,0,255,140));
    textAlign('center');
    text('Player 1',width/2,height/2);
  }
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
    console.log('here');
    if(board[i]==='x' && board[i+1]==='x' && board[i+2]==='x'){
      alert("Player 1 Wins");
      board=[];
      setup();
    }
    else if(board[i]==='o' && board[i+1]==='o' && board[i+2]==='o'){
      alert("Player 2 Wins");
      board=[];
      setup();
    }
  }
  for(i=0;i<3;i++){
    console.log('here');
    if(board[i]==='x' && board[i+3]==='x' && board[i+6]==='x'){
      alert("Player 1 Wins");
      board=[];
      setup();
    }
    else if(board[i]==='o' && board[i+3]==='o' && board[i+6]==='o'){
      alert("Player 2 Wins");
      board=[];
      setup();
    }
  }
  if(board[0]==='x' && board[4]==='x' && board[8]==='x'){
    alert("Player 1 Wins");
    board=[];
    setup();
  }
  else if(board[0]==='o' && board[4]==='o' && board[8]==='o'){
    alert("Player 2 Wins");
    board=[];
    setup();
  }
  else if(board[2]==='o' && board[4]==='o' && board[6]==='o'){
    alert("Player 2 Wins");
    board=[];
    setup();
  }
  else if(board[2]==='x' && board[4]==='x' && board[6]==='x'){
    alert("Player 1 Wins");
    board=[];
    setup();
  }
  
  if (tie === true){
    alert("Its a Draw");
    board=[];
    setup();
  }
}

function draw(){
  //console.log(int(mouseX/(width/3)),int(mouseY/(height/3)));
  checkwin();
}