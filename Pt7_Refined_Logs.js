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
    /* writeToLog function created to allow us to call it where needed,
    i.e in end of roud, we also added extra parameters where required
    with dot notation 

    This can be views in the dev tools on the website*/
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    }

    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';

    } else if (ev == LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'MONSTER';

    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry.target = 'PLAYER';

    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry.target = 'PLAYER'

    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry

    } else if (ev === LOG_EVENT_EXTRA_LIFE_USED) {
        logEntry
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
        currentPlayerHealth = (chosenMaxLife / 4);
        setPlayerHealth(currentPlayerHealth);
        writeToLog(
            LOG_EVENT_EXTRA_LIFE_USED,
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

    /* we can often use ternary operators instead of if statements
    the above code will do the same job as the if statement below,

    ternary operators use a '?' to initialise and then parse the
    statements after, seprated by ':' in the same way the else
    part of a if satement would be read. 
    
    however, though the ternary operator saves code, its not necassarily
    as easy to read for a human.*/

    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;

    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
}

const playerAtk = dealMonsterDamage(maxDamage);
currentMonsterHealth -= playerAtk;
writeToLog(
    logEvent,
    playerAtk,
    currentMonsterHealth,
    currentPlayerHealth
);
endRound();

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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();
}

function printLogHandler() {
    console.log(battleLog);

    /*battleLog initialised as an array at the beginning
     of the document. we then called and pushed it into the logEntry
     variable, we created inside the writeToLog function.
     
     we added params for the logEntry variable and called it 
     when player attacked, moster attcked, player healed,
     player used an extra life and when it was game over.

     the log gave told us what was happening step by step - 
     damge caused, target of the attack and remaining hp etc.
     */
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);