const socket = io('http://localhost:8000');
const form = document.getElementById('S-container');
const messageInp =  document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


let Name = prompt("Enter your name");
socket.emit('new-user-joined',Name);

const append =((message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    
})

socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You:  ${message}`,'right');
    socket.emit('send',message)
    messageInp.value = ''
})

socket.on('recieve',data=>{
    append(`${data.Name}: ${data.message}`,'left')
})

socket.on('left',Name=>{
    append(`${Name} left the chat`,'left');
})