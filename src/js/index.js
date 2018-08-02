// 点击开始游戏   startpage消失    游戏开始
//  随机出现食物，出现三节蛇开始运动
//  上下左右   改变运动方向

var leftSide = document.getElementsByClassName('left-side')[0]
var startBtn = document.getElementsByClassName('startBtn')[0];
var close = document.getElementsByClassName('close')[0];
var scoreBox = document.getElementsByClassName('score')[0];
var Content = document.getElementsByClassName('content')[0];
var con = document.getElementsByClassName('con')[0];
var loserScore = document.getElementsByClassName('loserScore')[0];

leftSideB = true;
var snakeMove;
var speed = 200;

startBtn.onclick = function () {
    init();
    this.score = 0;
    scoreBox.innerHTML = this.score;
}
close.onclick = function () {
    startBtn.style.display = 'block';
    con.style.display = 'none';
}

leftSide.onclick = function () {
    if (leftSideB == true) {
        leftSide.style.backgroundImage = 'URL(/Users/duxiaoqiang/Desktop/贪吃蛇/src/img/timg.png)';
        leftSideB = false;
        clearInterval(timer);
    } else {
        leftSide.style.backgroundImage = 'URL(/Users/duxiaoqiang/Desktop/贪吃蛇/src/img/timg的副本.png)';
        leftSideB = true;
        snakeMove();
    }
}


function init() {
    leftSide.style.display = 'block';
    startBtn.style.display = 'none';
    // this --> window
    // 地图

    this.mapW = parseInt(getComputedStyle(Content).width);
    this.mapH = parseInt(getComputedStyle(Content).height);
    this.mapDIv = Content;
    // 食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    // 蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];

    // 运动方向
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    // 分数
    this.score = 0;

    food();
    snake();
    snakeMove();
    bindEvent();
}

function snakeMove() {
    if (leftSideB) {
        timer = setInterval(function () {
            move();
        }, speed)
    };
};



function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    // this.mapDIv.appendChild(food)  --> 食物
    this.mapDIv.appendChild(food).setAttribute('class', 'food');
}



function snake() {
    var len = this.snakeBody.length;
    var i = 0;
    for (i; i < len; i++) {
        var snake = document.createElement('div');
        snake.style.position = 'absolute';
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDIv.appendChild(snake).classList.add('snake');

        // 蛇头朝向变换
        switch (this.direct) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }

    }
}

function move() {
    for (var i = snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0]++;
            break;
        case 'left':
            this.snakeBody[0][0]--;
            break;
        case 'up':
            this.snakeBody[0][1]--;
            break;
        case 'down':
            this.snakeBody[0][1]++;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();

    // 吃食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];

        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;

            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;

            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;

            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW / 20) {
        overGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH / 20) {
        overGame();
    }

    var snakeLX = this.snakeBody[0][0];
    var snakeLY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeLX == this.snakeBody[i][0] && snakeLY == this.snakeBody[i][1]) {
            overGame();
        }
    }
}

function overGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(timer);

    leftSide.style.display = 'none';
    con.style.display = 'block';
    loserScore.innerHTML = this.score;
}


function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDirect(code);
    }
}