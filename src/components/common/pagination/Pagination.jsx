class Page {
  constructor(cursor, date) {
    this.cursor = cursor;
    this.date = date;
    this.nextPage = null;
    this.previousPage = null;
  }
}

export class Pagination {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insert(cursor, date) {
    // create the new node and place the data in it
    const newNode = new Page(cursor, date);

    // special case: no nodes in the list yet
    if (this.head === null) {
      this.head = newNode;
    } else {
      // link the current tail and new tail
      this.tail.next = newNode;
      newNode.previousPage = this.tail;
    }

    // reassign the tail to be the new node
    this.tail = newNode;
    this.length++;
  }

  pop() {
    // if empty: return null
    if (!this.length) {
      return null;
    } else {
      // save current tail (to return it later)
      const nodeToRemove = this.tail;

      if (this.length === 1) {
        // after removing the only node, there will be no head and tail
        this.head = null;
        this.tail = null;
      } else {
        // set the node before the current tail as the new tail
        this.tail = this.tail.previousPage;
        // remove the connection from the new tail to the old tail
        this.tail.nextPage = null;
        // remove the connection from the old tail to the new tail
        nodeToRemove.previousPage = null;
      }

      // decrease length by 1
      this.length--;
    }
  }
}
