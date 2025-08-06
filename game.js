// 遊戲變數
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');
const comboElement = document.getElementById('combo');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const finalComboElement = document.getElementById('finalCombo');
const pauseBtn = document.getElementById('pauseBtn');
const powerUpIndicator = document.getElementById('powerUpIndicator');

// 遊戲狀態
let gameState = {
    score: 0,
    lives: 3,
    level: 1,
    combo: 0,
    gameRunning: true,
    paused: false,
    powerUpActive: false,
    powerUpType: '',
    powerUpTimer: 0
};

// 玩家飛船
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 30,
    speed: 5,
    color: '#00ff00',
    powerUpLevel: 1
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
let enemySpeed = 0.5;
let enemyDirection = 1;

// 道具陣列
let powerUps = [];
const powerUpTypes = ['rapid', 'spread', 'laser', 'shield'];

// 粒子效果陣列
let particles = [];

// Boss 相關
let boss = null;
let bossHealth = 0;
let bossMaxHealth = 0;

// 鍵盤控制
const keys = {};

// 音效系統
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 生成音效
function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// 顯示成就
function showAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.textContent = message;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.remove();
    }, 3000);
}

// 顯示等級提升
function showLevelUp() {
    const levelUp = document.createElement('div');
    levelUp.className = 'level-up';
    levelUp.innerHTML = `
        <h2>🎉 等級提升！</h2>
        <p>進入第 ${gameState.level} 關</p>
        <p>敵人速度增加！</p>
    `;
    document.body.appendChild(levelUp);
    
    setTimeout(() => {
        levelUp.remove();
    }, 2000);
}

// 創建粒子效果
function createParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1,
            color: color,
            size: Math.random() * 3 + 1
        });
    }
}

// 更新粒子
function updateParticles() {
    particles = particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        return particle.life > 0;
    });
}

// 繪製粒子
function drawParticles() {
    particles.forEach(particle => {
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
    ctx.globalAlpha = 1;
}

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
                alive: true,
                health: row === 0 ? 2 : 1
            });
        }
    }
}

// 創建 Boss
function createBoss() {
    boss = {
        x: canvas.width / 2 - 50,
        y: 50,
        width: 100,
        height: 60,
        health: 20,
        maxHealth: 20,
        color: '#ff0066',
        phase: 0
    };
    bossHealth = boss.health;
    bossMaxHealth = boss.maxHealth;
}

// 繪製 Boss
function drawBoss() {
    if (!boss) return;
    
    // Boss 主體
    ctx.fillStyle = boss.color;
    ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
    
    // Boss 細節
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boss.x + 20, boss.y + 10, 15, 15);
    ctx.fillRect(boss.x + 65, boss.y + 10, 15, 15);
    ctx.fillRect(boss.x + 35, boss.y + 35, 30, 10);
    
    // 血條
    const barWidth = 100;
    const barHeight = 8;
    const barX = canvas.width / 2 - barWidth / 2;
    const barY = 10;
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(barX, barY, (boss.health / boss.maxHealth) * barWidth, barHeight);
}

// 繪製玩家飛船
function drawPlayer() {
    // 護盾效果
    if (gameState.powerUpActive && gameState.powerUpType === 'shield') {
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 
                player.width / 2 + 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // 飛船主體
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 飛船細節
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x + 15, player.y - 5, 10, 5);
    ctx.fillRect(player.x + 5, player.y + 10, 30, 5);
    
    // 引擎效果
    if (keys['ArrowLeft'] || keys['ArrowRight']) {
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(player.x + 10, player.y + player.height, 5, 8);
        ctx.fillRect(player.x + 25, player.y + player.height, 5, 8);
    }
}

// 繪製子彈
function drawBullets() {
    bullets.forEach(bullet => {
        if (bullet.type === 'laser') {
            // 雷射子彈
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bullet.x + bulletSize / 2, bullet.y);
            ctx.lineTo(bullet.x + bulletSize / 2, bullet.y + 20);
            ctx.stroke();
        } else if (bullet.type === 'spread') {
            // 散彈
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize * 2);
        } else {
            // 普通子彈
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize * 2);
        }
    });
}

// 繪製敵人
function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.alive) {
            // 敵人主體
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // 敵人細節
            ctx.fillStyle = '#000000';
            ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
            ctx.fillRect(enemy.x + 20, enemy.y + 5, 5, 5);
            ctx.fillRect(enemy.x + 10, enemy.y + 15, 10, 3);
            
            // 血條（如果有多條血）
            if (enemy.health > 1) {
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(enemy.x, enemy.y - 5, (enemy.health / 2) * enemy.width, 3);
            }
        }
    });
}

