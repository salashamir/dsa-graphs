class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // remove from nodes prop
    this.nodes.delete(vertex);
    // remove from adjacency lsits
    for (const neighbor of vertex.adjacent) {
      this.removeEdge(neighbor, vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const set = new Set();
    const vals = [];
    const stack = [start];
    set.add(start.value);

    while (stack.length !== 0) {
      const curr = stack.pop();

      vals.push(curr.value);

      for (const neighbor of curr.adjacent) {
        if (set.has(neighbor.value)) continue;

        stack.push(neighbor);
        set.add(neighbor.value);
      }
    }

    return vals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const set = new Set();
    const vals = [];
    const queue = [start];
    set.add(start.value);

    while (queue.length !== 0) {
      const curr = queue.shift();

      vals.push(curr.value);

      for (const neighbor of curr.adjacent) {
        if (set.has(neighbor.value)) continue;

        queue.push(neighbor);
        set.add(neighbor.value);
      }
    }

    return vals;
  }
}

module.exports = { Graph, Node };
