import { checkString } from "../backend/crudFunctions/text";
import { ifCompoundWords } from "../backend/crudFunctions/text";

describe('Words matcher', ()=> {
    test('Dog in in the text', () => {
        const word = ['cat', 'dog', 'cow']
        const text = 'I see a dog'
        const res = checkString(word, text)
        console.log(res)
        expect(res[0]).toBe('dog');
    });

    test('Dog and cat are in the text', () => {
        const word = ['cat', 'dog', 'cow']
        const text = 'I see a dog and cow'
        const res = checkString(word, text)

        expect(res.length).toBe(2);
    });

    test('Test props', () => {
        const word = ['too bold']
        const text = 'I see a dog it is too bold'
        const res = ifCompoundWords(text, word)
        console.log('Batenelbb', res)
        expect(res.length).toBe(2);
    });
})

