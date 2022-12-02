import {useState, FC, useEffect} from 'react'
import MeaningInput from './MeaningInput';
import useTest from './useTest';


interface Props {
    setObject: Function,
    partProps: string
}

const MeaningsObjectsCreator: FC<Props> = ({setObject, partProps}) => {
  const [test, setTest] =useState<string[]>([])
  
  const testBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTest(p => [...p, e.target.value])
    console.log(test)
  }
    const [meaning, setMeaning] = useState([<MeaningInput onBlur={testBlur}/>])
    const part = useTest(partProps = 'nothing')

    const results = () => {
      const testRes = {
        [part.value]: [test]
      }
      console.log(testRes)
      return results
    }


    
    return (
      <div>
        <hr />
            <input {...part}/>
            {
              meaning.map((i, idx) => 
                <div key={idx}>{i}</div>
              )
            }

            <button onClick={()=> setMeaning(p => [...p, <MeaningInput onBlur={testBlur}/>])}>Add meanings</button>

            <button onClick={results}>Save value</button>
        <hr/>
    </div>
  )

}

export default MeaningsObjectsCreator;