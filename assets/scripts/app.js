//Monster Killer app
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_EXTRA_LIFE_USED = 'EXTRA_LIFE_USED';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const MONSTER_ATTACK_VALUE = 18;

let battleLog = [];

let lastLoggedEntry;

let lifeText = 'Life set to 100';
let invalidUI = 'Invalid user input!';

function getMaxLifeValues() {

    const enteredValue = prompt('Max HP for you and the monster.', '100');
    const parsedValue = +enteredValue;
    if (isNaN(parsedValue)) {
        alert(`${lifeText}, noob. "${enteredValue}" is not a number.`);
        throw { message: `${invalidUI} "${enteredValue} is not a number!` };
    } else if (parsedValue <= 0) {
        alert(`${lifeText}.`)
        throw { message: `${invalidUI}` };
    }
    return parsedValue;
}

let chosenMaxLife

try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error)
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {

    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    }

    switch (ev) {

        case LOG_EVENT_PLAYER_ATTACK:
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;

        case LOG_EVENT_MONSTER_ATTACK:
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;

        default: // LOG_EVENT_EXTRA_LIFE_USED, LOG_EVENT_GAME_OVER
            logEntry;
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const monsterAtk = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterAtk;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        monsterAtk,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;

        alert(
            `Everyone gets one second chance! 25% HP restored.`
        );
        setPlayerHealth(enteredValue / 4);
        writeToLog(
            LOG_EVENT_EXTRA_LIFE_USED,
            'EXTRA LIFE USED',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('GAME OVER!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentMonsterHealth && currentPlayerHealth <= 0) {
        alert('It\'s a draw!')
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'TIE',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {

    const maxDamage = mode === MODE_ATTACK ?
        ATTACK_VALUE :
        STRONG_ATTACK_VALUE;

    const logEvent = mode === MODE_ATTACK ?
        LOG_EVENT_PLAYER_ATTACK :
        LOG_EVENT_PLAYER_STRONG_ATTACK;

    const playerAtk = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= playerAtk;
    writeToLog(
        logEvent,
        playerAtk,
        currentMonsterHealth,
        currentPlayerHealth
    );
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
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();
}

function printLogHandler() {

    let i = 0;
    for (const logEntry of battleLog) {
        if (!lastLoggedEntry &&
            lastLoggedEntry !== 0 ||
            lastLoggedEntry < i
        ) {
            console.log(`#${i}`);
            for (const key in logEntry) {
                console.log(`${key}=>${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;

        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);