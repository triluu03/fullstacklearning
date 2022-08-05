import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (height === 0 || weight === 0 || !height || !weight) {
        res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    res.json({
        height,
        weight,
        bmi,
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(daily_exercises, Number(target));
        res.json(result);
    } catch (error) {
        res.status(400).send({ error: 'malformatted parameters' });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
