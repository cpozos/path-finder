import React, {Component} from 'react';
import Node from './Node/Node';

import './PathVisualizer.css';

export default class PathVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes: []
        }
    }

    componentDidMount(){
        const nodes = [];
        for (let row =0; row < 50; row++){
            const currentRow = [];
            for (let col =0; col < 50; col++){
                const currentNode = {
                    col, 
                    row
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    render(){
        const {nodes} = this.state;
        console.log(nodes);

        return(
            <div className="grid"> 
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            { row.map((node, nodeIdx)=> {
                                return <Node key={nodeIdx}></Node>
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}