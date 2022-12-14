export interface Meaning {
    tempId: number;
    [index: string]: string[] | number ;
}

export interface GruopedMeaning {
    tempId: number;
    [index: string]: string[] | number;
}

export interface IExample {
    temId: number;
    sentence: string;
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