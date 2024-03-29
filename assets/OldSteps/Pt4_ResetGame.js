//Monster Killer app
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;

const MONSTER_ATTACK_VALUE = 18;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
    /*new function to reset game - calls resetGame from vendor file
     */
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const monsterAtk = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterAtk;


    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('Everyone gets one second chance!');
        setPlayerHealth(initialPlayerHealth);
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

        /* several ways to call the rest function,
         we could call the reset funtion after each 'if' case
        however, we can also write a new if case, with all of the
        'if' cases listed. Shown above s a condesned version 
        as we only care if EITHER player OR monster hp are <=0 */

    }
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
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)