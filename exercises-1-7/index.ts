import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json()); //expressin json-parseri muuttaa req.bodyn JS-olioksi

const parseParameter = (array: Array<string>): Array<number>  => {
    const arrayOfNumbers: Array<number> = [];
    let arrayIndex = 0;
    for (let i = 0; i<array.length; i++) {
        arrayOfNumbers[arrayIndex] = Number(array[i]);
        arrayIndex++;
    }

    return arrayOfNumbers;
};

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    if (!isNaN(height) && !isNaN(weight)) {
        console.log(calculateBmi(height, weight));
        return res.json({
            height,
            weight,
            bmi: bmi
        
        });
    } else {
        return (
        res.status(400).json({
            error: "malformatted parameters"
        })
        );
    }
    
});

app.post('/exercise-calculator', (req, res) => {
    const body = req.body;
    const array = body.daily_exercises;
    if (array) {
        parseParameter(array);
    }
    
    const target = body.target;

    if (array===undefined || target===undefined) {
        return (
            res.status(400).json({
                error: "parameters missing"
              })
        );
        
    } else if (parseParameter(array).includes(NaN) || isNaN(target)) {
        return (
            res.status(400).json({
                error: "malformatted parameters"
              })
        );
        
    } else {
        const result = calculateExercises(array, target);
        return res.json(result);
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

