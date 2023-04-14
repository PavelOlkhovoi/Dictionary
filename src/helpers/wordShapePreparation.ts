import { AdvanceMeaningsBack, ExampleForServer, WordDb } from "../types/word"
import { serverTimestamp, Timestamp} from "firebase/firestore";

export const newWordShape = (
    uid: string, 
    word: string, 
    main: string,
    translation?: AdvanceMeaningsBack | null,
    examples?: ExampleForServer[]
    ) => {
    const newWord: WordDb = {
        uid,
        word,
        meaning: translation ? translation : {none: {translation: []}},
        fastMeaning: main,
        examples: examples ? examples : [],
        level: 'low',
        points: 0,
        priority: 'low',
        repeat: true,
        createdAt: serverTimestamp() as Timestamp,
        repetition: {
            firstRepetition: false,
            secondRepetition: false,
            thirdRepetition: false,
            fourthRepetition: false,
            fifthRepetition: false,
            sixthRepetition: false,
            seventhRepetition: false
        }
    }

    return newWord

}