export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 15) return 'Very severely underweight';
  else if (bmi < 16) return 'Severely underweight';
  else if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight';
  else if (bmi < 35) return 'Obese Class I (Moderately obese)';
  else if (bmi < 40) return 'Obese Class II (Severely obese)';
  else return 'Obese Class III (Very severely obese)';
};

interface Measurements {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Measurements => {
  if (args.length < 4) throw new Error('Not enought arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(' BMI Something went wrong, message: ', e.message);
}
