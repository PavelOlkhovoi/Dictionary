import { compoundWordsPosition, matchWordsByTest, matchCompoundWords, sortSimpleAndCompoundWords } from '../helpers/wordMatcher'

describe('Words matcher', ()=> {
    // test('Too bold', () => {
    //     const words = ['too bold','put off', 'set about']
    //     // const text = 'I think he is too bold'
    //     const text = 'You need to put you hat off'
    //     const res = compoundWordsPosition(words, text)
    //     expect(res.length).toBe(2);
    // });

    test('Simple words by test', () => {
        const words = ['too bold','put off', 'set about']
        const simple = ['cat', 'dog']
        const text = 'You need to put off and dog'
        //const text = 'You is too bold it is bed'
        const res = matchWordsByTest(words, text)
        expect(res[1]).toBe(true);
    });

    test('Compound words by test', () => {
        const words = ['too bold','put off', 'set about']
        const text = 'You need to put and off dog'
        //const text = 'You is too bold it is bed'
        const res = matchCompoundWords(words, text)
        expect(res[1].exist).toBe(true);
    });

    test('Sort simple and compound words by color', () => {
        const words = ['too bold', 'dog', 'put off', 'cat', 'set about']
        const text = 'You need to put and cat off dog'
        const res = sortSimpleAndCompoundWords(words, text)
        expect(res[1].color).toBe('yellow');
    });

})