// 繪製道具
function drawPowerUps() {
    powerUps.forEach(powerUp => {
        ctx.fillStyle = powerUp.color;
        ctx.fillRect(powerUp.x, powerUp.y, 20, 20);
        
        // 道具圖標
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(powerUp.icon, powerUp.x + 2, powerUp.y + 15);
    });
}

// 更新子彈位置
function updateBullets() {
    bullets = bullets.filter(bullet => {
        bullet.y -= bullet.speed || bulletSpeed;
        return bullet.y > 0;
    });
}

// 更新敵人位置
function updateEnemies() {
    if (boss) {
        // Boss 移動模式
        boss.x += Math.sin(Date.now() * 0.001) * 2;
        return;
    }
    
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

// 更新道具
function updatePowerUps() {
    powerUps = powerUps.filter(powerUp => {
        powerUp.y += 1;
        return powerUp.y < canvas.height;
    });
}

// 更新道具效果
function updatePowerUpEffects() {
    if (gameState.powerUpActive) {
        gameState.powerUpTimer--;
        if (gameState.powerUpTimer <= 0) {
            gameState.powerUpActive = false;
            gameState.powerUpType = '';
            powerUpIndicator.textContent = '';
        }
    }
}

// 碰撞檢測
function checkCollisions() {
    // 子彈與敵人碰撞
    bullets.forEach((bullet, bulletIndex) => {
        if (boss) {
            // Boss 碰撞檢測
            if (bullet.x < boss.x + boss.width &&
                bullet.x + bulletSize > boss.x &&
                bullet.y < boss.y + boss.height &&
                bullet.y + bulletSize * 2 > boss.y) {
                
                boss.health--;
                bullets.splice(bulletIndex, 1);
                gameState.score += 20;
                gameState.combo++;
                scoreElement.textContent = gameState.score;
                comboElement.textContent = gameState.combo;
                
                createParticles(bullet.x, bullet.y, '#ff00ff', 15);
                playSound(200, 0.1);
                
                if (boss.health <= 0) {
                    boss = null;
                    gameState.score += 500;
                    showAchievement('🎉 Boss 擊敗！+500分');
                }
            }
        } else {
            // 普通敵人碰撞檢測
            enemies.forEach(enemy => {
                if (enemy.alive && 
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bulletSize > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bulletSize * 2 > enemy.y) {
                    
                    enemy.health--;
                    if (enemy.health <= 0) {
                        enemy.alive = false;
                        gameState.score += 10;
                        gameState.combo++;
                        
                        // 隨機掉落道具
                        if (Math.random() < 0.1) {
                            const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
                            powerUps.push({
                                x: enemy.x,
                                y: enemy.y,
                                type: powerUpType,
                                color: powerUpType === 'rapid' ? '#ff0000' : 
                                       powerUpType === 'spread' ? '#ffaa00' : 
                                       powerUpType === 'laser' ? '#ff00ff' : '#00ffff',
                                icon: powerUpType === 'rapid' ? '⚡' : 
                                      powerUpType === 'spread' ? '🔫' : 
                                      powerUpType === 'laser' ? '💥' : '🛡️'
                            });
                        }
                        
                        createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 8);
                        playSound(300, 0.1);
                    }
                    
                    bullets.splice(bulletIndex, 1);
                    scoreElement.textContent = gameState.score;
                    comboElement.textContent = gameState.combo;
                }
            });
        }
    });
    
    // 玩家與道具碰撞
    powerUps.forEach((powerUp, index) => {
        if (player.x < powerUp.x + 20 &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + 20 &&
            player.y + player.height > powerUp.y) {
            
            activatePowerUp(powerUp.type);
            powerUps.splice(index, 1);
            playSound(400, 0.2);
        }
    });
    
    // 敵人與玩家碰撞
    if (!gameState.powerUpActive || gameState.powerUpType !== 'shield') {
        if (boss) {
            if (player.x < boss.x + boss.width &&
                player.x + player.width > boss.x &&
                player.y < boss.y + boss.height &&
                player.y + player.height > boss.y) {
                
                gameState.lives--;
                livesElement.textContent = gameState.lives;
                resetPlayerPosition();
                
                if (gameState.lives <= 0) {
                    gameOver();
                }
            }
        } else {
            enemies.forEach(enemy => {
                if (enemy.alive &&
                    player.x < enemy.x + enemy.width &&
                    player.x + player.width > enemy.x &&
                    player.y < enemy.y + enemy.height &&
                    player.y + player.height > enemy.y) {
                    
                    gameState.lives--;
                    livesElement.textContent = gameState.lives;
                    resetPlayerPosition();
                    gameState.combo = 0;
                    comboElement.textContent = gameState.combo;
                    
                    if (gameState.lives <= 0) {
                        gameOver();
                    }
                }
            });
        }
    }
    
    // 檢查敵人是否到達底部
    if (!boss) {
        enemies.forEach(enemy => {
            if (enemy.alive && enemy.y + enemy.height >= player.y) {
                gameOver();
            }
        });
    }
}

