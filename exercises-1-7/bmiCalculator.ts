interface ValidArguments {
    value1: number;
    value2: number;
}

const parseArgs = (args: Array<string>): ValidArguments => {
    const value1 = Number(args[2]);
    const value2 = Number(args[3]);

    return {
        value1,
        value2
    };
};

export const calculateBmi = (height: number, weight:  number): string => {
    const bmi: number = weight/((height/100.0)*(height/100.0));

    if (bmi<=18.5) {
        return 'Underweight';
    } else if (bmi>=25) {
        return 'Overweight';
    } else if (bmi>=30) {
        return 'Obese';
    } else {
        return 'Normal (healthy weight)';
    }
    

};

try {
    const args = parseArgs(process.argv);
    console.log(calculateBmi(args.value1, args.value2));

} catch (e) {
    console.log('Error: ', e.message);
}

/* const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight)); */