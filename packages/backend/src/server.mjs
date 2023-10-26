import express from 'express';
import weatherRouter from './routes/weather.mjs';

const app = express();
const PORT = 3000;

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
