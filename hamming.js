const hamming = (n) => {
    const answers = [1]
    let twos=0;
    let threes=0;
    let fives=0;
    var multiplier;
    
    while (answers.length<n) {
        let mTwo = answers[twos]*2
        let mThree = answers[threes]*3
        let mFive = answers[fives]*5
        let next = Math.min(mTwo, mThree, mFive); 
        if(next%2===0){ twos++ }
        if(next%3===0){ threes++ }
        if(next%5===0){ fives++ }
        answers.push(next) 
    }
