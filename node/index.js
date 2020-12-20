
const io = require('socket.io')(8000);
const user = {}

io.on('connection',socket=>{
    socket.on('new-user-joined',Name=>{
        // console.log("new-user",Name)
        user[socket.id]=Name;
        socket.broadcast.emit('user-joined',Name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,Name:user[socket.id]});
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id]
    })
    
})