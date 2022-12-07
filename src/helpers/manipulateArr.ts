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