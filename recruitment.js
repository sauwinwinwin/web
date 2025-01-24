let contestants = [
    { id: '001', name: '李明', description: '农业机械创新设计', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
    { id: '002', name: '张华', description: '现代农业种植技术', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
    { id: '003', name: '王强', description: '可持续农业发展研究', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
    { id: '004', name: '刘海', description: '农业智能化管理', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
    { id: '005', name: '赵娜', description: '绿色农业项目', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
    { id: '006', name: '杨杰', description: '生态农业与保护', image: 'https://via.placeholder.com/150', votes: 0, comments: [] },
];
// 题目和选项内容
const questions = [
    {
        question: '农业知识大赛题目1：农业机械的主要用途是什么？',
        options: ['选项 A: 土地耕作', '选项 B: 作物收割', '选项 C: 肥料施用', '选项 D: 灌溉'],
        correctAnswer: '选项 A: 土地耕作'
    },
    {
        question: '农业知识大赛题目2：现代农业技术中的精准农业指的是什么？',
        options: ['选项 A: 增加作物产量', '选项 B: 使用高科技设备', '选项 C: 精确控制农业操作', '选项 D: 提高农业劳动力效率'],
        correctAnswer: '选项 C: 精确控制农业操作'
    },
    {
        question: '农业知识大赛题目3：生态农业强调哪些原则？',
        options: ['选项 A: 可持续性', '选项 B: 增加化肥使用', '选项 C: 密集种植', '选项 D: 改善土壤质量'],
        correctAnswer: '选项 A: 可持续性'
    },
    // 继续添加更多题目
];

let currentPage = 1;
const contestantsPerPage = 6;
let quizStarted = false;
let quizSubmitted = false;
let timer;
let timeLeft = 300; // 5 minutes
let correctAnswers = {
    q1: '10',
    q2: '20',
    q3: '30',
    q4: '40',
    q5: '50',
    q6: '60',
    q7: '70',
    q8: '80',
    q9: '90',
    q10: '100',
};
let answers = {}; // 存储用户的答案

// 渲染选手列表
function renderContestants() {
    const container = document.getElementById('contestants-list');
    container.innerHTML = '';  // 清空现有的内容
    const startIdx = (currentPage - 1) * contestantsPerPage;
    const endIdx = startIdx + contestantsPerPage;
    const currentContestants = contestants.slice(startIdx, endIdx);

    currentContestants.forEach(contestant => {
        const contestantDiv = document.createElement('div');
        contestantDiv.classList.add('contestant');
        contestantDiv.innerHTML = `
            <img src="${contestant.image}" alt="${contestant.name}">
            <h3>${contestant.name}</h3>
            <p>${contestant.description}</p>
            <p>票数: ${contestant.votes}</p>
            <button class="vote-btn" onclick="vote('${contestant.id}')">投票</button>
            <button class="comment-btn" onclick="showCommentForm('${contestant.id}')">评论</button>
            <button class="view-comments-btn" onclick="viewComments('${contestant.id}')">查看评论</button>
            <div id="comments-${contestant.id}" class="comment-section"></div>
        `;
        container.appendChild(contestantDiv);
    });

    updatePagination();
}

// 投票功能
function vote(id) {
    const contestant = contestants.find(c => c.id === id);
    if (contestant) {
        contestant.votes++;
        renderContestants(); // 重新渲染选手列表
    }
}

// 添加评论
function showCommentForm(id) {
    const comment = prompt("请输入您的评论：");
    if (comment) {
        const contestant = contestants.find(c => c.id === id);
        if (contestant) {
            contestant.comments.push(comment);
        }
    }
}

// 查看评论
function viewComments(id) {
    const contestant = contestants.find(c => c.id === id);
    const commentsDiv = document.getElementById(`comments-${id}`);
    commentsDiv.innerHTML = '';
    contestant.comments.forEach(comment => {
        const p = document.createElement('p');
        p.textContent = comment;
        commentsDiv.appendChild(p);
    });
}

// 更新翻页功能
function updatePagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumber = document.getElementById('page-number');

    const totalPages = Math.ceil(contestants.length / contestantsPerPage);
    pageNumber.textContent = `第 ${currentPage} 页`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// 上一页和下一页功能
document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderContestants();
    }
});

document.getElementById('next-page').addEventListener('click', function() {
    const totalPages = Math.ceil(contestants.length / contestantsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderContestants();
    }
});

// 显示和隐藏添加选手表单
document.getElementById('show-add-contestant-form').addEventListener('click', function() {
    const form = document.getElementById('add-contestant-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

// 添加选手功能
document.getElementById('add-contestant-btn').addEventListener('click', function() {
    const name = document.getElementById('contestant-name').value;
    const id = document.getElementById('contestant-id').value;
    const description = document.getElementById('contestant-description').value;
    const image = document.getElementById('contestant-image').value;

    contestants.push({ id, name, description, image, votes: 0, comments: [] });
    renderContestants();
    document.getElementById('add-contestant-form').style.display = 'none';
    document.getElementById('add-contestant-form').reset();
});

// 答题模块逻辑
document.getElementById('start-quiz').addEventListener('click', function() {
    if (!quizStarted) {
        quizStarted = true;
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-result').innerHTML = ''; // 清除上次的结果
        startTimer();
        renderQuiz();
    }
});

// 渲染题目
function renderQuiz() {
    const form = document.getElementById('quiz-form');
    form.innerHTML = '';  // 清空以前的内容
    
    // 遍历题目数组，生成每个题目的 HTML
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>问题 ${index + 1}: ${question.question}</p>
            <input type="radio" name="q${index + 1}" value="${question.options[0]}"> ${question.options[0]}<br>
            <input type="radio" name="q${index + 1}" value="${question.options[1]}"> ${question.options[1]}<br>
            <input type="radio" name="q${index + 1}" value="${question.options[2]}"> ${question.options[2]}<br>
            <input type="radio" name="q${index + 1}" value="${question.options[3]}"> ${question.options[3]}<br>
        `;
        form.appendChild(questionDiv);
    });
}


// 启动定时器
function startTimer() {
    // 如果有旧的定时器，先清除它
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(function() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// 提交答题
document.getElementById('submit-quiz').addEventListener('click', function() {
    if (!quizSubmitted) {
        submitQuiz();
    }
});

// 提交答题并显示结果
function submitQuiz() {
    quizSubmitted = true;
    clearInterval(timer);
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let score = 0;

    formData.forEach((value, key) => {
        answers[key] = value;
        const questionIndex = parseInt(key.replace('q', ''), 10) - 1;
        if (value == questions[questionIndex].correctAnswer) {
            score += 10;
        }
    });

    document.getElementById('quiz-result').innerHTML = `
        <h3>答题结束</h3>
        <p>您的得分是: ${score} 分</p>
        <h4>正确答案</h4>
        ${renderCorrectAnswers()}
    `;
}



// 显示正确答案
function renderCorrectAnswers() {
    let resultHtml = '';
    questions.forEach((question, index) => {
        resultHtml += `<p>问题 ${index + 1}: 正确答案是 ${question.correctAnswer}</p>`;
    });
    return resultHtml;
}


// 重置答题
document.getElementById('reset-quiz').addEventListener('click', function() {
    // 重置所有状态
    quizStarted = false;
    quizSubmitted = false;
    timeLeft = 300;
    answers = {};

    // 清除定时器
    clearInterval(timer);

    // 重新渲染题目
    renderQuiz();

    // 隐藏答题区域，清除结果和计时器显示
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').innerHTML = '';
    document.getElementById('timer').textContent = '5:00';  // 重置计时器文本
});

// 页面加载时自动渲染选手列表
renderContestants();
