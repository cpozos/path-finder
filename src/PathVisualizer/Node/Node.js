import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            nodes: []
        }
    }

    componentDidMount(){
        const nodes = [];
        for (let row =0; row<15; row++){
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
                            {row.map((node, nodeIdx)=>{
                                return <Node key={nodeIdx} isStart={true} test={'foo'}></Node>
                            })};
                        </div>
                    )
                })};
            </div>
        );
    }
}      

export const DEFAULT_MODE = {
    row: 0,
    col: 0
};