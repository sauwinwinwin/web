const products = [
    {
        name: "有机苹果",
        image: "https://img1.baidu.com/it/u=693233453,2282138752&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=800",
        price: 20,
        description: "新鲜采摘的有机苹果，味道甜美。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "新鲜香蕉",
        image: "https://img1.baidu.com/it/u=3912046021,1923310249&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        price: 15,
        description: "成熟的香蕉，口感柔软，甜而不腻。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "多汁橙子",
        image: "https://img1.baidu.com/it/u=3208833006,1105418846&fm=253&fmt=auto&app=138&f=JPEG?w=457&h=304",
        price: 18,
        description: "新鲜橙子，果汁丰富，口感清新。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "绿色奇异果",
        image: "https://img95.699pic.com/xsj/1g/zq/fe.jpg%21/fh/300",
        price: 25,
        description: "天然绿色奇异果，富含维生素C，口感酸甜。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "甜蜜葡萄",
        image: "https://img1.baidu.com/it/u=1781099086,91787671&fm=253&fmt=auto&app=138&f=PNG?w=607&h=405",
        price: 25,
        description: "选用新鲜葡萄，果实饱满，香甜可口，口感极佳。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "香甜芒果",
        image: "http://www.jisuzhileng.com/uploadfile/20191206/1575604849192452.jpg",
        price: 30,
        description: "选自优质芒果，果肉细腻，甜美多汁，带来热带风情的美味体验。",
        stock: 100,
        sales: 150,
        quantity: 0
    },
    {
        name: "清新西瓜",
        image: "https://img2.baidu.com/it/u=1542526505,3416394821&fm=253&fmt=auto&app=138&f=JPEG?w=428&h=285",
        price: 20,
        description: "水分充足，口感清爽，每一口都带来满满的清凉感，适合夏日解暑。",
        stock: 100,
        sales: 150,
        quantity: 0
    } 
];

let currentPage = 0;
const productsPerPage = 4;  // 每页展示多少个产品

