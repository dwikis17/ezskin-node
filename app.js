import mongoose from 'mongoose';
import indexRoute from './routes/index.js'
import express from 'express'
import dotenv from 'dotenv'
import http from 'http'

dotenv.config();
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())

indexRoute(app)

mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running at port ${port}`))
export default app;