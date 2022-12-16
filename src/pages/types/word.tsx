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

// export type SingleWordForServer {
//     name: string;
// }