function showModal(title, body) {
    // 设置弹窗标题和内容
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerText = body;
    // 显示弹窗
    document.getElementById('myModal').style.display = 'block';
}

// 关闭弹窗
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// 点击页面其他地方关闭弹窗
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}