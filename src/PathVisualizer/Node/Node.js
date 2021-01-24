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
        const {nodes} = this.state;
        console.log(nodes);

        return(
            <div className="node">
            </div>
        );
    }
}      

export const DEFAULT_MODE = {
    row: 0,
    col: 0
};