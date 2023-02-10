import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux-hooks";
import useInput from "../../hooks/useInput";
import { styleTW } from "../../style";

const EditSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(s => s.setId === idtext))
    const setStatus = useAppSelector(state => state.set.status)
    
    const title = useInput('')
    const source = useInput('')

    useEffect(()=> {
        console.log("Set", idtext)
        console.log("Set set", set)
        if(set){
            title.setInput(set.name) 
            source.setInput(set.sourse ? set.sourse : '')}
    }, [set])

    if(setStatus === 'pending'){return <Loading />}

    return (
        <section className={`${styleTW.container}`}>
            <input className={`${styleTW.shadow}`} value={title.value} onChange={title.onChange}/>
            <input className={`${styleTW.shadow}`} value={source.value} onChange={source.onChange}/>
        </section>

    )
}

export default EditSet;