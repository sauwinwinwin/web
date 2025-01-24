// 模拟视频数据
const allVideos = [
    { title: "德庆贡桔", category: "agriculture", points: 10, videoSrc: "video_1.mp4" },
    { title: "农业发展概念短片", category: "agriculture", points: 15, videoSrc: "video_2.mp4" },
    { title: "农业产品宣传片", category: "promotion", points: 12, videoSrc: "video_3.mp4" },
    { title: "德庆桔子种植技巧", category: "agriculture", points: 14, videoSrc: "video_4.mp4" },
    { title: "农业合作社管理", category: "agriculture", points: 18, videoSrc: "video_5.mp4" },
    { title: "绿色食品推广", category: "promotion", points: 10, videoSrc: "video_6.mp4" },
    { title: "现代农业技术应用", category: "agriculture", points: 20, videoSrc: "video_7.mp4" }
];

let currentPage = 1;
const videosPerPage = 3;

// 获取视频列表并过滤
function filterVideos() {
    const selectedCategory = document.getElementById('category').value;
    let filteredVideos;

    if (selectedCategory === 'all') {
        filteredVideos = allVideos;  // 默认显示所有视频
    } else {
        filteredVideos = allVideos.filter(video => video.category === selectedCategory);
    }

    // 显示视频并进行分页
    displayVideos(filteredVideos);
}

// video.js
function displayVideos(videos) {
    const container = document.getElementById('video-container');
    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
    const pagedVideos = videos.slice(start, end);

    // 清空视频容器
    container.innerHTML = "";

    // 检查是否有视频需要展示
    if (pagedVideos.length === 0) {
        container.innerHTML = "<p>没有视频可以展示。</p>";
    } else {
        pagedVideos.forEach(video => {
            const videoElement = `
                <div class="video">
                    <video controls>
                        <source src="${video.videoSrc}" type="video/mp4">
                        您的浏览器不支持 HTML5 视频。
                    </video>
                    <div class="video-title">${video.title}</div>
                    <div class="points">完整观看获得积分: ${video.points}</div>
                </div>
            `;
            container.innerHTML += videoElement;
        });

        // 为每个视频添加播放完毕后的事件监听器
        const videosElements = document.querySelectorAll('.video video');
        videosElements.forEach((videoElement, index) => {
        videoElement.addEventListener('ended', () => {
        alert(`视频《${pagedVideos[index].title}》播放完毕！`);

        // 获取当前登录用户的邮箱
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        if (!loggedInUserEmail) {
            alert('请先登录，积分无法更新！');
            return;
        }

        // 获取已登录用户数据
        const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
        if (!user) {
            alert('用户信息未找到，无法更新积分！');
            return;
        }

        // 累加积分
        const earnedPoints = pagedVideos[index].points; // 每个视频的积分
        user.points += earnedPoints; // 累加到用户积分
        localStorage.setItem(loggedInUserEmail, JSON.stringify(user)); // 更新用户数据


        alert(`获得积分！当前积分: ${user.points}`);
    });
});

    }

    // 分页按钮禁用逻辑
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * videosPerPage >= videos.length;
}


// 处理分页
function changePage(direction) {
    currentPage += direction;
    filterVideos();  // 根据选择的类别重新过滤并展示
}

// 初始化页面
window.onload = function() {
    filterVideos(); // 默认加载所有视频
};

function searchVideos() {
    var keyword = document.getElementById('search-keyword').value;
    var platforms = Array.from(document.getElementById('platform-select').selectedOptions).map(option => option.value);
    
    if (keyword.trim() === "") {
        alert("请输入关键词！");
        return;
    }
    
    platforms.forEach(function(platform) {
        var url = '';
        if (platform === 'bilibili') {
            url = `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`;
        } else if (platform === 'douyin') {
            url = `https://www.douyin.com/search/${encodeURIComponent(keyword)}`;
        }
        else if (platform === 'weibo') {
            url = `https://s.weibo.com/weibo/${encodeURIComponent(keyword)}`;
        }
        window.open(url, '_blank');
    });
}
