const express = require("express")
const app = new express();
const dotenv =  require('dotenv').config();
const connectPrisma = require("./prisma/testConnection");
const bodyParser =  require('body-parser');
const validateToken = require("./middleware/validateJwt");

const PORT = process.env.PORT

connectPrisma();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));

app.use('/', require('./routes/indexRoutes'))
app.use('/userIndex', validateToken, require('./routes/userIndexRoutes'));
app.use("/users", require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

