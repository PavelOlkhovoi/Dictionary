export const compoundWordsPosition = (words: string[], text: string) => {
    const mapIds: number[] = []

    text.split(' ').forEach((tw, idx) => words.some(w => w.split(' ').includes(tw) && mapIds.push(idx)))

    return mapIds
}

export const builtArrForDisplay = (words: string[],simple: string[], text: string) => {
    const mapIds: number[] = []

   const test = text.split(' ').map((tw, idx) => {

    if(words.some(w => w.split(' ').includes(tw))){
        return `<span blue>${tw}</span>`
    }
    if(simple.some(w => w.includes(tw))){
        return `<span yellow>${tw}</span>`
    }
        return `${tw}`
   })
    
    console.log(test)

    return test
}