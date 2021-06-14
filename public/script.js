let chatInput = document.querySelector(".message");
let chatWindow = document.querySelector(".chat-window");
let myName = document.querySelector(".me .user-name");
let userName = prompt("Enter Your Name : ");

myName.textContent = userName;

chatInput.addEventListener("keypress", (event) => {
    if(event.key == "Enter" && chatInput.value) {
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('chat');
        messageDiv.classList.add('right');
        messageDiv.textContent = chatInput.value;
        chatWindow.append(messageDiv);
        chatInput.value = "";
        socket.emit("sentMessage", messageDiv.textContent, userName);
    }
})