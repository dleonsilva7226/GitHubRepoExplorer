import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import { authRouter } from '../routes/authRoutes';
// import routes here

const PORT: number = parseInt(process.env.PORT || "8000", 10);
const app: Application = express();

//for middleware
app.use(cors());
app.use(express.json());

//auth routes
app.use('/auth', authRouter);

//user routes
// app.use('/user', userRouteHere);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});