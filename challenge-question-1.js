//Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into 
//individual array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
//Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

let givenArray = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20,"a","green","dog","b","a"];

const cleanRoom = (inputArray) =>{

    //*Variables initialized*
    let outputArray = [];   //Will end up as final converted array
    let outputSubarray = []; //Stores subarrays of output array (i.e. the array of sorted numbers, the array of sorted strings)
    let processingArray = inputArray; //start with given array as the array to be worked on (will be reduced as function runs)
    let nextValue = 0; //next element to be added to an outputSubarray
    let nextValueArray = []; //array of all instances of nextValue

    //*Function definitions*
    //finder functions
    const findNextNumber = array => Math.min(...array); //find lowest number in an array
    const findNextString = array => array[0]; //find "lowest" string (these are ordered using array.sort() beforehand)
    
    //.filter functions
    const isSame = val => val === nextValue; //returns subArray of all instances of lowest number
    const isDifferent = val => val != nextValue; //returns everything else in processingArray, removing current lowest
    const isString = val => (typeof val) === "string"; //returns all string values 
    const isNotString = val => (typeof val) != "string"; //returns all nonstring values 

    //function that cleans up arrays by converting length-1 subarrays into their corresponding value (i.e. [3] to 3)
    const oneLengthArrayRemover = (array) => {
        return array.map((ele) => {
            if (ele.length === 1) { return ele[0]; }
            else {return ele;}
        })
    }

    //The main function: takes elements out of inputted array in order, pushing them together into one array element (outputSubarray) for the final output
    //Invoked with a different finding function based on what subset of elements it is ordering (strings vs numbers)
    compileOutputArray = (valueTypeFunction) => { 
       
        outputSubarray = []; //clears previous value so a new section can be created
        
        while (processingArray.length > 0){  //re-run this code if processingArray still contains values to process
            nextValue = valueTypeFunction(processingArray); //gets next value (lowest/first) to be added to the outputSubarray

            nextValueArray = processingArray.filter(isSame); //takes all instances of nextValue and makes them one array

            outputSubarray.push(nextValueArray); //adds this subarray of next values to the end of the outputSubarray

            processingArray = processingArray.filter(isDifferent); //remove current nextValue elements from processing array
        } 
        outputSubarray =  oneLengthArrayRemover(outputSubarray); // converts arrays with a single element to that element's value, then returns this final output

        return outputSubarray;
    }


    //*Function steps*
    
    //First, strings are dealt with
    processingArray = processingArray.filter(isString); //gets all strings from initial inputArray

    processingArray.sort(); //easy sort for strings

    outputSubarray = compileOutputArray(findNextString); //processes string elements to return them in output form

    outputArray.push(outputSubarray); //adds subarray of strings to outputArray

    processingArray = inputArray.filter(isNotString); //resets processingArray value to contain everything again except the strings (which have been dealt with)


    //Working through number values in the array
    outputSubarray = compileOutputArray(findNextNumber);

    outputArray.push(outputSubarray);

    return outputArray;
}


let output = cleanRoom(givenArray);

console.log(output);