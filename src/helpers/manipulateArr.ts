type tempInd = number
export function isElementInArr<A extends {temId: number}>(arr: A[], key: number): tempInd {
        let ind = -1

        arr.forEach((item, idx) =>{
            console.log('0', idx)
            if(item.temId === key){ ind = idx}
        })

        return ind
    }

export function copyAndUpdateArrByIndex<T>(arr: T[], idx: number, item: T){
        const copy = [...arr]
        copy[idx] = item

        return copy
    }

export function makeArrayWithUniqueWords(array: string[]){
    const uniqueArray: string[] = [array[0]]
    array.forEach(word => !uniqueArray.includes(word) && uniqueArray.push(word))

    return uniqueArray
}
