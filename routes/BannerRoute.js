import express from 'express';
import GameController from "../controller/GameController.js";
import multer from 'multer'
import { verifyToken } from '../Middleware/Verify.js';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const BannerRoute = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'banner/')
    },
    filename: function (req, file, cb) {

        cb(null, req.body.name + path.extname(file.originalname));
      }
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ storage: storage });



BannerRoute.post('/upload',verifyToken, upload.single('image'), (req, res) => {
    const filePath = path.join(__dirname, 'banner', req.body.name + path.extname(req.file.originalname));

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

    res.status(200).json({message:'upload success'})
  });

BannerRoute.get('/', (req,res) => {
  const images = fs.readdirSync('banner');
  const imageUrls = images.map(img => `/image-banner/${img}`);
  res.send({imageUrls});
})


export default BannerRoute;