import { compoundWordsPosition, builtArrForDisplay } from '../helpers/wordMatcher'

describe('Words matcher', ()=> {
    test('Too bold', () => {
        const words = ['too bold','put off', 'set about']
        // const text = 'I think he is too bold'
        const text = 'You need to put you hat off'
        const res = compoundWordsPosition(words, text)
        expect(res.length).toBe(2);
    });

    // test('See arr', () => {
    //     const words = ['too bold','put off', 'set about']
    //     const simple = ['cat', 'dog']
    //     const text = 'You need to put you hat off and dog'
    //     const res = builtArrForDisplay(words, simple, text)
    //     expect(res.length).toBe(2);
    // });

})

