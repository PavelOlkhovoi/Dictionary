export function firstCapitalLetter(word: string) {
    if(word){
      const firstLetter = word.slice(0, 1).toUpperCase();
      const modifiedWord = firstLetter.concat(word.slice(1));
      return modifiedWord;
    }else{
      return word
    }
    
  }