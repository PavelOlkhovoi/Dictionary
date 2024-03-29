import { Timestamp } from "firebase/firestore";

export interface Meaning {
    tempId: number;
    [index: string]: string[] | number ;
}

export interface MeanigsForServer {
    partOfSpeech: PartOfSpeechSelect,
    translation: string[]
}

export interface ExampleForServer {
    example: string;
    translation: string;
}

export interface InputExamples {
    example: string;
    translation: string;
    temId: number;
}

export interface ISingleWord {
    name: string;
    temId: number;
}

export interface WordDb {
    uid: string
    wordId?: string
    word: string
    createdAt: Timestamp | string
    repeat: boolean;
    meaning: AdvanceMeanings
    fastMeaning: string
    priority: string
    points: number
    level: string
    examples: ExampleForServer[],
    repetition?: Repetition
}

export interface Tag {
    name: string
    tagId: string
    userId: string
    word_id: string[]
}

export interface Text {
    title: string
    text: string
    textId: string
    wordsIds: string[]
    uid: string
}

export interface AllWordsSorted {
    word: string
    wordId: string
    color: string
    show: Boolean,
    position: number[]
}

export interface Set {
    setId?: string
    wordsIds: string[]
    repeatIds: string[]
    name: string
    uid: string
    createdAt: Timestamp | string
    textIds: string[] | null
    source?: string | null
}

export interface Repetition {
    firstRepetition: boolean,
    secondRepetition: boolean,
    thirdRepetition: boolean,
    fourthRepetition: boolean,
    fifthRepetition: boolean,
    sixthRepetition: boolean,
    seventhRepetition: boolean
}

export type TypeOfExercise = 'firstRepetition' | 'secondRepetition' | 'thirdRepetition' | 'thirdRepetition' | 
'fourthRepetition' | 'fifthRepetition' | 'sixthRepetition' | 'seventhRepetition'



export interface ExampleForm {
    id: string;
    example: string;
    translation: string;
    show: boolean
}

export interface TagForm {
    id: string
    name: string
    show: boolean
}

export interface AddedTagForm {
    id: string
    tagId: string
    name: string
    show: boolean
}

export interface IsFormReady {
    word: boolean,
    meaning: boolean
} 


export type PartOfSpeechSelect = 'none' | 'adjective' | 'verb' | 'noun' | 'phrasal verb' | 'preposition' | 'conjunctions' | 'adverb'

export type AdvanceMeaningsBack = Record<PartOfSpeechSelect, {translation: string[]}>
export type AdvanceMeaningsForm = Record<PartOfSpeechSelect, {id: string, partOfSpeech: PartOfSpeechSelect, translation: string[], show: boolean}>

export type AdvanceMeanings =  Partial<AdvanceMeaningsBack>

export type MeaningForm = Partial<AdvanceMeaningsForm>

export type DeleteBtnIds = {idMain: string, idEmbedded?: string}
