const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth=100
const blockHeight=20
const boardWidth =560
const boardHeight = 300
const ballDiameter=20
let timerId
let score =0
let xDirection=-2
let yDirection=2
const userStart=[230,10]
let currentPosition =userStart

const ballStart= [270,40]
let ballCurrentPosition=ballStart
//my bloc
class Block{
    constructor(x,y){
        this.bottomLeft=[x,y]
        this.bottomRight=[x+blockWidth,y]
        this.topRight=[x+blockWidth,y+blockHeight]
        this.topLeft=[x,y+blockHeight]
    }
}

//all blacks
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]
//draw blocks
console.log(blocks);

function addBlocks(){
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement("div")
        block.classList.add('block')
        grid.appendChild(block)
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
    }

}
addBlocks()

//add user 

const user =document.createElement('div')
user.classList.add('user')

grid.appendChild(user)
DrawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')

grid.appendChild(ball)
DrawBall()
function DrawUser(){
    user.style.left=currentPosition[0]+'px'
    user.style.bottom=currentPosition[1]+'px'
}

function DrawBall(){
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}


//move the user
function MoveUser(e){
    console.log(e.key);
    
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0]>0){

                currentPosition[0] -=10
                DrawUser()
            }
            // console.log(currentPosition[0]);
            break;
        case 'ArrowRight':
            if (currentPosition[0]<boardWidth-blockWidth){
                currentPosition[0] +=10
                DrawUser()
            }
            break;
    }
}
document.addEventListener('keydown',MoveUser)

//move ball

function MoveBall(){
    ballCurrentPosition[0]+=xDirection
    ballCurrentPosition[1]+=yDirection
    DrawBall()
    checkForCollision()
}
timerId =setInterval(MoveBall,30)

function checkForCollision(){
    //check block collision 
    for(let i=0;i<blocks.length;i++){
        if(ballCurrentPosition[0]>blocks[i].bottomLeft[0]&&
            ballCurrentPosition[0]<blocks[i].bottomRight[0]&&
            (ballCurrentPosition[1]+ballDiameter)>blocks[i].bottomLeft[1]&&
            ballCurrentPosition[1]<blocks[i].topLeft[1]
        ){
            const allBlocks=document.querySelectorAll('.block')
            allBlocks[i].classList.remove("block")
            blocks.splice(i,1)
            ChangeDirection()
            score++
            scoreDisplay.innerHTML=score
            if(blocks.length==0){
                scoreDisplay.innerHTML="You Win!"
                clearInterval(timerId)
                document.removeEventListener("keydown",MoveUser)
            }
        }
    }
    //chekc wall 
    if(ballCurrentPosition[0]>=(boardWidth-ballDiameter)||
    ballCurrentPosition[0]<=0 || ballCurrentPosition[1]>=(boardHeight-ballDiameter)){
        ChangeDirection()
    }
    //check user collision
    if(ballCurrentPosition[0]>currentPosition[0]&&
        ballCurrentPosition[0]<currentPosition[0]+blockWidth&&
        (ballCurrentPosition[1]>currentPosition[1]&&
        ballCurrentPosition[1]<currentPosition[1]+blockHeight)
    ){
        ChangeDirection()
    }
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML="Game Over!"
        document.removeEventListener("keydown",MoveUser)
    }
}
function ChangeDirection(){
    if(xDirection==2&yDirection===2){
        yDirection=-2
        return
    }
    if(xDirection==2&yDirection===-2){
        xDirection=-2
        return
    }
    if(xDirection==-2&yDirection===-2){
        yDirection=2
        return
    }
    if(xDirection==-2&yDirection===2){
        xDirection=2
        return
    }
}