let mySound;
let s=new Scribble();

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ];

let turn;

function setup(){
    createCanvas(500,500);
    strokeWeight(1);
    turn=random(['p','ai']);
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            board[i][j]="";
        }
    }
    if(turn=='ai'){console.log("Issa AI");AiTurn();}
    drawBoard(board);
    checkWin(board);
}

function drawBoard(Board){
    background(255);
    textSize(50);
    fill(color(0,0,255,50));
    textAlign('center');
    text('Player '+'x',width/2,height/2);
    fill(color(255,0,0,50));
    text('Computer '+'o',width/2,(height/2)+50);
    // line(3,3,width-3,3);
    // line(3,3,3,height-3);
    // line(3,height-3,width-3,height-3);
    // line(width-3,height-3,height-3,3);
    randomSeed(4);
    s.scribbleLine(3,3,width-3,3);
    s.scribbleLine(3,3,3,height-3);
    s.scribbleLine(3,height-4,width-3,height-4);
    s.scribbleLine(width-3,height-3,height-3,3);

    // line(width/3,20,width/3,height-20);
    // line(2*width/3,20,2*width/3,height-20);
    // line(20,height/3,height-20,height/3);
    // line(20,2*height/3,(2*height/2)-20,2*height/3);
    s.scribbleLine(width/3,20,width/3,height-20);
    s.scribbleLine(2*width/3,20,2*width/3,height-20);
    s.scribbleLine(20,height/3,height-20,height/3);
    s.scribbleLine(20,2*height/3,(2*height/2)-20,2*height/3);
    for(let a=0;a<3;a++){
        for(let b=0;b<3;b++){
            if(Board[a][b]===''){continue;}
            else{
                let x,y;
                switch((3*a)+b){
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
                if(Board[a][b]==='x'){
                    // line(x-50,y-50,x+50,y+50);
                    // line(x-50,y+50,x+50,y-50);
                    s.scribbleLine(x-50,y-50,x+50,y+50);
                    s.scribbleLine(x-50,y+50,x+50,y-50);
                }
                else if(Board[a][b]==='o'){
                    //circle(x,y,100);
                    s.scribbleEllipse(x,y,100,100);
                }
            }
        }
    }
}

function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('Assets/movie_1');
  }

function checkWin(boardN){
    if(
        (boardN[0][0]=='x' && boardN[0][1]== 'x' && boardN[0][2]=='x') ||
        (boardN[1][0]=='x' && boardN[1][1]=='x' && boardN[1][2]=='x') ||
        (boardN[2][0]=='x' && boardN[2][1]=='x' && boardN[2][2]=='x') ||
        (boardN[0][0]=='x' && boardN[1][1]=='x' && boardN[2][2]=='x') ||
        (boardN[2][0]=='x' && boardN[1][1]=='x' && boardN[0][2]=='x') ||
        (boardN[0][0]=='x' && boardN[1][0]=='x' && boardN[2][0]=='x') ||
        (boardN[0][1]=='x' && boardN[1][1]=='x' && boardN[2][1]=='x') ||
        (boardN[0][2]=='x' && boardN[1][2]=='x' && boardN[2][2]=='x')
    ){return 'player';}
    else if(
        (boardN[0][0]=='o' && boardN[0][1]== 'o' && boardN[0][2]=='o') ||
        (boardN[1][0]=='o' && boardN[1][1]=='o' && boardN[1][2]=='o') ||
        (boardN[2][0]=='o' && boardN[2][1]=='o' && boardN[2][2]=='o') ||
        (boardN[0][0]=='o' && boardN[1][1]=='o' && boardN[2][2]=='o') ||
        (boardN[2][0]=='o' && boardN[1][1]=='o' && boardN[0][2]=='o') ||
        (boardN[0][0]=='o' && boardN[1][0]=='o' && boardN[2][0]=='o') ||
        (boardN[0][1]=='o' && boardN[1][1]=='o' && boardN[2][1]=='o') ||
        (boardN[0][2]=='o' && boardN[1][2]=='o' && boardN[2][2]=='o')
    ){return 'Ai';}
    else{
        let count=0;
        for(let p=0;p<3;p++){
            for(let q=0;q<3;q++){
                if(boardN[p][q]!=""){count++;}
            }
        }
        if(count>=9){
            return 'tie';
        }
    }
}

function mousePressed(){
    if(checkWin(board)=='player'){
        alert("Player Won");
        turn=random(['p','ai']);
        setup();
    }
    else if(checkWin(board)=='Ai'){
        mySound.play();
        alert("Computer Won");
        turn=random(['p','ai']);
        setup();
    }
    else if(checkWin(board)=='tie'){
        alert("Its a Draw");
        turn=random(['p','ai']);
        setup();
    }

    if(((board[int(mouseY/(width/3))][int(mouseX/(height/3))])==null || (board[int(mouseY/(width/3))][int(mouseX/(height/3))])=="") && ((int(mouseY/(width/3)))<3 && int(mouseX/(height/3))<3) ){
        board[int(mouseY/(width/3))][int(mouseX/(height/3))]='x';
        drawBoard(board);
        AiTurn();
    }

    if(checkWin(board)=='player'){
        alert("Player Won");
        turn=random(['p','ai']);
        setup();
    }
    else if(checkWin(board)=='Ai'){
        mySound.play();
        alert("Computer Won");
        turn=random(['p','ai']);
        setup();
    }
    else if(checkWin(board)=='tie'){
        alert("Its a Draw");
        turn=random(['p','ai']);
        setup();
    }
}

function AiTurn(){
    let bestscore=-Infinity;
    let move;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] == ""){
                board[i][j] = 'o';
                let score=minimax(board,false);
                //score=1;
                board[i][j] = '';
                if(score>bestscore){
                    bestscore=score;
                    move={i,j};
                }
            }
        }
    }
    //let ch=random(availSpots);
    if(move==undefined && checkWin(board)=='tie'){
        alert("Its a Draw");
        setup();
    }
    else{
        board[move.i][move.j]='o';  // was getting undefined here since sometimes move is not initalized
    }
    drawBoard(board);
}

let scores={
    player:-1,
    Ai:1,
    tie:0
};

function minimax(board, isMax){
    let result = checkWin(board);
    if (result !== undefined) {
        return scores[result];
    }

    if (isMax) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = 'o';
                    let score = minimax(board, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = 'x';
                    let score = minimax(board, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}