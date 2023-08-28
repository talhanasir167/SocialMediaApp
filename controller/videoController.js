const { PrismaClient } = require('@prisma/client')
const prisma =  new PrismaClient();
const asyncHandler = require('express-async-handler')


const uploadVideo = asyncHandler(async(req,res) => {
  console.log("I'm in Video Upload")
})

module.exports = {
  uploadVideo
}