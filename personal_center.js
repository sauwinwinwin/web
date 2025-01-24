function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'flex';

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

// 显示注册表单
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'flex';

    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-phone').value = '';
    document.getElementById('register-password').value = '';
}

// 关闭弹窗
function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

// 注册功能
function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    
    // 检查邮箱是否已被注册
    if (localStorage.getItem(email)) {
        alert("该邮箱已被注册！");
        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        points: 100,  // 初始积分为100
        avatar: '', // 默认头像为空
    };
    localStorage.setItem(email, JSON.stringify(user)); // 存储用户数据
    alert("注册成功，请登录！");
    showLoginForm(); // 注册成功后显示登录表单
}

// 页面加载时检查登录状态
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser'); // 获取已登录用户
    const lastLoginTime = localStorage.getItem('lastLoginTime'); // 获取上次登录时间
    const currentTime = new Date().getTime(); // 当前时间戳

    // 自动登录有效时间：10分钟
    const autoLoginDuration = 10 * 60 * 1000;

    // 检查用户是否已登录且在有效登录时间内
    if (loggedInUser && lastLoginTime && (currentTime - lastLoginTime <= autoLoginDuration)) {
        const user = JSON.parse(localStorage.getItem(loggedInUser)); // 获取用户数据
        loadProfile(user); // 加载个人中心信息
        closePopup();
        return; // 不显示登录/注册弹窗
    }

    // 如果未登录或登录状态已过期，显示登录弹窗
    logout();
    showLoginForm();
};

// 登录功能
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = JSON.parse(localStorage.getItem(email)); // 查找邮箱对应的用户

    if (user && user.password === password) {
        // 登录成功后，记录登录信息和登录时间
        localStorage.setItem('loggedInUser', email);
        localStorage.setItem('lastLoginTime', new Date().getTime());

        loadProfile(user); // 加载用户个人信息
        closePopup(); // 关闭弹窗
    } else {
        alert("登录失败，请检查邮箱或密码");
    }
}


// 退出登录功能更新：清理登录时间
function logout() {
    localStorage.removeItem('loggedInUser'); // 清理登录用户
    localStorage.removeItem('lastLoginTime'); // 清理登录时间
    document.getElementById('profile').style.display = 'none';
    showLoginForm(); // 退出后显示登录表单
}



// 加载用户个人信息
function loadProfile(user) {
    document.getElementById('profile').style.display = 'block';
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-phone').textContent = user.phone;
    document.getElementById('profile-points').textContent = user.points;
    document.getElementById('avatar').src = user.avatar || 'default-avatar.png'; // 如果没有头像则使用默认头像
}

// 上传头像
function uploadAvatar() {
    const avatarInput = document.getElementById('avatar-upload');
    const file = avatarInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const user = JSON.parse(localStorage.getItem(localStorage.getItem('loggedInUser')));
            user.avatar = e.target.result; // 上传的头像
            localStorage.setItem(user.email, JSON.stringify(user)); // 更新用户数据
            document.getElementById('avatar').src = e.target.result; // 显示新头像
        };
        reader.readAsDataURL(file);
    }
}
