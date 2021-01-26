export class NodeModel{
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.distance = Infinity;
        this.isWall = false;
        this.previousNode = null;
        this.isVisited = false;
    }

    equals(node){
        return this.row === node.row && this.col === node.col;
    }
}

export class Grid{
    #nodes;

    constructor(rows, cols){
        this.#nodes = [];
        this.startNode = new NodeModel(-1,-1);
        this.targetNode = new NodeModel(-1,-1);
        for (let row = 0; row < rows; row++) {
            const nodes = [];
            for (let col = 0; col < cols; col++) {
                nodes.push(new NodeModel(row,col));
            }
            this.#nodes.push(nodes);
        }
    }

    setStartNode(row, col){
        this.startNode = this.#nodes[row][col];
    }

    setTargetNode(row,col){
        this.targetNode = this.#nodes[row][col];
    }

    toogleWallPropertyNode(row,col){
        const isWall = this.#nodes[row][col].isWall;
        this.#nodes[row][col].isWall = !isWall;
    }

    setWallPropertyNode(row,col,value){
        this.#nodes[row][col].isWall = value;
    }

    getNodes(){
        return this.#nodes;
    }

    getAllNodes(){
        const nodes = [];
        for (let i = 0; i < this.#nodes.length; i++) {
            const row = this.#nodes[i];
            for (let j = 0; j < row.length; j++) {
                nodes.push(row[j]);
            }
        }
        return nodes;
    }

    getNodesSortedByDistance(){        
        const nodes = [];
        for (let i = 0; i < this.#nodes.length; i++) {
            const row = this.#nodes[i];
            for (let j = 0; j < row.length; j++) {
                nodes.push(row[j]);
            }
        }

        nodes.sort((a,b) => a.distance - b.distance)
        return nodes;
    }

    isTargetNode(node){
        return this.targetNode.row === node.row && this.targetNode.col === node.col;
    }

    isStartNode(node){
        return this.startNode.row === node.row && this.startNode.col === node.col;
    }

    getUnvisitedNeighbors(node){
        const neighbors = [];
        const col = node.col;
        const row = node.row;
        if (row > 0) neighbors.push(this.#nodes[row - 1][col]);
        if (row < this.#nodes.length - 1) neighbors.push(this.#nodes[row + 1][col]);
        if (col > 0) neighbors.push(this.#nodes[row][col - 1]);
        if (col < this.#nodes[0].length - 1) neighbors.push(this.#nodes[row][col + 1]);
        return neighbors.filter(neighbor => !neighbor.isVisited);
    }

    updateUnvisitedNeighbors(node){
        const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
}