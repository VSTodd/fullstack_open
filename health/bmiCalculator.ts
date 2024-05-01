interface TwoNums {
  cm: number;
  weight: number;
}

const calculateBmi = (cm: number, weight: number) : string => {
  const height = cm / 100 
  const BMI = weight / height**2

  if (BMI < 18.5) {
    return "Abnormal (Underweight)"
  } else if (BMI < 25) {
    return "Normal (Healthy weight)"
  } else if (BMI < 30) {
    return "Abnormal (Overweight)"
  } else {
    return "Abnormal (Obesity)"
  }
}

const parseArguments = (args: string[]): TwoNums => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
try {
  const { cm, weight } = parseArguments(process.argv);
  console.log(calculateBmi(cm, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
