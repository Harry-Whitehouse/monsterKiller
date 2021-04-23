/*After initial set up, I included the ability
 for the monster to attack and for the page 
 to throw an alert depending on the outcome.*/

//Monster Killer app
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const playerAtk = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= playerAtk;
    const monsterAtk = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterAtk;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('GAME OVER!');
    } else if (currentMonsterHealth && currentPlayerHealth <= 0)
        alert('It\'s a draw!')
}

attackBtn.addEventListener('click', attackHandler);