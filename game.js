const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const player = {
    x: 50,
    y: 50,
    speed: 5,
    size: 20,
};

const items = [
    { x: 100, y: 100, size: 10, color: 'green' },
    { x: 200, y: 200, size: 10, color: 'green' },
    { x: 300, y: 300, size: 10, color: 'green' },
];

const obstacles = [
    { x: 150, y: 150, size: 30, color: 'red' },
    { x: 250, y: 250, size: 30, color: 'red' },
];

let score = 0;

function drawPlayer() {
    context.fillStyle = 'blue';
    context.fillRect(player.x, player.y, player.size, player.size);
}

function drawItems() {
    items.forEach(item => {
        context.fillStyle = item.color;
        context.fillRect(item.x, item.y, item.size, item.size);
    });
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        context.fillStyle = obstacle.color;
        context.fillRect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
    });
}

function checkCollision(object1, object2) {
    return (
        object1.x < object2.x + object2.size &&
        object1.x + object1.size > object2.x &&
        object1.y < object2.y + object2.size &&
        object1.y + object1.size > object2.y
    );
}

function update() {
    if (score >= 3) {
        // Game over
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.font = '30px Arial';
        context.fillText('Game Over', 100, 200);
        return;
    }

    // Update player position based on user input
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y + player.size < canvas.height) {
        player.y += player.speed;
    }
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x + player.size < canvas.width) {
        player.x += player.speed;
    }

    // Check for collisions with items
    for (let i = items.length - 1; i >= 0; i--) {
        if (checkCollision(player, items[i])) {
            items.splice(i, 1);
            score++;
        }
    }

    // Check for collisions with obstacles
    for (const obstacle of obstacles) {
        if (checkCollision(player, obstacle)) {
            score = 0;
            player.x = 50;
            player.y = 50;
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawItems();
    drawObstacles();
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 20);
}

const keys = {};

window.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

setInterval(update, 1000 / 60);