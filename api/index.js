import mongoose from 'mongoose';
import indexRoute from '../routes/index.js'
import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from "cors";
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content- Type, Accept");
  next();
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(cors({credentials: true, origin:'https://final-thesis-rhbkkkl2q-dwikis17.vercel.app'}));
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/uploads')));
app.get('/uploads/:name', function(req, res) {
  const {name} = req.params
  let indexPath = path.join(__dirname, `../uploads/${name}`);
  console.log(name,' nameee')
  console.log(indexPath,' nameees')
  res.sendFile(indexPath);

});
indexRoute(app)

mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

const port = process.env.PORT || 80;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running at port ${port}`))

export default app;