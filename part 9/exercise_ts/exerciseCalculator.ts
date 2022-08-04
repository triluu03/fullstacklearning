interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
