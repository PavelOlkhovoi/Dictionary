export function firstCapitalLetter(word: string) {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const modifiedWord = firstLetter.concat(word.slice(1));
    return modifiedWord;
  }