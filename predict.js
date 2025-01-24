const products = [
    {
        name: "有机苹果",
        category: "水果",
        price: 20,
        sales: 1500,
        trend: "上升",
        description: "新鲜采摘的有机苹果，味道甜美。",
        stock: 100,
    },
    {
        name: "新鲜香蕉",
        category: "水果",
        price: 15,
        sales: 1200,
        trend: "平稳",
        description: "成熟的香蕉，口感柔软，甜而不腻。",
        stock: 100,
    },
    {
        name: "多汁橙子",
        category: "水果",
        price: 18,
        sales: 800,
        trend: "下降",
        description: "新鲜橙子，果汁丰富，口感清新。",
        stock: 100,
    },
    {
        name: "绿色奇异果",
        category: "水果",
        price: 25,
        sales: 1300,
        trend: "上升",
        description: "天然绿色奇异果，富含维生素C，口感酸甜。",
        stock: 50,
    },
    {
        name: "甜蜜葡萄",
        category: "水果",
        price: 30,
        sales: 900,
        trend: "平稳",
        description: "选用新鲜葡萄，果实饱满，香甜可口。",
        stock: 120,
    },
    {
        name: "香甜芒果",
        category: "水果",
        price: 35,
        sales: 2800,
        trend: "下降",
        description: "选自优质芒果，果肉细腻，甜美多汁。",
        stock: 80,
    },
    {
        name: "清新西瓜",
        category: "水果",
        price: 20,
        sales: 780,
        trend: "上升",
        description: "水分充足，口感清爽，适合夏日解暑。",
        stock: 150,
    },
    {
        name: "有机胡萝卜",
        category: "蔬菜",
        price: 12,
        sales: 600,
        trend: "平稳",
        description: "富含维生素的有机胡萝卜，口感清脆。",
        stock: 200,
    },
    {
        name: "新鲜菠菜",
        category: "蔬菜",
        price: 10,
        sales: 400,
        trend: "下降",
        description: "富含铁元素的菠菜，清新口感。",
        stock: 150,
    },
    {
        name: "有机土豆",
        category: "蔬菜",
        price: 8,
        sales: 1800,
        trend: "上升",
        description: "高品质有机土豆，营养丰富。",
        stock: 300,
    },
    {
        name: "新鲜西红柿",
        category: "蔬菜",
        price: 15,
        sales: 700,
        trend: "平稳",
        description: "新鲜采摘的西红柿，口感丰富。",
        stock: 200,
    }
];

document.getElementById('apply-filters').addEventListener('click', function() {
    const category = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    // 根据选择的筛选条件更新数据表格
    filterAndSortData(category, sortBy);
});

function filterAndSortData(category, sortBy) {
    let filteredData = products;  // 假设 products 是包含所有产品的数组

    // 筛选
    if (category !== 'all') {
        filteredData = filteredData.filter(product => product.category === category);
    }

    // 排序
    if (sortBy === 'sales') {
        filteredData.sort((a, b) => b.sales - a.sales);
    } else if (sortBy === 'price') {
        filteredData.sort((a, b) => a.price - b.price);
    }

    // 更新表格
    updateDataTable(filteredData);
}

function updateDataTable(filteredData) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';  // 清空表格

    filteredData.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sales}</td>
            <td>${product.category}</td>
            <td>${product.trend}</td>
        `;
        tableBody.appendChild(row);
    });
}
function showSalesHistory() {
    document.getElementById('sales-history-modal').style.display = 'flex';
}

function showMarketInfo() {
    document.getElementById('market-info-modal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
