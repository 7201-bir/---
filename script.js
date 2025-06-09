let currentMode = 'view';
let timer;
let seconds = 0;
let ispracticing = false;
let currentQuestions = [];
let correctCount = 0;
let wrongCount = 0;
let questionsAnswered = 0;

document.addEventListener('DOMContentLoaded', function() {
    const viewModeBtn = document.getElementById('viewMode');
    const practiceModeBtn = document.getElementById('practiceMode');
    const startPracticeBtn = document.getElementById('startPractice');
    const timerDisplay = document.getElementById('timerDisplay');
    const scoreDisplay = document.getElementById('scoreDisplay');

    // 初始顯示完整乘法表
    generateMultiplicationTable('view');

    // 模式切換按鈕事件
    viewModeBtn.addEventListener('click', () => switchMode('view'));
    practiceModeBtn.addEventListener('click', () => switchMode('practice'));
    startPracticeBtn.addEventListener('click', startPractice);

    function switchMode(mode) {
        currentMode = mode;
        viewModeBtn.classList.toggle('active', mode === 'view');
        practiceModeBtn.classList.toggle('active', mode === 'practice');
        startPracticeBtn.classList.toggle('d-none', mode === 'view');
        timerDisplay.classList.toggle('d-none', mode === 'view');
        scoreDisplay.classList.toggle('d-none', mode === 'view');
        
        if (mode === 'view') {
            stopPractice();
            generateMultiplicationTable('view');
        } else {
            resetPractice();
        }
    }
});

function generateMultiplicationTable(mode) {
    const tableContainer = document.getElementById('multiplicationTable');
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'multiplication-table';

    // 建立表頭行
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<td style="background-color: #e3e3e3;">×</td>';
    for (let i = 1; i <= 9; i++) {
        headerRow.innerHTML += `<td style="background-color: #e3e3e3;"><strong>${i}</strong></td>`;
    }
    table.appendChild(headerRow);

    // 生成乘法表內容
    for (let i = 1; i <= 9; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td style="background-color: #e3e3e3;"><strong>${i}</strong></td>`;
        
        for (let j = 1; j <= 9; j++) {
            const result = i * j;
            const cell = document.createElement('td');
            
            if (mode === 'view') {
                cell.textContent = result;
            } else {
                cell.textContent = result;
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.dataset.result = result;
            }
            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}

function startPractice() {
    resetPractice();
    ispracticing = true;
    startTimer();
    generateQuestions();
}

function stopPractice() {
    ispracticing = false;
    stopTimer();
    currentQuestions = [];
}

function resetPractice() {
    correctCount = 0;
    wrongCount = 0;
    questionsAnswered = 0;
    seconds = 0;
    updateScore();
    generateMultiplicationTable('practice');
    document.getElementById('timer').textContent = '00:00';
}

function generateQuestions() {
    currentQuestions = [];
    const cells = document.querySelectorAll('.multiplication-table td:not(:first-child)');
    cells.forEach(cell => cell.classList.remove('question-cell', 'correct-answer', 'wrong-answer'));

    // 生成10個隨機題目
    while (currentQuestions.length < 10) {
        const i = Math.floor(Math.random() * 9) + 1;
        const j = Math.floor(Math.random() * 9) + 1;
        const key = `${i}-${j}`;
        
        if (!currentQuestions.some(q => q.key === key)) {
            const cell = document.querySelector(`.multiplication-table td[data-row="${i}"][data-col="${j}"]`);
            if (cell) {
                cell.innerHTML = '<input type="number" min="1" max="81" class="answer-input">';
                cell.classList.add('input-cell', 'question-cell');
                currentQuestions.push({
                    key,
                    row: i,
                    col: j,
                    result: i * j,
                    cell
                });

                // 添加輸入事件
                const input = cell.querySelector('input');
                input.addEventListener('change', (e) => checkAnswer(e, i * j, cell));
            }
        }
    }
}

function checkAnswer(event, correctResult, cell) {
    const userAnswer = parseInt(event.target.value);
    
    if (userAnswer === correctResult) {
        cell.classList.remove('question-cell', 'wrong-answer');
        cell.classList.add('correct-answer');
        correctCount++;
    } else {
        cell.classList.remove('question-cell', 'correct-answer');
        cell.classList.add('wrong-answer');
        wrongCount++;
    }

    questionsAnswered++;
    updateScore();

    if (questionsAnswered >= 10) {
        stopPractice();
        alert(`練習完成！\n答對：${correctCount}\n答錯：${wrongCount}\n用時：${formatTime(seconds)}`);
    }
}

function updateScore() {
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('wrongCount').textContent = wrongCount;
    document.getElementById('progress').textContent = questionsAnswered;
}

function startTimer() {
    if (timer) clearInterval(timer);
    seconds = 0;
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
