// 初始农产品信息
const products_ = {
    "苹果": "·产品名称: 红富士苹果 (Red Fuji Apple)<br>·来源地: 中国陕西省渭南市<br>·种植方式: 采用无公害绿色农业种植方式，使用天然肥料和生物防治技术，避免使用化学农药。",
    "香蕉": "·产品名称: 卡文迪什香蕉 (Cavendish Banana)<br>·来源地: 菲律宾<br>·种植方式: 采用可持续种植模式，禁止使用高危农药，确保生态环境和农民健康。",
    "胡萝卜": "·产品名称: 有机胡萝卜 (Organic Carrot)<br>·来源地: 美国加利福尼亚州<br>·种植方式: 100%有机种植，不使用化学肥料和农药，种植过程中注重土壤健康。"
};

// 追溯查询按钮点击事件
document.getElementById('traceButton').addEventListener('click', () => {
    const product = document.getElementById('product').value;  // 获取选择的农产品
    const purchaseDate = document.getElementById('purchaseDate').value;  // 获取购买日期
    const info = products_[product] || '无信息';  // 获取对应的农产品信息

    // 确保查询到信息后进行显示
    if (info === '无信息' && product) {
        document.getElementById('result').innerHTML =
            `<strong>错误：</strong> 该农产品暂无追溯信息。<br>购买时间: ${purchaseDate}`;
    } else if (product) {
        document.getElementById('result').innerHTML =
            `追溯信息: ${info}<br>购买时间: ${purchaseDate}`;
    } else {
        document.getElementById('result').innerHTML =
            `<strong>错误：</strong> 请先选择一个农产品。`;
    }
});

// 添加新农产品信息
document.getElementById('addProductButton').addEventListener('click', () => {
    const newProduct_ = document.getElementById('newProduct').value;  // 新农产品名称
    const newInfo = document.getElementById('newInfo').value;  // 新农产品信息

    if (newProduct_ && newInfo) {
        products_[newProduct_] = newInfo;  // 添加到产品信息中

        // 更新下拉选择框（“更新农产品信息”）
        const updateProductSelect = document.getElementById('updateProduct');
        const option = document.createElement('option');
        option.value = newProduct_;
        option.text = newProduct_;
        updateProductSelect.add(option);

        // 更新下拉选择框（“追溯查询”）
        const productSelect = document.getElementById('product');
        const newOption = document.createElement('option');
        newOption.value = newProduct_;
        newOption.text = newProduct_;
        productSelect.add(newOption);

        alert('添加成功！');
    } else {
        alert('请填写农产品名称和信息！');
    }
});

// 更新农产品信息
document.getElementById('updateProductButton').addEventListener('click', () => {
    const updateProduct = document.getElementById('updateProduct').value;  // 选择更新的农产品
    const updateInfo = document.getElementById('updateInfo').value;  // 更新的农产品信息

    if (updateProduct && updateInfo) {
        products_[updateProduct] = updateInfo;  // 更新产品信息
        alert('更新成功！');
    } else {
        alert('请选择农产品并填写新信息！');
    }
});