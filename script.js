document.addEventListener('DOMContentLoaded', function() {
    const tableContainer = document.getElementById('multiplicationTable');
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
        // 添加每行的第一個數字
        row.innerHTML = `<td style="background-color: #e3e3e3;"><strong>${i}</strong></td>`;
        
        // 計算該行的乘法結果
        for (let j = 1; j <= 9; j++) {
            const result = i * j;
            row.innerHTML += `<td>${result}</td>`;
        }
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
});
