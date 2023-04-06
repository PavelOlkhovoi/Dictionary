import {FC} from 'react'
import { styleTW } from '../../../style';
type Props = {
    children: string | JSX.Element | JSX.Element[]
  }
const BasicTag: FC<Props> = ({children}) => {
    return <div className={`${styleTW.bageBlue} mt-3`}>{children}</div>;
}

export default BasicTag;