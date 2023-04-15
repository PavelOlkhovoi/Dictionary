import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Words from '../pages/words/Words';
import Word from '../pages/words/Word';
import SetWordsToLern from '../pages/exercise/SetWordsToLern';
import Home from '../pages/Home';
import AddWord from '../pages/words/AddWord';
import AddWordsWithSteps from '../pages/words/wordsSteps/AddWordsWithSteps';
import ListTexts from '../pages/texts/ListTexts';
import SingleText from '../pages/texts/SingleText';
import EditText from '../pages/texts/EditText';
import AddText from '../pages/texts/AddText';
import ListSets from '../pages/sets/ListSets';
import SingleSet from '../pages/sets/SingleSet';
import AddSet from '../pages/sets/AddSet';

interface Router {
    path: string;
    element: JSX.Element;
    isPrivate: boolean;
  }
  
const AppRouter = () => {
    const user = useAppSelector(state => state.user.userFake)
    const routeList: Router[] = [
        {
          path: '/',
          element: <Home />,
          isPrivate: false
        },
        {
          path: '/words',
          element: <Words />,
          isPrivate: true
        },
        {
          path: '/words/:idword',
          element: <Word />,
          isPrivate: true
        },
        {
          path: '/exercises/:idset',
          element: <SetWordsToLern/>,
          isPrivate: true
        },
        {
          path: '/addwords',
          element: <AddWord/>,
          isPrivate: true
        },
        {
          path: '/addwordsSteps',
          element: <AddWordsWithSteps/>,
          isPrivate: true
        },
        {
          path: '/texts',
          element: <ListTexts/>,
          isPrivate: true
        },
        {
          path: '/texts/:idtex',
          element: <SingleText/>,
          isPrivate: true
        },
        {
          path: '/texts/edit/:idtext',
          element: <EditText/>,
          isPrivate: true
        },
        {
          path: '/texts/add',
          element: <AddText/>,
          isPrivate: true
        },
        {
          path: '/sets',
          element: <ListSets/>,
          isPrivate: true
        },
        {
          path: '/sets/:idtext',
          element: <SingleSet/>,
          isPrivate: true
        },
        {
          path: '/sets/add',
          element: <AddSet/>,
          isPrivate: true
        },
    ]

    return (
        <Routes>
          {routeList.map((route) => {
            if (route.isPrivate && !user) {
              return null; // If authentication is required and user is not authenticated, do not generate route
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" />} /> {/* fallback route */}
        </Routes>
      );
}


export default AppRouter;


{/* <Routes>
      <Route path="/" element={<Words />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="exercises/:idset" element={<SetWordsToLern />}/>
      <Route path="addwords" element={<AddWord />}/>
      <Route path="addwordsSteps" element={<AddWordsWithSteps />}/>
      <Route path="auth" element={<Home />} />
      <Route path='/texts'>
        <Route index element={<ListTexts />} />
        <Route path=":idtext" element={<SingleText />} />
        <Route path="edit/:idtext" element={<EditText />} />
        <Route path="add" element={<AddText />} />
      </Route>
      <Route path="/sets">
        <Route index element={<ListSets />} />
        <Route path="add" element={<AddSet />} />
        <Route path=":idtext" element={<SingleSet />} />
        <Route path="edit/:idtext" element={<EditSet />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes> */}