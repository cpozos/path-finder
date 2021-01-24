import React, {Component} from 'react';
import Node from './Node/Node';

import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {Grid} from '../algorithms/node';
import './PathVisualizer.css';

export default class PathVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid: new Grid(20,50),
            isMoussePressed:false
        }
    }

    componentDidMount(){
        const grid = this.state.grid;
        grid.setStartNode(10,10);
        grid.setTargetNode(10,35);
        this.setState({grid: grid});
    }

    onMouseDown(row, col) {
        const grid = this.state.grid;
        grid.toogleWallPropertyNode(row, col);
        this.setState({grid: grid, isMoussePressed: true});
    }
    
    onMouseEnter(row, col) {
        if (!this.state.isMoussePressed) 
            return;
        const grid = this.state.grid;
        grid.setWallPropertyNode(row, col, true);
        this.setState({grid: grid});
    }
    
    onMouseUp() {
        this.setState({isMoussePressed: false});
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
    }

    computeDijkstra() {
        // Variables
        const {grid} = this.state;

        // Computes 
        const visitedNodesInOrder = dijkstra(grid);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid.targetNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render(){
        const {grid} = this.state;
        console.log(grid);

        return(
            <div>
                <button onClick={() => this.computeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className="grid"> 
                    {grid.getNodes().map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx)=> {
                                    const row = node.row;
                                    const col = node.col; 
                                    return <Node 
                                        key={nodeIdx}
                                        row={row}
                                        col={col}
                                        isStart={grid.isStartNode(row,col)}
                                        isTarget={grid.isTargetNode(row, col)}
                                        isWall={node.isWall}
                                        onMouseDown={(row, col) => this.onMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.onMouseEnter(row, col)}
                                        onMouseUp={() => this.onMouseUp()}
                                    ></Node>
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}