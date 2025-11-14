import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import { authRouter } from '../routes/authRoutes';
import { userRouter } from '../routes/userRoutes';

const PORT: number = parseInt(process.env.PORT || "8000", 10);
const app: Application = express();

//for middleware
app.use(cors());
app.use(express.json());

//auth routes
app.use('/auth', authRouter);
//user routes - Note: frontend calls /favorite-repos, so we mount userRouter at root
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});