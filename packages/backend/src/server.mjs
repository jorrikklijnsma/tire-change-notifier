import express from 'express';
import weatherRouter from './routes/forecast.mjs';

const app = express();
const PORT = 3000;

app.use('/api/', weatherRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
