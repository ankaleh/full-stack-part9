export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ValidArgs {
    array: Array<number>;
    value: number;
}

const parseArguments = (args: Array<string>): ValidArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const arrayOfNumbers: Array<number> = [];

    let arrayIndex = 0;
    for (let i = 3; i<args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            arrayOfNumbers[arrayIndex] = Number(args[i]);
            arrayIndex++;
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }

    if (!isNaN(Number(args[2]))) {
      return {
        array: arrayOfNumbers,
        value: Number(args[2])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
export const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(e => e > 0).length;
    const average: number = hours.reduce((sum, element) => {
       return sum + element;}, 0) 
       / periodLength;
    
    const checkSuccess = () => {
        if (average >= target) {
        return true;
        }
        return false;
    };
    const success = checkSuccess();

    const rate = () => {
        if (average>=target) {
            return 3;
        } else if (average<target && average>(target/2)) {
            return 2;
        } else {
            return 1;
        }
    };

    const rating = rate();

    const describe = () => {
        if (rating===3) {
            return 'Well done!';
        } else if (rating===2) {
            return 'Not too bad but could be better!';
        } else {
            return 'Try more!';
        }
    };

    const ratingDescription = describe();


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average

    };
};
/* const target: number = Number(process.argv[2]);

const array: Array<number> = [];

let arrayIndex = 0;
for (let i = 3; i<process.argv.length; i++) {
    array[arrayIndex] = Number(process.argv[i])
    arrayIndex++;
}; */

//calculateExercises(array, target);

try {
    const args = parseArguments(process.argv);
    console.log(calculateExercises(args.array, args.value));
} catch (e) {
    console.log('Error: ', e.message);
}
