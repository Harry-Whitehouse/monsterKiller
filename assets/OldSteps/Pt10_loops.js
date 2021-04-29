//Monster Killer app
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;
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
    // console.clear(battleLog);
    // console.table(battleLog);
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

// brought back the log button practice use loops.


function printLogHandler() {
    //forloop

    // for (let i = 0; i < 3; i++) { //'for (let;;)' would create an infinite loop
    //     console.log('Hello World');
    // }

    // // while loop
    // let j = 0 //used j bc i already init in this funct
    // while (j < 3) {
    //     console.log('hello world')
    //     j++
    // }

    /*do while loop allows you to run the body before
      the while loop*/
    let j = 3
    do {
        console.log(j)
        j++;
    }
    while (j < 3);

    /*below is a counter loop, - using the for loop function.
     having the i-- inside the bracket starts the count at 10
     and count to 1, afterwards would start it 
     at 9 and count to 0*/

    // for (let i = 10; i > 0;) {
    //     i--;
    //     console.log(i);
    //     // i--;
    // }

    // for (let i = 0; i < battleLog.length; i++) {

    //     console.log(battleLog[i]);
    //      //calls the 'ith' elemenet in the battleLog array
    // }


    /*for-of loop - designed specifically for arrays,
    slightly shorter code that the previous*/

    // for (const logEntry of battleLog) {
    //     console.log(logEntry);
    // }
    /* this doesnt give you access to the index,
        but you can manually add it by initialising an variable
        before the loop, then incrementing it and calling it
        in the console.*/
    // let i = 0;
    // for (const logEntry of battleLog) {
    //     console.log(logEntry);
    //     console.log(i);
    //     i++;
    // }


    // for in loop

    let i = 0;
    for (const logEntry of battleLog) {
        console.log(`#${i}`);
        for (const key in logEntry) {
            console.log(`${key}=>${logEntry[key]}`);
            // console.log(logEntry[key]);

            /*you cant use dot notation, because
             js will try and find a property called 'key',
             so we use sq brackets*/
        }
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);