export interface Meaning {
    tempId: number;
    [index: string]: string[] | number;
}

export interface IExample {
    temId: number;
    sentence: string;
    translation: string;
}