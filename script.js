// ADMIN
const ADMIN_NAME = "Červeňák Dominik";
const ADMIN_PASS = "Dominik2014";

let users = JSON.parse(localStorage.getItem("users")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let currentUser = null;
let isAdmin = false;

// REGISTRACE
function register() {
    const name = regName.value;
    const pass = regPass.value;

    if (!name || !pass) {
        msg.innerText = "Vyplň registrační údaje!";
        return;
    }

    if (users.find(u => u.name === name)) {
        msg.innerText = "Uživatel už existuje!";
        return;
    }

    users.push({name, pass});
    localStorage.setItem("users", JSON.stringify(users));
    msg.innerText = "Registrace úspěšná!";
}

// LOGIN
function login() {
    const name = loginName.value;
    const pass = loginPass.value;

    if (name === ADMIN_NAME && pass === ADMIN_PASS) {
        isAdmin = true;
    } else {
        const user = users.find(u => u.name === name && u.pass === pass);
        if (!user) {
            msg.innerText = "Špatné přihlašovací údaje!";
            return;
        }
    }

    currentUser = name;
    authBox.classList.add("hidden");
    app.classList.remove("hidden");

    if (isAdmin) {
        addBtn.classList.remove("hidden");
        ordersBtn.classList.remove("hidden");
    }

    renderProducts();
    checkDelivery();
}

// PRODUKTY
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

// ADMIN - PŘIDÁNÍ
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

// OBJEDNÁNÍ
function order(item) {
    orders.push({user: currentUser, item});
    localStorage.setItem("orders", JSON.stringify(orders));
    info.innerText = "Objednávka odeslána!";
}

// ADMIN – OBJEDNÁVKY
function showOrders() {
    ordersBox.classList.remove("hidden");
    ordersList.innerHTML = "";

    orders.forEach((o, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            ${o.user} – ${o.item}
            <button onclick="deleteOrder(${i})">Vymazat</button>
        `;
        ordersList.appendChild(div);
    });
}

// SMAZÁNÍ OBJEDNÁVKY
function deleteOrder(i) {
    const user = orders[i].user;
    orders.splice(i, 1);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("delivery_" + user, "true");
    showOrders();
}

// ZPRÁVA O DORUČENÍ
function checkDelivery() {
    if (localStorage.getItem("delivery_" + currentUser)) {
        let sec = 5;
        info.innerText = `Vaše objednávka bude zítra doručena! (${sec})`;

        const timer = setInterval(() => {
            sec--;
            info.innerText = `Vaše objednávka bude zítra doručena! (${sec})`;
            if (sec === 0) {
                clearInterval(timer);
                info.innerText = "";
                localStorage.removeItem("delivery_" + currentUser);
            }
        }, 1000);
    }
}
