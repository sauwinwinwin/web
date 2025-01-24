let currentIndex = 0;
let totalLikes = 0; 
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');

function initializeDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });
}
function updateCarousel() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}
const likeIcons = document.querySelectorAll('.like-icon');
likeIcons.forEach((likeIcon, index) => {
    let likes = 0; // 记录当前幻灯片的点赞数
    likeIcon.addEventListener('click', () => {
        if (totalLikes < 10) { // 检查是否超过当天的点赞上限
            likes += 1;
            totalLikes += 1;
            likeIcon.setAttribute('data-likes', likes);
            likeIcon.style.color = 'yellow'; // 点赞图标变亮
            likeIcon.nextElementSibling.textContent = likes; // 更新点赞数
        } else {
            alert('您今天的点赞次数已达到上限！');
        }
    });
});
setInterval(nextSlide, 10000); 
initializeDots();