// 渲染产品列表
function renderProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';  // 清空容器

    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;
    const productsToDisplay = products.slice(start, end);  // 获取当前页需要显示的产品

    // 创建并展示产品
    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p style="font-size: 18px;">${product.description}</p>
            <br>
            <p>价格: <strong>￥${product.price}</strong></p>
        `;
        productContainer.appendChild(productItem);
    });

    updatePagination();  // 更新分页按钮状态
}

// 切换页数（横向滚动）
function changePage(direction) {
    const productContainer = document.getElementById('product-container');
    const productWidth = document.querySelector('.product-item').offsetWidth + 20;  // 计算每个产品的宽度（包括间隙）

    let scrollToPosition = currentPage * productsPerPage * productWidth;

    if (direction === 'prev' && currentPage > 0) {
        currentPage--;
        scrollToPosition = currentPage * productsPerPage * productWidth;  // 更新滚动位置
    } else if (direction === 'next' && (currentPage + 1) * productsPerPage < products.length) {
        currentPage++;
        scrollToPosition = currentPage * productsPerPage * productWidth;  // 更新滚动位置
    }

    // 确保平滑滚动，使用 scrollTo 方法
    productContainer.scroll({
        left: scrollToPosition,
        behavior: 'smooth'  // 平滑滚动
    });

    renderProducts();  // 渲染当前页的产品
}


// 更新分页按钮状态
function updatePagination() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const end = (currentPage + 1) * productsPerPage;

    prevButton.classList.toggle('disabled', currentPage === 0);
    nextButton.classList.toggle('disabled', end >= products.length);  // 判断是否为最后一页
}

// 添加新产品的函数
function addProduct_() {
    const name = document.getElementById('product-name').value.trim();
    const image = document.getElementById('product-image').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value.trim();

    // 验证输入
    if (!name || !image || !price || !description) {
        alert('请填写所有字段!');
        return;
    }

    // 创建新产品对象
    const newProduct = {
        name: name,
        image: image,
        price: price,
        description: description
    };

    // 将新产品添加到产品数组中
    products.push(newProduct);

    // 清空表单字段
    document.getElementById('product-name').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-description').value = '';

    // 隐藏添加产品表单
    hideAddProductForm();

    // 重新渲染产品列表
    renderProducts();
}

// 显示添加产品表单
function showAddProductForm() {
    document.getElementById('add-product-form').style.display = 'block';
}

// 隐藏添加产品表单
function hideAddProductForm() {
    document.getElementById('add-product-form').style.display = 'none';
}
renderProducts();


function makePayment() {
    const totalPrice = parseFloat(document.getElementById('total-price').innerText.replace('￥', '')); // 获取总价格
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value; // 获取选择的支付方式
    const loggedInUserEmail = localStorage.getItem('loggedInUser'); // 获取当前已登录用户的邮箱
    if (!loggedInUserEmail) {
        alert('请先登录！');
        return;
    }
    const user = JSON.parse(localStorage.getItem(loggedInUserEmail)); // 获取登录用户的数据
    if (paymentMethod === 'wechat') {
        // 使用微信支付
        document.getElementById('wechat-pay-modal').style.display = 'block'; // 显示微信支付弹窗
        document.getElementById('checkout-modal').style.display = 'none'; // 隐藏结算弹窗
    } else if (paymentMethod === 'points') {
        // 使用积分支付
        if (totalPrice > user.points) {
            alert('积分不足！当前积分为: ' + user.points); // 提示积分不足
        } else {
            user.points -= totalPrice; // 扣减用户积分
            localStorage.setItem(loggedInUserEmail, JSON.stringify(user)); // 更新用户数据到 localStorage

            // 更新页面上的积分显示
            //document.getElementById('profile-points').textContent = user.points; // 在个人中心显示积分

            alert('支付成功！剩余积分: ' + user.points);
            checkoutSuccess(); // 结算成功后的其他逻辑（如跳转页面或更新购物车状态）
        }
    }
}



// 渲染产品列表
function renderProducts2() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // 清空产品列表

    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.name}" width="100" style="margin: 10px 10px;">
                <div class="product-details">
                    <h2 onclick="showProductDetails(${index})">${product.name}</h2>
                    <p style="margin: 5px;font-size: 15px;">价格: ￥${product.price}</p>
                    <label>选择数量:
                        <input type="number" value="${product.quantity}" min="0" max="${product.stock}" onchange="updateQuantity(${index}, this.value)">
                    </label>
                </div>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

// 更新产品数量
function updateQuantity(index, quantity) {
    products[index].quantity = parseInt(quantity);
    calculateTotal();
}

// 计算总价
function calculateTotal() {
    let total = 0;
    products.forEach(product => {
        total += product.price * product.quantity;
    });
    document.getElementById('total-price').innerText = `￥${total.toFixed(2)}`;  // 更新总价格
}


function showCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutProducts = document.getElementById('checkout-products');

    // 清空已选择的产品列表
    checkoutProducts.innerHTML = ''; 

    // 渲染结算的产品列表
    products.forEach(product => {
        if (product.quantity > 0) {
            checkoutProducts.innerHTML += `
                <p>${product.name} x ${product.quantity} - ￥${(product.price * product.quantity).toFixed(2)}</p>
            `;
        }
    });

    // 计算总价格并显示
    calculateTotal();

    // 获取当前已登录的用户邮箱
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('请先登录！');
        return;
    }

    // 从 localStorage 获取当前登录的用户数据
    const user = JSON.parse(localStorage.getItem(loggedInUserEmail));

    if (user) {
        // 显示用户积分
        const pointsInfo = document.getElementById('points-info');
        const pointsDisplay = document.getElementById('current-points');
        pointsDisplay.textContent = user.points;

        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        if (paymentMethod === 'points') {
            pointsInfo.style.display = 'block';
        } else {
            pointsInfo.style.display = 'none';
        }
    } else {
        alert('用户信息加载失败，请重新登录！');
        showLoginForm(); // 显示登录表单
    }

    // 显示结算弹窗
    checkoutModal.style.display = 'block';
}

// 关闭结算弹窗
function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// 关闭微信支付弹窗
function closeWechatModal() {
    document.getElementById('wechat-pay-modal').style.display = 'none';
}


// 结算成功，清空购物车和相关信息
function checkoutSuccess() {
    products.forEach(product => {
        product.quantity = 0;  // 重置所有产品的数量
    });
    calculateTotal();  // 重新计算总价
    renderProducts2();  // 重新渲染产品列表，更新数量
    currentPage = 0; // 重置当前页
    renderProducts();  // 更新产品展示
    document.getElementById('checkout-modal').style.display = 'none';
}


// 微信支付成功
function confirmWechatPayment() {
    alert('支付成功！');
    document.getElementById('wechat-pay-modal').style.display = 'none';
}


// 取消支付
function cancelPayment() {
    const cancelPaymentModal = document.getElementById('cancel-payment-modal');
    cancelPaymentModal.style.display = 'block';
}

// 确定取消支付
function confirmCancelPayment() {
    document.getElementById('cancel-payment-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'none';
}

// 关闭取消支付弹窗
function closeCancelPaymentModal() {
    document.getElementById('cancel-payment-modal').style.display = 'none';
}

// 显示产品详细信息
function showProductDetails(index) {
    const product = products[index];
    alert(`产品名称: ${product.name}\n库存: ${product.stock}\n销量: ${product.sales}\n单价: ￥${product.price}`);
}

// 初始化页面
renderProducts2();
