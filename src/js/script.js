document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    let activeInterval;

    const INTERVAL_MS = 1000;

    function formatValue(value) {
        return String(value).padStart(2, '0');
    }

    function createTimerHTML() {
        return `
            <div class="timer">
                <div class="time-unit">
                    <span class="value">00</span>
                    <span class="label">Dias</span>
                </div>
                <div class="time-unit">
                    <span class="value">00</span>
                    <span class="label">Horas</span>
                </div>
                <div class="time-unit">
                    <span class="value">00</span>
                    <span class="label">Minutos</span>
                </div>
                <div class="time-unit">
                    <span class="value">00</span>
                    <span class="label">Segundos</span>
                </div>
            </div>
        `;
    }

    function updateDisplay(deadline, timerElement) {
        const now = Date.now();
        const distance = new Date(deadline).getTime() - now;

        if (distance <= 0) {
            clearInterval(activeInterval);
            setTimerValues(timerElement, [0, 0, 0, 0]);
            showToast("Tempo esgotado");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimerValues(timerElement, [days, hours, minutes, seconds]);
    }

    function setTimerValues(timerElement, values) {
        const timeUnits = timerElement.querySelectorAll('.time-unit');
        values.forEach((value, index) => {
            timeUnits[index].querySelector('.value').textContent = formatValue(value);
        });
    }

    function startTimer(deadline, timerElement) {
        if (activeInterval) clearInterval(activeInterval);

        updateDisplay(deadline, timerElement);

        activeInterval = setInterval(() => updateDisplay(deadline, timerElement), INTERVAL_MS);
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = message;
            toast.classList.add("show");

            setTimeout(() => toast.classList.remove("show"), 3000);
        }
    }

    function handleTabClick(event) {
        tabs.forEach(tab => tab.classList.remove('active', 'selected-tab'));
        tabContents.forEach(content => content.classList.remove('active'));

        const clickedTab = event.currentTarget;
        clickedTab.classList.add('active', 'selected-tab');
        const content = document.getElementById(clickedTab.dataset.tab);
        if (content) {
            content.classList.add('active');

            const timerContainer = content.querySelector('.timer-container');
            if (timerContainer && !timerContainer.innerHTML) {
                timerContainer.innerHTML = createTimerHTML();
            }

            const deadline = clickedTab.dataset.deadline;
            const timerElement = content.querySelector('.timer');
            if (timerElement) startTimer(deadline, timerElement);
        }
    }

    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const activeContent = document.getElementById(activeTab.dataset.tab);
        if (activeContent) {
            const timerContainer = activeContent.querySelector('.timer-container');
            if (timerContainer && !timerContainer.innerHTML) {
                timerContainer.innerHTML = createTimerHTML();
            }

            const activeTimer = activeContent.querySelector('.timer');
            if (activeTimer) startTimer(activeTab.dataset.deadline, activeTimer);
        }
    }
});
