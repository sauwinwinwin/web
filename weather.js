const weatherData = {
    week: [
        { date: '1月1日', temperature: 1, wind: 5, sunlight: 6, uvi: 3, rain: 0, disaster: '无' },
        { date: '1月2日', temperature: 2, wind: 4, sunlight: 2, uvi: 2, rain: 1, disaster: '无' },
        { date: '1月3日', temperature: -3, wind: 3, sunlight: 0, uvi: 0, rain: 4, disaster: '暴雪' },
        { date: '1月4日', temperature: -7, wind: 2, sunlight: 2, uvi: 1, rain: 2, disaster: '无' },
        { date: '1月5日', temperature: -4, wind: 5, sunlight: 5, uvi: 3, rain: 0, disaster: '无' },
        { date: '1月6日', temperature: -10, wind: 3, sunlight: 4, uvi: 3, rain: 0, disaster: '雾霾' },
        { date: '1月7日', temperature: -12, wind: 2, sunlight: 5, uvi: 3, rain: 0, disaster: '无' },
    ],
    month: [
        { date: '1月', averageTemperature: -12, averageWind: 2, averageSunlight: 5, averageUvi: 2, totalRain: 12, disaster: '无' },
        { date: '2月', averageTemperature: -10, averageWind: 4, averageSunlight: 4, averageUvi: 2, totalRain: 10, disaster: '无' },
        { date: '3月', averageTemperature: 1, averageWind: 3, averageSunlight: 5, averageUvi: 2, totalRain: 20, disaster: '无' },
        { date: '4月', averageTemperature: 5, averageWind: 5, averageSunlight: 7, averageUvi: 3, totalRain: 50, disaster: '无' },
        { date: '5月', averageTemperature: 12, averageWind: 3, averageSunlight: 6, averageUvi: 5, totalRain: 120, disaster: '无' },
        { date: '6月', averageTemperature: 20, averageWind: 3, averageSunlight: 8, averageUvi: 6, totalRain: 144, disaster: '无' }
    ],
    year: [
        { year: '2024', averageTemperature: 15, averageWind: 4, averageSunlight: 7, averageUvi: 3, totalRain: 370, disaster: '无' },
        { year: '2023', averageTemperature: 13, averageWind: 3, averageSunlight: 10, averageUvi: 2, totalRain: 250, disaster: '无' },
        { year: '2022', averageTemperature: 14, averageWind: 5, averageSunlight: 6, averageUvi: 3, totalRain: 410, disaster: '无' }
    ]
};
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const period = tab.getAttribute('data-period');
        loadWeatherData(period);
    });
});
function loadWeatherData(period) {
    const statsContainer = document.getElementById('weatherStats');
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.remove('hidden');
    statsContainer.style.display = 'none';
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');
        statsContainer.innerHTML = '';
        
        const weatherStats = weatherData[period];
        weatherStats.forEach(data => {
            const statDiv = document.createElement('div');
            statDiv.classList.add('stat');
            if (period === 'month' || period === 'year') {
                statDiv.innerHTML = `
                    <div class="weather-info" style="text-align: center;">
                        <div class="row">
                            <strong class="year">${data.date || data.year}</strong>
                            <br>
                            <div class="grid">
                                <span class="grid-item" style="margin:20px 70px">平均温度（℃）: ${data.averageTemperature}</span>
                                <span class="grid-item" style="margin:20px 70px">平均风速（km/h）： ${data.averageWind}</span>
                                <span class="grid-item" style="margin:20px 70px">平均日照时长（h）: ${data.averageSunlight}</span>
                            </div>
                        </div>
                        <div class="row">
                            <span class="grid-item" style="margin:20px 70px">平均紫外线强弱（uv）: ${data.averageUvi}</span>
                            <span class="grid-item" style="margin:20px 70px">总降雨量（mm）: ${data.totalRain}</span>
                            <span class="grid-item" style="margin:20px 70px">灾害天气: ${data.disaster}</span>
                        </div>
                    </div>
                `;
            } else {
                statDiv.innerHTML = `
                    <div class="weather-info" style="text-align: center;">
                        <div class="row">
                            <strong class="year">${data.date || data.year}</strong>
                            <br>
                            <div class="grid">
                                <span class="grid-item" style="margin:20px 70px">温度（℃）: ${data.temperature}</span>
                                <span class="grid-item" style="margin:20px 70px">风速（km/h）： ${data.wind}</span>
                                <span class="grid-item" style="margin:20px 70px">日照时长（h）: ${data.sunlight}</span>
                            </div>
                        </div>
                        <div class="row">
                            <span class="grid-item" style="margin:20px 70px">紫外线强弱（uv）: ${data.uvi}</span>
                            <span class="grid-item" style="margin:20px 70px">降雨量（mm）: ${data.rain}</span>
                            <span class="grid-item" style="margin:20px 70px">灾害天气: ${data.disaster}</span>
                        </div>
                    </div>
                `;
            }
            statsContainer.appendChild(statDiv);
        });
        
        statsContainer.style.display = 'block';
        statsContainer.style.opacity = '1';
        statsContainer.querySelectorAll('.stat').forEach((s, index) => {
            setTimeout(() => {
                s.style.opacity = '1';
            }, index * 100);
        });
    }, 1000);
}
loadWeatherData('week');
loadWeatherData('month');
loadWeatherData('year');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // 替换为您的OpenWeatherMap API密钥
const city = 'Beijing';

// 初始化 Leaflet 地图
var map = L.map('map').setView([39.90923, 116.397428], 10); // 北京坐标

// 加载 OpenStreetMap 地图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 获取天气数据
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`)
    .then(response => response.json())
    .then(data => {
        const weatherDescription = data.weather[0].description; // 天气描述
        const temperature = data.main.temp; // 温度
        const windSpeed = data.wind.speed; // 风速

        // 将天气信息添加到地图上
        const popupContent = `
            <h3>当前天气: ${weatherDescription}</h3>
            <p>温度: ${temperature}°C</p>
            <p>风速: ${windSpeed} m/s</p>
        `;

        var marker = L.marker([39.90923, 116.397428]).addTo(map); // 在地图上添加标记
        marker.bindPopup(popupContent).openPopup(); // 在标记上绑定天气信息
    })
    .catch(error => console.log('Error fetching weather data:', error));

    document.getElementById('submitBtn').addEventListener('click', async function() {
        const inputText = document.getElementById('inputText').value;
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = '正在生成...';
    
        const apiKey = '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'; // 替换为你的 OpenAI API Key
        const url = 'https://api.openai.com/v1/chat/completions'; // API endpoint for chat completions
    
        try {
            // 发送请求
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // Use GPT-3.5 model
                    messages: [
                        { role: 'user', content: inputText }
                    ],
                    max_tokens: 100,
                    temperature: 0.7
                })
            });
    
            // 检查响应状态
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API 请求失败: ${errorData.error.message}`);
            }
    
            // 解析返回的 JSON 数据
            const data = await response.json();
            responseDiv.innerHTML = data.choices[0].message.content || '无响应';
        } catch (error) {
            // 输出详细的错误信息
            responseDiv.innerHTML = '出现错误：' + error.message;
            console.error('错误详细信息:', error);
        }
    });
    