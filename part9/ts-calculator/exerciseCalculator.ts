interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Result => {
  if (!dailyExercises || !target) {
    throw new Error('parameters missing');
  }

  if (isNaN(target) || dailyExercises.some((item: number) => isNaN(item))) {
    throw new Error('malformatted parameters');
  }

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
