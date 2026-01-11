body {
    margin: 0;
    font-family: Arial;
    background: linear-gradient(135deg, #0a3d62, #1e90ff);
    color: white;
}

.hidden { display: none; }

.box {
    background: rgba(255,255,255,0.15);
    padding: 20px;
    margin: 30px auto;
    width: 320px;
    border-radius: 12px;
    text-align: center;
}

input, button {
    width: 95%;
    padding: 10px;
    margin: 6px;
    border-radius: 8px;
    border: none;
}

button {
    background: #0fbcf9;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 70px;
    height: 100%;
    background: #082b45;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar button {
    width: 50px;
    height: 50px;
    margin-top: 15px;
}

.content {
    margin-left: 90px;
    padding: 20px;
}

.product {
    background: rgba(255,255,255,0.2);
    padding: 12px;
    margin: 10px 0;
    border-radius: 8px;
}
