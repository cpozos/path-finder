import React, {Component} from 'react';
import Node from './Node/Node';

import {dijkstra, dijkstra_2, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
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
        grid.setTargetNode(10,40);
        this.setState({grid: grid});
    }

    onMouseDown(row, col) {
        const grid = this.state.grid;
        grid.toogleWallPropertyNode(row, col);
        this.setState({isMoussePressed: true});
    }
    
    onMouseEnter(row, col) {
        if (!this.state.isMoussePressed) 
            return;
        const grid = this.state.grid;
        grid.setWallPropertyNode(row, col, true);
        this.setState({grid: grid});
        // Check for future modifications:
        // https://stackoverflow.com/questions/33080657/react-update-one-item-in-a-list-without-recreating-all-items
    }
    
    onMouseUp() {
        this.setState({isMoussePressed: false});
    }

    computeDijkstra() {
        // Variables
        const {grid} = this.state;

        // Computes 
        const visitedNodesInOrder = dijkstra_2(grid);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid.targetNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
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

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
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
                                        isStart={grid.isStartNode(node)}
                                        isTarget={grid.isTargetNode(node)}
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