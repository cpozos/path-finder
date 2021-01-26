import Node from "../PathVisualizer/Node/Node";

export class NodeModel{
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.distance = Infinity;
        this.isWall = false;
        this.previousNode = null;
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
        if (this.startNode){
            this.#nodes[this.startNode.row][this.startNode.col].isStartNode = false;
        }
        this.startNode = this.#nodes[row][col];
    }

    setTargetNode(row,col){
        if (this.targetNode){
            this.#nodes[this.targetNode.row][this.targetNode.col].isStartNode = false;
        }
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

    getNodesSortedByDistance(){        
        const nodes = [];
        for (let i = 0; i < this.#nodes.length; i++) {
            const row = this.#nodes[i];
            for (let j = 0; j < row.length; j++) {
                nodes.push(node);
            }
        }

        nodes.sort((a,b) => a.distance - b.distance)
        return nodes;
    }

    isTargetNode(row, col){
        return this.targetNode.row == row && this.targetNode.col == col;
    }

    isTargetNode(node){
        return this.targetNode.row == node.row && this.targetNode.col == node.col;
    }

    isStartNode(row, col){
        return this.startNode.row == row && this.startNode.col == col;
    }

    isStartNode(node){
        return this.startNode.row == node.row && this.startNode.col == node.col;
    }
}