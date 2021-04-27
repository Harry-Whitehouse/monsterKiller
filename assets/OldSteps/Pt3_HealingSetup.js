//Monster Killer app

//Adding healing function and tidying / restructuring code.

/*added attack monster function where we can pass
 a 'mode' of attack later this saves us reusing code.
 
 also added the end round function to check if anyone won,
 this is also called later to keep the code neater */

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;

const MONSTER_ATTACK_VALUE = 25;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

/* end round funtion checks state of the game after each hit.
    allows for end of game messages to be initialised in other
    functions by calling this function, instead of retpying 
    lots of the same code over and over.*/

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const monsterAtk = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterAtk;

    //initialising the ability to use the bonus life

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('Everyone gets one second chance!');
        setPlayerHealth(initialPlayerHealth);
    }
    //added if statements to allow the code to be neater going forward.

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('GAME OVER!');
    } else if (currentMonsterHealths && currentPlayerHealth <= 0)
        alert('It\'s a draw!')
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const playerAtk = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= playerAtk;
    endRound(); //calling end round function
}

function attackHandler() {
    attackMonster('ATTACK');
    /*calling the attackMonster function where 
    we passed a 'mode' of attack which calls on the constants 
    stated at the beggining of the file.*/
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
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

/*buttons from vendor file, attached to event listners,
  to make website buttons work*/

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)