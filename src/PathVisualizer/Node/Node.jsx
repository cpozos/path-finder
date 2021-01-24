import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {

    constructor(props){
        super(props);
        this.state = {
            onMouseDown:null,
            className:''
        }
    }

    componentDidMount(){

    }

    handleMouseDown(row, col){
        this.setState({className:"node isStart"});
        this.state.onMouseDown(row,col);
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
        
        this.state.onMouseDown = onMouseDown;

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${className}`}
                onMouseDown={() => this.handleMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}      