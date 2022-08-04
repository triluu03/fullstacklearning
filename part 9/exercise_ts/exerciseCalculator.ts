interface Input {
    target: number
    record: Array<number>
}

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const parseInput = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments')

    let target: number

    if (!isNaN(Number(args[2]))) {
        target = Number(args[2])
    } else {
        throw new Error('Provided values were not numbers!')
    }

    let record: Array<number> = []
    let i = 3

    while (i < args.length) {
        if (!isNaN(Number(args[i]))) {
            record.push(Number(args[i]))
            i++
        } else {
            throw new Error('Provided values were not numbers!')
        }
    }

    return {
        target,
        record,
    }
}

const calculateExercises = (record: Array<number>, target: number): Result => {
    const periodLength = record.length
    const trainingDays = record.filter((day) => day !== 0).length

    const sum = record.reduce((a, b) => a + b)
    const average = sum / periodLength
    const success = average >= target

    let rating
    if (success) {
        rating = 3
    } else {
        if (average > 1) {
            rating = 2
        } else {
            rating = 1
        }
    }

    let ratingDescription
    if (rating === 3) {
        ratingDescription = 'you have met your target exercise hours'
    } else if (rating === 2) {
        ratingDescription = 'not too bad but could be better'
    } else {
        ratingDescription = 'you have not exercised at all'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

try {
    const { target, record } = parseInput(process.argv)
    console.log(calculateExercises(record, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}
