let clickCount = 0.0;
let boost = 0.00001;
let boosPrice = 0.02;
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const clickImage = document.querySelector('button img');

const upgradeButton = document.getElementById('boostButton');

clickButton.addEventListener('click', () => {
    clickCount += boost;
    clickCountDisplay.textContent = clickCount.toFixed(5);

    clickImage.classList.add('animated');
    setTimeout(() => {
        clickImage.classList.remove('animated');
    }, 100);
});

upgradeButton.addEventListener('click', () =>{
    if(clickCount > boosPrice){
        clickCount -= boosPrice;
        clickCountDisplay.textContent = clickCount;
        boost += 0.00001;
        boosPrice *= 2;
        clickCountDisplay.textContent = clickCount.toFixed(5);
    }
});