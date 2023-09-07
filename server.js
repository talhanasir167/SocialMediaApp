const express = require("express")
const app = new express();
const dotenv =  require('dotenv').config();
const connectPrisma = require("./prisma/testConnection");
const bodyParser =  require('body-parser');
const validateToken = require("./middleware/validateJwt");
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT

connectPrisma();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/general_routes/indexRoutes'))
app.use('/chat', require('./routes/chat_routes/chatRoutes'))
app.use('/userIndex', validateToken, require('./routes/user_routes/userIndexRoutes'));
app.use("/users", require('./routes/general_routes/userRoutes'))

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
});
