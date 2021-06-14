let onlineList = document.querySelector('.online-list');

socket.emit("userConnected", userName);

socket.on("join", (obj) => {
    let joinDiv = document.createElement('div');
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent = `${obj.userName} joined the chat`;
    chatWindow.append(joinDiv);
    AddinOnlineList(obj);
})

socket.on("userDisconnected", (obj) => {
    let leftDiv = document.createElement('div');
    leftDiv.classList.add("chat");
    leftDiv.classList.add("leave");
    leftDiv.textContent = `${obj.userName} left the chat`;
    chatWindow.append(leftDiv);
    deleteFromOnlineList(obj.id);
})

socket.on("showChat", (userName, message) => {
    let chatDiv = document.createElement('div');
    chatDiv.classList.add('chat');
    chatDiv.classList.add('left');
    chatDiv.textContent = `${userName}` + " : " + `${message}`;
    chatWindow.append(chatDiv);
})

socket.on("online-list", (userList) => {
    for (let i = 0; i < userList.length; i++) {
        if(userList[i].id != socket.id) {
            let userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.setAttribute("id", userName[i].id);
            userDiv.innerHTML = ` <div class="user-image">
                                        <img src="./user.png" alt="">
                                    </div>
                                    <div class="user-name">${userList[i].userName}</div>`
            onlineList.append(userDiv);
        } 
    }
})

function deleteFromOnlineList(id) {
    // console.log(id);
    document.querySelector(`#${id}`).remove();
}

function AddinOnlineList(userObj) {
    let userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.setAttribute("id", userObj.id);
    userDiv.innerHTML = ` <div class="user-image">
                                <img src="./user.png" alt="">
                            </div>
                            <div class="user-name">${userObj.userName}</div>`
    onlineList.append(userDiv);
}