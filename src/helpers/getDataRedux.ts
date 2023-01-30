import { WordDb } from "../pages/types/word";


export const getWordsById = (words: WordDb[], arrIds: string[]) => {
    const rangeWords: WordDb[] = []
    
    arrIds.forEach(id => {
        const foundWord = words.find((w) => w.wordId === id)
        
        foundWord && rangeWords.push(foundWord)
    })

    console.log(rangeWords)

    return rangeWords
}
