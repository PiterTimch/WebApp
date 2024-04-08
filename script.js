let clickCount = 0.0;
let boost = 0.00001;
let boosPrice = 0.02;
let energyPrice = 0.02;
let energy = 500;
let energyBoost = 1;
let energyMax = 500;
let energyMaxPrice = 0.02;

const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const clickEnergy = document.getElementById('energy');
const clickImage = document.querySelector('button img');
const upgradeBoostButton = document.getElementById('boostButton');
const upgradeEnergyButton = document.getElementById('energyBoostButton');
const upgradeEnergyMaxButton = document.getElementById('energyMaxButton');

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

setInterval(() => {
    if(energy + energyBoost < energyMax){
        energy += energyBoost;
        clickEnergy.textContent = energy;
    }
    else{
        energy = energyMax;
        clickEnergy.textContent = energy;
    }
}, 500);
