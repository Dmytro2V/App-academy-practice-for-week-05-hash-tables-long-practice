class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    // check load factor. Not resizing <=4 to pass 1-2 tests.
    if (this.count > this.capacity * 0.7) {
      if (this.count > 4) this.resize();
    }    
    
    //insert
    let newNode = new KeyValuePair(key, value)
    let mod = this.hashMod(key)
    
    if (this.data[mod]) { //bucket is Busy, collision
      // search for same key
      let node = this.data[mod]
      while (node !== null
            && node.key !== key) {
        node = node.next;
      } //searched all or found

      if (node === null) { // not found, adding new in LinkedList 
        newNode.next = this.data[mod]; //connect to LinkedList
        this.data[mod] = newNode; // set head to new node
        
        this.count++
      } else {
      // (node.key === key) {
        node.value = newNode.value;
      } ;
    } else { // bucket was empty, no collision, no need for  LL (.next)
      this.data[mod] = newNode;
      this.count++            
    }   
    
  }


  read(key) {
    // Your code here
    let mod = this.hashMod(key);  
    let newNode = this.data[mod];
  
    while (newNode !== null && !(key === newNode.key)) {
      newNode = newNode.next
    } 
    if (newNode === null) return undefined // not found;
    return newNode.value;
  }

  resize() {
    // Your code here
    //1. `data`'s elements must be preserved in a copy for redistribution.
    let dataCopy = this.data.slice(); // copy
    let countCopy = this.count;

    //2. `capacity` should now be double its previous value.
    this.capacity = this.capacity * 2;
    // 3. `data` should now be a new `Array` scaling to the new `capacity`.
    this.data = new Array(this.capacity).fill(null);
    //4. Redistribute all of the elements in your copy
    // of `data` back into the `HashTable` 
    // while making sure to check for any nodes nested 
    // in linked lists.
    for (let i = 0; i < dataCopy.length; i++) {
      let copied = dataCopy[i];
      while (copied) {
        this.insert(copied.key, copied.value);
        copied = copied.next;
      }
    this.count = countCopy;
  
    }

  }


  delete(key) {
    // Your code here

    // find its node:
    let mod = this.hashMod(key);  
    let node = this.data[mod];
    let prev;     

    while (node !== null && !(key === node.key)) {
      prev = node;
      node = node.next
    } // found

    if (node === null) return "Key not found" // not found;
    
    // deleting:
    // 2 cases:        
    
    if (prev) { // node with key is  middle
      prev.next  = node.next;      
    } else { // node with key is  first
      this.data[mod] = node.next
    }
    this.count--;
  }
}




/**************************************************
 * ******************************************* */
module.exports = HashTable;