import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0'
        };
    }

    handleInput(i) {
        let display = this.state.display + i.toString();

        if (display.charAt(0) === '0' && display.indexOf('.') === -1) {
            display = display.replace('0', '');
        }

        this.setState({ display });
    }

    render() {
        const digits = [...Array(10).keys()].map((i) => {
            return (<button onClick={() => this.handleInput(i)} key={i}>{i}</button>);
        });

        return (
            <div>
                <div className='display'>{this.state.display}</div>
                {digits}
            </div>
        );
    }
}

export default Calculator;