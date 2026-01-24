import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from '../configs/db.js';

await connectDb();

const app = express();

const port = process.env.port || 3000 ;

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});