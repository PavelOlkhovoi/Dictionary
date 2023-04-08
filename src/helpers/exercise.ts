import { TypeOfExercise } from "../types/word"

export const defineTypeOfExercise = (exType: string) => {
    if(exType === '1'){
        return "firstRepetition" as TypeOfExercise
    }else if (exType === '2'){
        return "secondRepetition" as TypeOfExercise
    }else if (exType === '3'){
        return "thirdRepetition" as TypeOfExercise
    }else if (exType === '4'){
        return "fourthRepetition" as TypeOfExercise
    }else if (exType === '5'){
        return "fifthRepetition" as TypeOfExercise
    }else if (exType === '6'){
        return "sixthRepetition" as TypeOfExercise
    }else if (exType === '7'){
        return "seventhRepetition" as TypeOfExercise
    }
}