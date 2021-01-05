import React from 'react';
import {Button} from 'react-bootstrap';

export default class MoveButton extends React.Component {
    constructor(props) {
        super(props);

        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        this.props.clicked(this.getDirection());
    }

    getDirection() {
        return this.props.left ? 'left' : 'right';
    }

    render() {
        return (
            <Button variant="primary" onClick={this.clicked}>
                {this.props.left ? '<' : '>'}
            </Button>
        );
    }
}