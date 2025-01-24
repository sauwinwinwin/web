const ctx = document.createElement('canvas');
        document.getElementById('chart').appendChild(ctx);
        
        // 设置初始数据为0
        const initialData = [0, 0, 0, 0, 0];
        const targetData = [1212, 1908, 334, 567, 1034];
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['农产品A', '农产品B', '农产品C', '农产品D','农产品E'],
                datasets: [{
                    label: '过去一年购买数量（个）',
                    data: initialData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],             
                    borderWidth: 1
                }]
            },
            options: {
                
                animation: {
                    duration: 2000 
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        function updateChart() {
            const duration = 2000; 
            const animationSteps = 100; 
            for (let step = 0; step <= animationSteps; step++) {
                setTimeout(() => {
                    const newData = targetData.map(target => Math.round((step / animationSteps) * target));
                    myChart.data.datasets[0].data = newData;
                    myChart.update();
                }, (duration / animationSteps) * step);
            }
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    myChart.update(); 
                    updateChart();
                }
            });
        });
        observer.observe(document.getElementById('chart'));
        document.getElementById('product-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const productName = document.getElementById('productName').value;
            const quantity = document.getElementById('quantity').value;
            alert(`您提交了：${productName} - 数量：${quantity}`);
            this.reset();
        });
                    