interface exerciseLog { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface DaysAndTarget {
  days: number[],
  target: number
}

const determineRating = (target: number, average: number) : number => {
  if (average >= target) {
    return 3;
  } else if (average >= target / 2) {
    return 2;
  } else {
    return 1;
  }
}

const determineDescription = (rating: number) : string => {
  switch(rating) {
    case 1:
      return "Ouch, lots of room for improvement";
      break;
    case 2: 
      return "Not too bad but could be better";
      break;
    case 3:
      return "Great job, you reached your goal!"
  } 
}

const calculateExercises = (days: number[], target: number) : exerciseLog => {
  const periodLength = days.length;
  const trainingDays = days.filter(day => day > 0).length;
  const average = days.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = determineRating(target, average);
  const ratingDescription = determineDescription(rating)

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average}
}

const parseArgs = (args: string[]) : DaysAndTarget => {
  const length = args.length;
  if (length < 2) throw new Error('Not enough arguments');

  if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
    return {
      days: (args.slice(3).map(arg => Number(arg) as number)),
      target: Number(args[2])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { days, target } = parseArgs(process.argv);
  console.log(calculateExercises(days, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));