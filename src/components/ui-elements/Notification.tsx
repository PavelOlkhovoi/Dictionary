import {useEffect, useState} from 'react'
import { styleTW } from '../../style';
import { motion } from 'framer-motion';

interface Props {
    message: string
    stopShowing: Function
}
const Notification = ({message, stopShowing}: Props) => {
    const [show, setShow] = useState(true)
    const cardAnimation = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setShow(false);
            stopShowing() as Function
        }, 4000);
      
        return () => clearInterval(interval);
      }, []);

      if (!show) {
        return null;
      }

    return (
        <motion.div
        initial={'hidden'}
        animate={'visible'}
        variants={cardAnimation}
        
        className={`shadow appearance-none border rounded w-full absolute bottom-0 right-0 
        max-w-md m-4 bg-white py-10 px-6`}>
            {message} 
            <span 
            className={`rounded-full absolute top-4 right-4 w-[30px] h-[30px] border border-red-600 text-center cursor-pointer`}
            onClick={()=>setShow(false)}
            >x</span>
        </motion.div>
    )
}


export default Notification;