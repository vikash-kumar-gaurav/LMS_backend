import express, { Response, Request } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.route'
import courseRouter from './routes/course.route'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1',userRouter)
app.use('/api/v1',courseRouter)

app.get('/', (req:Request, res:Response) => {
    console.log("i get a request")
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});