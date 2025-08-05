// 遊戲變數
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// 遊戲狀態
let gameState = {
    score: 0,
    lives: 3,
    level: 1,
    gameRunning: true
};

// 玩家飛船
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 30,
    speed: 5,
    color: '#00ff00'
};

// 子彈陣列
let bullets = [];
const bulletSpeed = 7;
const bulletSize = 3;

// 敵人陣列
let enemies = [];
const enemyRows = 5;
const enemyCols = 10;
const enemyWidth = 30;
const enemyHeight = 25;
const enemySpeed = 0.5;
let enemyDirection = 1;

// 鍵盤控制
const keys = {};

// 初始化敵人
function initEnemies() {
    enemies = [];
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * (enemyWidth + 10) + 50,
                y: row * (enemyHeight + 10) + 50,
                width: enemyWidth,
                height: enemyHeight,
                color: row === 0 ? '#ff0000' : row === 1 ? '#ff6600' : '#ffff00',
                alive: true
            });
        }
    }
}

// 繪製玩家飛船
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 繪製飛船細節
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x + 15, player.y - 5, 10, 5);
    ctx.fillRect(player.x + 5, player.y + 10, 30, 5);
}

// 繪製子彈
function drawBullets() {
    ctx.fillStyle = '#ffff00';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize * 2);
    });
}

// 繪製敵人
function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.alive) {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // 繪製小蜜蜂的細節
            ctx.fillStyle = '#000000';
            ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
            ctx.fillRect(enemy.x + 20, enemy.y + 5, 5, 5);
            ctx.fillRect(enemy.x + 10, enemy.y + 15, 10, 3);
        }
    });
}

// 更新子彈位置
function updateBullets() {
    bullets = bullets.filter(bullet => {
        bullet.y -= bulletSpeed;
        return bullet.y > 0;
    });
}

// 更新敵人位置
function updateEnemies() {
    let shouldMoveDown = false;
    
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += enemySpeed * enemyDirection;
            
            if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
                shouldMoveDown = true;
            }
        }
    });
    
    if (shouldMoveDown) {
        enemyDirection *= -1;
        enemies.forEach(enemy => {
            if (enemy.alive) {
                enemy.y += 20;
            }
        });
    }
}

// 碰撞檢測
function checkCollisions() {
    // 子彈與敵人碰撞
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach(enemy => {
            if (enemy.alive && 
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bulletSize > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bulletSize * 2 > enemy.y) {
                
                enemy.alive = false;
                bullets.splice(bulletIndex, 1);
                gameState.score += 10;
                scoreElement.textContent = gameState.score;
            }
        });
    });
    
    // 敵人與玩家碰撞
    enemies.forEach(enemy => {
        if (enemy.alive &&
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            
            gameState.lives--;
            livesElement.textContent = gameState.lives;
            resetPlayerPosition();
            
            if (gameState.lives <= 0) {
                gameOver();
            }
        }
    });
    
    // 檢查敵人是否到達底部
    enemies.forEach(enemy => {
        if (enemy.alive && enemy.y + enemy.height >= player.y) {
            gameOver();
        }
    });
}

// 重置玩家位置
function resetPlayerPosition() {
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
}

// 檢查是否過關
function checkLevelComplete() {
    const aliveEnemies = enemies.filter(enemy => enemy.alive);
    if (aliveEnemies.length === 0) {
        gameState.level++;
        levelElement.textContent = gameState.level;
        initEnemies();
        // 增加難度
        enemySpeed += 0.2;
    }
}

// 遊戲結束
function gameOver() {
    gameState.gameRunning = false;
    finalScoreElement.textContent = gameState.score;
    gameOverElement.style.display = 'block';
}

// 重新開始遊戲
function restartGame() {
    gameState = {
        score: 0,
        lives: 3,
        level: 1,
        gameRunning: true
    };
    
    scoreElement.textContent = gameState.score;
    livesElement.textContent = gameState.lives;
    levelElement.textContent = gameState.level;
    
    bullets = [];
    initEnemies();
    resetPlayerPosition();
    
    gameOverElement.style.display = 'none';
}

// 主遊戲循環
function gameLoop() {
    if (!gameState.gameRunning) return;
    
    // 清除畫布
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 處理玩家移動
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    
    // 更新遊戲物件
    updateBullets();
    updateEnemies();
    checkCollisions();
    checkLevelComplete();
    
    // 繪製遊戲物件
    drawPlayer();
    drawBullets();
    drawEnemies();
    
    requestAnimationFrame(gameLoop);
}

// 鍵盤事件監聽
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    
    // 發射子彈
    if (e.code === 'Space' && gameState.gameRunning) {
        bullets.push({
            x: player.x + player.width / 2 - bulletSize / 2,
            y: player.y
        });
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// 初始化遊戲
initEnemies();
gameLoop(); 