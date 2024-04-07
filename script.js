let clickCount = 0;
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');

clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
});
