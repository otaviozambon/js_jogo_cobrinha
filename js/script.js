// elemento roda jogo
let canvas = document.getElementById("gamesnake");
let context = canvas.getContext("2d");
let box = 32;

// kobrinha
let snake = [];

// início kobrinha
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

// direção
let direction = "right"

// comida
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// fundo
function criarBG() {
    context.fillStyle = "lightgreen"
// desenha retângulo usnado x e y
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// cria kobrinha
function criaCobrinha (){
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

// desenha comida
function drawFood() {
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

// detecta e chama a função update, quando acontece evento
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// função principal
function iniciarJogo() {
    if (snake[0].x > 15*box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15*box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(Jogo);
            alert('Game Over!')
        }
    }

    
    criarBG();
    criaCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box; 
    if (direction == "left") snakeX -= box; 
    if (direction == "up") snakeY -= box; 
    if (direction == "down") snakeY += box;
    
    if (snakeX != food.x || snakeY != food.y) {
        // pop tira o último elemento da lista
        snake.pop(); 
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }
// método unshift adiciona como primeiro quadrinho da cobrinha
    snake.unshift(newHead)
}

let Jogo = setInterval(iniciarJogo, 120)

//Pontuação
if (pontos != snake.lenght-1) {
    pontos++;
    document.getElementById('pontuação').innerText = pontos;
}

if (pontos == pontosProximaFase) {
    fase++
    pontosProximaFase = pontosProximaFase + pontosPorFase;
    time = time - (pontosPorFase * 10);
    clearInterval(Jogo);
    Jogo = setInterval(iniciarJogo, time);
}

//Variaveis Pontuação
// let time = 200;
// let Jogo = setInterval(iniciarJogo, time);

let pontos = 0;
let pontosPorFase = 2
let pontosProximaFase = pontosPorFase;
let fase = 1;