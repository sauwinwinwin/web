let cases = [];
let expertResponses = [];
function showCase() {
    const caseList = document.getElementById('farmer-cases');
    caseList.innerHTML = ''; // 清空当前案例
    cases.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerText = `案例 ${index + 1}: ${item.question}（点击查看详细内容）`;
        div.onclick = () => showDetail(index); // 点击查看详细
        caseList.appendChild(div);
    });
}
function showDetail(index) {
    const item = cases[index];
    alert(`用户提问: ${item.question}\n农民回答: ${item.answers.join('\n')}`);
}
function addNewQuestion() {
    const question = prompt('请输入您的新疑问:');
    if (question) {
        cases.push({ question, answers: [] });
        alert('新疑问已添加！');
    }
}
function selectExistingQuestion() {
    const index = prompt(`选择已有问题：（1~${cases.length}）`) - 1;
    const answer = prompt('请输入您的回答:');
    if (index >= 0 && index < cases.length && answer) {
        cases[index].answers.push(answer);
        alert('回答已添加！');
    } else {
        alert('无效的选择或回答！');
    }
}
function askExpert() {
    const question = document.getElementById('expert-question').value;
    const expert = document.getElementById('expert-select').value;
    if (question) {
        const response = `这是${expert}对您的问题的回答。`;
        expertResponses.push({ question, response });
        document.getElementById('expert-response').innerHTML += `<p><strong>提问:</strong> ${question} <br /><strong>回答:</strong> ${response}</p>`;
        document.getElementById('expert-question').value = ''; // 清空提问框
    }
}