import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){

    }

    render(){ 
        const {
            row,
            col,
            isTarget,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

      const className = 
        isTarget ? 'node-target'
        : isStart ? 'node-start'
        : isWall ? 'node-wall'
        : '';
  
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${className}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}      