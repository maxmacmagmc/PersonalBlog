import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.mjs';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());


app.use('/', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
