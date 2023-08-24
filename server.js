const express = require("express")
const app = new express();
const dotenv =  require('dotenv').config();
const connectPrisma = require("./prisma/testConnection");
const bodyParser =  require('body-parser')

const PORT = process.env.PORT

connectPrisma();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));

app.use('/', require('./routes/indexRoutes'))
app.use("/users", require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

