const calculateBmi = (height: number, weight: number): String => {
    const bmi = weight / (height * 0.01) / (height * 0.01)
    if (bmi < 18.5) {
        return 'Underweight (thinness)'
    } else if (bmi > 18.4 && bmi < 25) {
        return 'Normal (healthy weight)'
    } else if (bmi > 24.9 && bmi < 30) {
        return 'Overweight (pre-obese)'
    } else {
        return 'Obese'
    }
}

console.log(calculateBmi(180, 74))
