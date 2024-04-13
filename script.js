let clickCount = 0.0;
let energy = 500;

let boost = 0.00001;
let boosPrice = 0.02;

let energyPrice = 0.02;
let energyBoost = 1;

let energyMax = 500;
let energyMaxPrice = 0.02;

let haveAutoClicker = false;
let autoClickerPrice = 0.00002;

const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const clickEnergy = document.getElementById('energy');
const clickImage = document.querySelector('button img');
const upgradeBoostButton = document.getElementById('boostButton');
const upgradeEnergyButton = document.getElementById('energyBoostButton');
const upgradeEnergyMaxButton = document.getElementById('energyMaxButton');
const buyAutoclickerButton = document.getElementById('botButton');

clickEnergy.textContent = energy;

clickButton.addEventListener('click', () => {
    clickCount += boost;
    energy--;
    clickEnergy.textContent = energy;
    clickCountDisplay.textContent = clickCount.toFixed(5);

    clickImage.classList.add('animated');
    setTimeout(() => {
        clickImage.classList.remove('animated');
    }, 100);
});

upgradeBoostButton.addEventListener('click', () =>{
    if(clickCount > boosPrice){
        clickCount -= boosPrice;
        clickCountDisplay.textContent = clickCount;
        boost += 0.00001;
        boosPrice *= 2;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});

upgradeEnergyButton.addEventListener('click', () =>{
    if(clickCount > energyPrice){
        clickCount -= energyPrice;
        clickCountDisplay.textContent = clickCount;
        energyBoost++;
        energyPrice *= 2;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});

upgradeEnergyButton.addEventListener('click', () =>{
    if(clickCount > energyPrice){
        clickCount -= energyPrice;
        clickCountDisplay.textContent = clickCount;
        energyBoost++;
        energyPrice *= 2;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});

upgradeEnergyMaxButton.addEventListener('click', () =>{
    if(clickCount > energyMaxPrice){
        clickCount -= energyMaxPrice;
        clickCountDisplay.textContent = clickCount;
        energyMax += 500;
        energyMaxPrice *= 2;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});

buyAutoclickerButton.addEventListener('click', () =>{
    if(clickCount > autoClickerPrice && !haveAutoClicker){
        clickCount -= autoClickerPrice;
        clickCountDisplay.textContent = clickCount;
        haveAutoClicker = true;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});

setInterval(() => {
    if(energy + energyBoost < energyMax){
        energy += energyBoost;
        clickEnergy.textContent = energy;
    }
    else{
        energy = energyMax;
        clickEnergy.textContent = energy;
    }
}, 2000);

setInterval(() => {
    if(haveAutoClicker == true){

        clickCount += boost;
        clickCountDisplay.textContent = clickCount.toFixed(5);

        clickImage.classList.add('animated');
        setTimeout(() => {
            clickImage.classList.remove('animated');
        }, 100);

    }
}, 6000);


function sendToBot(user_id, energy, clickCount) {
    const data = {
        user_id: user_id,
        energy: energy,
        clickCount: clickCount
    };

    fetch('http://127.0.0.1:5000/update_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


setInterval(() => {
    sendToBot(user_id, energy, clickCount);
}, 5000);
