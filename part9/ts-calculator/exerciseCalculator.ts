export {};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((item) => item > 0).length;
  const success = !dailyExercises.some((item) => item < target);
  const average = dailyExercises.reduce((a, b) => a + b) / periodLength;

  let rating;
  let ratingDescription;

  if (average > target) {
    rating = 3;
    ratingDescription = 'Excellent job!';
  } else if (average > 0.8 * target) {
    rating = 2;
    ratingDescription = 'Well done, almost there!';
  } else {
    rating = 1;
    ratingDescription = 'Could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface ExercisesAndTarget {
  target: number;
  exercises: Array<number>;
}

const parseArguments = (args: Array<string>): ExercisesAndTarget => {
  if (args.length < 4) throw new Error('Not enought arguments');

  const target: number = Number(process.argv[2]);
  const exercises: Array<number> = process.argv
    .slice(3)
    .map((item) => Number(item));

  if (!isNaN(target) && !exercises.some((item) => isNaN(item))) {
    return {
      target,
      exercises,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, exercises } = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (e) {
  console.log('Something went wrong, message: ', e.message);
}
