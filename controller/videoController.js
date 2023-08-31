const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')
const multer = require('multer')

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  console.log("I'm in Video Upload")
  console.log(req.file)

  const uploaderId = req.user.id;

  const newVideo = await prisma.video.create({
    data: {
      title,
      description,
      filePath: req.file.path,
      uploader: {
        connect: { id: uploaderId },
      },
    },
  });

  if (newVideo) {
    console.log('Video uploaded:', req.file.filename);
    return res.redirect('/userIndex/redirect-to-video');
  } else {
    res.status(500).send("Video Uploading issue");
  }

})

const redirectToVideo = asyncHandler(async(req,res) => {
    const userVideos = await prisma.video.findMany({
      where: {
        uploaderId: req.user.id,
      }
    })
  res.render('video', { videos: userVideos });
})

module.exports = {
  uploadVideo,
  redirectToVideo
}