const popup = document.getElementById('welcome-popup');
const closeButton = document.getElementById('close-btn');

window.onload = function() {
    setTimeout(function() {
        popup.style.display = 'block';
    }, 1000); 
}

// 关闭弹窗
closeButton.onclick = function() {
    popup.style.display = 'none';
}
