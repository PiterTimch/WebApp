let clickCount = 0;
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const clickImage = document.querySelector('button img');

clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;

    clickImage.classList.add('animated');
    setTimeout(() => {
        clickImage.classList.remove('animated');
    }, 100);
});
