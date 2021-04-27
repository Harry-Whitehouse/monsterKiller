//Monster Killer app
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;
const enteredValue = prompt('Max HP for you and the monster.', '100');

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_EXTRA_LIFE_USED = 'EXTRA_LIFE_USED';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
//new constants for easy of use and readability 

const MONSTER_ATTACK_VALUE = 18;

let chosenMaxLife = +(enteredValue);

let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
    alert('Life set to 100, noob.');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {

    let logEntry;

    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };

    } else if (ev == LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };

    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };

    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };

    } else if (ev === LOG_EVENT_EXTRA_LIFE_USED) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }
    battleLog.push(logEntry);

}

//huge write to log function, will be refined in the next step.



function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const monsterAtk = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterAtk;


    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;

        alert(
            `Everyone gets one second chance! 25% HP restored.`
        );
        currentPlayerHealth = (chosenMaxLife / 4);
        setPlayerHealth(currentPlayerHealth);

    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('GAME OVER!');
    } else if (currentMonsterHealth && currentPlayerHealth <= 0) {
        alert('It\'s a draw!')
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const playerAtk = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= playerAtk;
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You Can\'t heal beyond max health.")
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', writeToLog);
/* calling write to log here was actually a mistake,
i had to write a new function called 'printLogHandler' */