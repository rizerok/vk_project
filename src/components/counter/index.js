import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {increment, decrement} from '../../modules/counter';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement();
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000);
    }

    render() {
        const {counter, onIncrement, onDecrement} = this.props;
        return (
            <p>
                <span>
                    Clicked: {counter} times
                </span>
                {' '}
                <button onClick={onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
                </button>
            </p>
        );
    }
}

// Counter.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncrement: PropTypes.func.isRequired,
//     onDecrement: PropTypes.func.isRequired
// };

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({onIncrement: increment, onDecrement: decrement}, dispatch);

export default connect(
    state => state,
    mapDispatchToProps
)(Counter);
