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

export const matchWordsByTest = (words: string[], text: string) => {
    const res: Boolean[] = []
    words.forEach(w => {
        const pattern = new RegExp(w);
        // console.log(pattern.toString())

        if(pattern.test(text)){
            res.push(true)
        }else {
            res.push(false)
        }
    })

    return res

}

interface WordWatcher {
    exist: Boolean
    word: string
}

export const matchCompoundWords = (words: string[], text: string) => {
    const res: WordWatcher[] = []

    words.forEach(w => {

        if(w.split(' ').every(word =>text.includes(word))){
            res.push({
                exist: true,
                word: w
            })
        }else {
            res.push({
                exist: false,
                word: w
            })
        }
    })

    return res
}

interface AllWordWatcher {
    exist: Boolean
    word: string
    color: string
}

export const sortSimpleAndCompoundWords = (words: string[], text: string) => {
    const res: AllWordWatcher[] = []

    words.forEach(w => {

        if(w.split(' ').length > 1 && w.split(' ').every(word =>text.includes(word))){
            res.push({
                exist: true,
                word: w,
                color: 'blue',
            })
        }

        else if(text.includes(w)){
            res.push({
                exist: true,
                word: w,
                color: 'yellow'
            })
        }else {
            res.push({
                exist: false,
                word: w,
                color: 'transparent'
            })
        }
        
    })

    console.log(res)

    return res
}