//Monster Killer app

// SETTING UP ATTCK BUTTON FOR THE FIRST TIME


const ATTACK_VALUE = 10;
/*maximum atk, vendor will randomise
                        caps and snake case bc global and hard coded,
                        though this is not necessary*/

let chosenMaxLife = 100;
/*hard coded life points
                         for player and monster*/

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);