// 激活道具效果
function activatePowerUp(type) {
    gameState.powerUpActive = true;
    gameState.powerUpType = type;
    gameState.powerUpTimer = 300; // 5秒
    
    switch (type) {
        case 'rapid':
            powerUpIndicator.textContent = '⚡ 快速射擊';
            break;
        case 'spread':
            powerUpIndicator.textContent = '🔫 散彈射擊';
            break;
        case 'laser':
            powerUpIndicator.textContent = '💥 雷射武器';
            break;
        case 'shield':
            powerUpIndicator.textContent = '🛡️ 護盾保護';
            break;
    }
    
    showAchievement(`🎁 獲得道具: ${powerUpIndicator.textContent}`);
}

// 重置玩家位置
function resetPlayerPosition() {
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
}

// 檢查是否過關
function checkLevelComplete() {
    if (boss) return;
    
    const aliveEnemies = enemies.filter(enemy => enemy.alive);
    if (aliveEnemies.length === 0) {
        gameState.level++;
        levelElement.textContent = gameState.level;
        
        // 每5關出現Boss
        if (gameState.level % 5 === 0) {
            createBoss();
            showAchievement('👹 Boss 出現！');
        } else {
            initEnemies();
            enemySpeed += 0.2;
        }
        
        showLevelUp();
    }
}

// 遊戲結束
function gameOver() {
    gameState.gameRunning = false;
    finalScoreElement.textContent = gameState.score;
    finalLevelElement.textContent = gameState.level;
    finalComboElement.textContent = gameState.combo;
    gameOverElement.style.display = 'block';
}

// 重新開始遊戲
function restartGame() {
    gameState = {
        score: 0,
        lives: 3,
        level: 1,
        combo: 0,
        gameRunning: true,
        paused: false,
        powerUpActive: false,
        powerUpType: '',
        powerUpTimer: 0
    };
    
    scoreElement.textContent = gameState.score;
    livesElement.textContent = gameState.lives;
    levelElement.textContent = gameState.level;
    comboElement.textContent = gameState.combo;
    
    bullets = [];
    powerUps = [];
    particles = [];
    boss = null;
    enemySpeed = 0.5;
    initEnemies();
    resetPlayerPosition();
    powerUpIndicator.textContent = '';
    
    gameOverElement.style.display = 'none';
}

// 暫停/繼續遊戲
function togglePause() {
    gameState.paused = !gameState.paused;
    pauseBtn.textContent = gameState.paused ? '▶️ 繼續' : '⏸️ 暫停';
}

