import { Timestamp } from "firebase/firestore";

export interface Meaning {
    tempId: number;
    [index: string]: string[] | number ;
}

export interface MeanigsForServer {
    [index: string]: string[]
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
    uid: string;
    wordId?: string;
    word: string;
    createdAt: Timestamp | string;
    repeat: boolean;
    meaning: MeanigsForServer;
    priority: string;
    points: number;
    level: string;
    examples: ExampleForServer[]
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
    name: string
    uid: string
    createdAt: Timestamp | string
    textsIds?: string[] | null
    sourse?: string | null
}