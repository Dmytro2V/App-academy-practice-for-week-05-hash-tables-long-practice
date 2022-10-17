function anagrams(str1, str2) {
  // Your code here
  // create set1, 2
  let table1 = table(str1);
  let table2 = table(str2);
  // check  
  let keys1 = Object.keys(table1)
  for (const letter of str1) {
    if (table1[letter] !== table2[letter]) return false;    
  }
  for (const letter of str2) {
    if (table1[letter] !== table2[letter]) return false;    
  } 
  return true    
} 
function table(str) {
  let table = {};
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    if (table[letter] === undefined) table[letter] = 1;
    else table[letter]++;
  }
  return table;
}

function commonElements(arr1, arr2) {
  // Your code here
  let set1 = new Set(arr1);
  let arr = [] 
  for (const num of arr2) {
    if (set1.has(num)) arr.push(num);
  } 
  return arr;
}


function duplicate(arr) {
  // Your code here
  let set = new Set();
  for (const num of arr) {
    if (set.has(num)) return num;
    else set.add(num) 
  }
}


function twoSum(nums, target) {
  // Your code here
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(target - nums[i])) return true;
    else set.add(nums[i]);
  }
  return false
}


function wordPattern(pattern, strings) {
  // Your code here
  // Understanding this way:
  // Pattern is first 4 - letter only;
  // strings can have same pattern on first4,
  // but can repeat this many times, coorect way,
  // or not.


  // see up to 4 different values patterns
  if (strings.length > pattern.length) return false
 
  // create '1234' pattern of strings
  let hash1 = hash(pattern.slice(0,4).split(''));
  
  // compare first 4;
  let first4 = strings.slice(0,4);
  let hash2 = hash(first4);
  if (hash2 !== hash1) return false;
  // compare other strings to first 4:
  
  for (let i = 4; i < strings.length; i += 4) {
    if(strings.slice(i, i + 4).join('') !==
      first4.join('')) return false;    
  }
  return true;
  
}
function hash(arr) {// create '1234' pattern of strings
  let num = 0;
  let max = 0;
  let hash = 0;
  let obj = {}
  for (let i = 0; i < 4; i++) {
    let el = arr[i]
    // if string-type exists, using existing num
    if (obj[el]) num = obj[el];  
    else { // if new type, creating new, add counter
      max++;
      num = max; //1234
      obj[el] = num;
    }
    hash += num * 10**(3 - i) // accumulating
  }
  return hash;
}
let target = 1000000;

let patternArr = [];
let strings = [];

for (let i = 0 ; i < target ; i++) {
  patternArr.push("ABCD");
  strings.push('Apple');
  strings.push('Berry');
  strings.push('Cantaloupe');
  strings.push('Date');
}

console.log(wordPattern(patternArr.join(""), strings));

//strings[target-1] = 'Elderberry';
patternArr[target-1] ="YYYY";

console.log(wordPattern(patternArr.join(""), strings));



function wordPatternDoo1y(pattern, strings) {
  let strSet = new Set(strings);
  let charSet = new Set(pattern.split(''));
  let i = 0
  while (i < pattern.length){
    if (charSet.size !== strSet.size) {
      return false;
    } else {
      charSet.delete(pattern[i]);
      strSet.delete(strings[i]);
      i++;
    }
  }
  return true;
}
module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];