// 主遊戲循環
function gameLoop() {
    if (!gameState.gameRunning || gameState.paused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
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
    updatePowerUps();
    updatePowerUpEffects();
    updateParticles();
    checkCollisions();
    checkLevelComplete();
    
    // 繪製遊戲物件
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawPowerUps();
    drawParticles();
    if (boss) drawBoss();
    
    requestAnimationFrame(gameLoop);
}

// 鍵盤事件監聽
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    
    // 發射子彈
    if (e.code === 'Space' && gameState.gameRunning && !gameState.paused) {
        if (gameState.powerUpActive && gameState.powerUpType === 'spread') {
            // 散彈模式
            for (let i = -1; i <= 1; i++) {
                bullets.push({
                    x: player.x + player.width / 2 - bulletSize / 2 + i * 10,
                    y: player.y,
                    type: 'spread'
                });
            }
        } else if (gameState.powerUpActive && gameState.powerUpType === 'laser') {
            // 雷射模式
            bullets.push({
                x: player.x + player.width / 2 - bulletSize / 2,
                y: player.y,
                type: 'laser',
                speed: 10
            });
        } else {
            // 普通射擊
            bullets.push({
                x: player.x + player.width / 2 - bulletSize / 2,
                y: player.y
            });
        }
        
        playSound(600, 0.05);
    }
    
    // 暫停遊戲
    if (e.code === 'KeyP') {
        togglePause();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// 暫停按鈕事件
pauseBtn.addEventListener('click', togglePause);

// 初始化遊戲
initEnemies();
gameLoop();

// 收藏遊戲分數功能
function saveGameScore() {
    try {
        if (!gameState.gameRunning && gameState.score > 0) {
            const scoreData = {
                score: gameState.score,
                level: gameState.level,
                combo: gameState.combo,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            const savedScores = JSON.parse(localStorage.getItem('gameScores') || '[]');
            savedScores.push(scoreData);
            
            // 只保留最近的10個分數
            if (savedScores.length > 10) {
                savedScores.splice(0, savedScores.length - 10);
            }
            
            localStorage.setItem('gameScores', JSON.stringify(savedScores));
            alert('分數已收藏！');
        } else {
            alert('請先完成遊戲再收藏分數！');
        }
    } catch (error) {
        console.error('收藏失敗:', error);
        alert('收藏失敗，請重試！');
    }
}

// 分享遊戲成績功能
function shareGameScore() {
    try {
        if (!gameState.gameRunning && gameState.score > 0) {
            const shareText = `我在打小蜜蜂遊戲中獲得了 ${gameState.score} 分！\n等級：${gameState.level} | 最高連擊：${gameState.combo}`;
            const shareUrl = window.location.href;
            const textToCopy = `${shareText}\n\n遊戲連結：${shareUrl}`;
            
            if (navigator.share && navigator.share instanceof Function) {
                navigator.share({
                    title: '打小蜜蜂遊戲成績',
                    text: shareText,
                    url: shareUrl
                }).catch(err => {
                    console.log('原生分享失敗:', err);
                    copyToClipboard(textToCopy);
                });
            } else {
                copyToClipboard(textToCopy);
            }
        } else {
            alert('請先完成遊戲再分享成績！');
        }
    } catch (error) {
        console.error('分享失敗:', error);
        alert('分享失敗，請重試！');
    }
}

// 下載遊戲成績功能
function downloadGameScore() {
    try {
        if (!gameState.gameRunning && gameState.score > 0) {
            const scoreData = {
                game: '打小蜜蜂遊戲',
                score: gameState.score,
                level: gameState.level,
                combo: gameState.combo,
                date: new Date().toLocaleString(),
                timestamp: Date.now()
            };
            
            const content = generateScoreContent(scoreData);
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `打小蜜蜂遊戲成績_${scoreData.score}分.txt`;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            alert('成績已下載！');
        } else {
            alert('請先完成遊戲再下載成績！');
        }
    } catch (error) {
        console.error('下載失敗:', error);
        alert('下載失敗，請重試！');
    }
}

// 生成成績內容
function generateScoreContent(scoreData) {
    let content = `🎮 打小蜜蜂遊戲成績單\n`;
    content += `================================\n\n`;
    content += `🏆 最終分數：${scoreData.score} 分\n`;
    content += `🏅 最高等級：${scoreData.level} 關\n`;
    content += `🔥 最高連擊：${scoreData.combo} 次\n`;
    content += `📅 遊戲時間：${scoreData.date}\n\n`;
    content += `🎯 遊戲說明：\n`;
    content += `- 使用方向鍵移動飛船\n`;
    content += `- 空白鍵發射子彈\n`;
    content += `- 收集道具提升火力\n`;
    content += `- 擊敗所有敵人過關\n`;
    content += `- 每5關會出現Boss\n\n`;
    content += `🌟 恭喜您完成遊戲！\n`;
    content += `期待您下次挑戰更高分數！\n`;
    
    return content;
}

// 複製到剪貼板
function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert('成績已複製到剪貼板！\n\n您可以貼到任何社群媒體或聊天軟體中分享。');
            }).catch(() => {
                copyToClipboardFallback(text);
            });
        } else {
            copyToClipboardFallback(text);
        }
    } catch (error) {
        console.error('複製失敗:', error);
        copyToClipboardFallback(text);
    }
}

// 剪貼板備用方法
function copyToClipboardFallback(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            alert('成績已複製到剪貼板！\n\n您可以貼到任何社群媒體或聊天軟體中分享。');
        } else {
            alert('無法自動複製，請手動複製以下內容：\n\n' + text);
        }
    } catch (error) {
        console.error('複製失敗:', error);
        alert('無法自動複製，請手動複製以下內容：\n\n' + text);
    }
}

// 將函數綁定到全局作用域
window.saveGameScore = saveGameScore;
window.shareGameScore = shareGameScore;
window.downloadGameScore = downloadGameScore; 