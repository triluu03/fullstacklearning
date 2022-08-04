interface Information {
    height: number
    weight: number
}

const parseArguments = (args: Array<string>): Information => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        }
    } else {
        throw new Error('Provided values were not numbers')
    }
}

const calculateBmi = (height: number, weight: number): string => {
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

try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += 'Error' + error.message
    }
    console.log(errorMessage)
}
