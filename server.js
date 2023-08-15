const express = require("express")
const app = new express();
const dotenv =  require('dotenv').config();
const connectPrisma = require("./prisma/testConnection");


const PORT = process.env.PORT

connectPrisma();

app.use(express.json());


app.get('/', (req,res) => {
  res.send("hello")
})

app.use("/users", require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

