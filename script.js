// předvytvořený účet
const admin = {
    name: "Červeňák",
    pass: "Dominik2014"
};

let currentUser = null;
let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// LOGIN
function login() {
    const name = loginName.value;
    const pass = loginPass.value;

    if (!name || !pass) {
        loginMsg.innerText = "Vyplňte údaje!";
        return;
    }

    currentUser = name;

    loginBox.classList.add("hidden");
    app.classList.remove("hidden");

    if (name === admin.name && pass === admin.pass) {
        addBtn.classList.remove("hidden");
        ordersBtn.classList.remove("hidden");
    }

    renderProducts();
}

// ADD ITEM
function showAdd() {
    addBox.classList.remove("hidden");
}

function addItem() {
    const name = itemName.value;
    if (!name) return;

    products.push(name);
    localStorage.setItem("products", JSON.stringify(products));

    addBox.classList.add("hidden");
    itemName.value = "";
    renderProducts();
}

// PRODUCTS
function renderProducts() {
    productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            ${p}
            <button onclick="order('${p}')">Objednat</button>
        `;
        productsDiv.appendChild(div);
    });
}

// ORDER
function order(item) {
    orders.push({user: currentUser, item});
    localStorage.setItem("orders", JSON.stringify(orders));
    message.innerText = "Objednáno!";
}

// ADMIN ORDERS
function showOrders() {
    ordersBox.classList.remove("hidden");
    const list = document.getElementById("ordersList");
    list.innerHTML = "";

    orders.forEach((o, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            ${o.user} – ${o.item}
            <button onclick="deleteOrder(${i})">Vymazat</button>
        `;
        list.appendChild(div);
    });
}

// DELETE ORDER
function deleteOrder(i) {
    const user = orders[i].user;
    orders.splice(i, 1);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("notify_" + user, "true");
    showOrders();
}

// DELIVERY MESSAGE
window.onload = () => {
    const notify = localStorage.getItem("notify_" + currentUser);
    if (notify) {
        let sec = 5;
        message.innerText = `Vaše objednávka bude zítra doručena! (${sec})`;
        const int = setInterval(() => {
            sec--;
            message.innerText = `Vaše objednávka bude zítra doručena! (${sec})`;
            if (sec === 0) {
                clearInterval(int);
                message.innerText = "";
                localStorage.removeItem("notify_" + currentUser);
            }
        }, 1000);
    }
};
