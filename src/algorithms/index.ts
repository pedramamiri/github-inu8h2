const removeIdenticalLetters = (str: string): string => {
  // Maximum size of each chunk
  const MAX_CHUNK_SIZE = 150_000;
  // Pattern to match four or more consecutive identical lowercase letters
  const pattern = /([a-z])\1{3,}/g;

  // Function to remove consecutive identical letters from a chunk
  const removeDuplicates = (chunk: string): string => {
    if (chunk.length < 4) {
      return chunk;
    }

    // Test if the pattern matches the input string
    const pass = pattern.test(chunk);
    if (!pass) {
      return chunk;
    }

    //replace all matches of the pattern with the first three characters of the match
    return chunk.replace(pattern, (match) => match.slice(0, 3));
  };

  // Function to process the string in chunks
  const processChunks = (str: string, result: string = ''): string => {
    // Base case
    if (str.length === 0) {
      return result;
    }

    // Get the current chunk
    const currChunk = str.substring(0, MAX_CHUNK_SIZE);
    // Remove consecutive identical letters from the chunk
    const nounDuplicatesCurrChunk = removeDuplicates(currChunk);

    // If it's the first chunk, simply add it to the result
    if (result === '') {
      return processChunks(str.slice(MAX_CHUNK_SIZE), nounDuplicatesCurrChunk);
    }

    // Remove consecutive identical letters at the pivot
    const firstRightThreeLetters = nounDuplicatesCurrChunk.slice(0, 3);
    const restNounDuplicatesCurrChunk = nounDuplicatesCurrChunk.slice(3);
    const lastLeftThreeLetters = result.slice(-3);
    const restResult = result.slice(0, -3);
    const nounDuplicatesPivot = removeDuplicates(
      lastLeftThreeLetters + firstRightThreeLetters
    );

    return processChunks(
      str.slice(MAX_CHUNK_SIZE),
      restResult + nounDuplicatesPivot + restNounDuplicatesCurrChunk
    );
  };

  // Process the string in chunks
  return processChunks(str);
};

const removeIdenticalLetters2 = (str: string): string => {
  const stringList: string[] = str.split('')
  const res : string[] = []
  const n:number = 4
  for(let i=0;i<stringList.length;i++){
      if(i>=stringList.length-(n-1)){
          res.push(stringList[i])
      }
      else if(stringList[i] === stringList[i+1]){
          let match = true
          for(let j=i+2;j<=i+(n-1);j++){
              if(stringList[i] != stringList[j]){
                  match = false
                  break
              }
          }
          if(!match){
              res.push(stringList[i])
          }

      }else{
          res.push(stringList[i])
      }
  }
  return res.join('')
}

const maximumOddSum = (numbers: number[]): number => {
  let highestEven = -Infinity;
  let highestOdd = -Infinity;

  for (const num of numbers) {
    // If the number is odd and greater than the current highest odd number
    if (num % 2 !== 0 && num > highestOdd) {
      highestOdd = num;
    }
    // If the number is even and greater than the current highest even number
    if (num % 2 == 0 && num > highestEven) {
      highestEven = num;
    }
  }
  // Return the sum of the highest odd and highest even numbers found,that is odd
  return highestOdd + highestEven;
};

export { removeIdenticalLetters, maximumOddSum };
