
export const checkString = (words: string[], text: string) => {
    const res = [] as string[]
    const wordArr = text.split(' ')
    const ifWordUsed = words.forEach(word => {
        wordArr.forEach(textwORD => {
            textwORD === word && res.push(word)
        } )
    })
    return res
}

export const ifCompoundWords = (text: string, words: string[]) => {
    const arrText = text.split(' ')
    const position: number[] = []

    arrText.forEach((wordText, idx) => {
        words.forEach(word => {
            if(word.split(' ').includes(wordText)){
                position.push(idx)
            }
        })
    })

    return position
}


export const ifSimpleWords = (text: string, words: string[]) => {
    const arrText = text.split(' ')
    const color: string[] = []

    arrText.forEach(w => {
        if(words.includes(w)){
            color.push(w)
            return color
        }
    })

    return color.length > 0 ? color : null
}
