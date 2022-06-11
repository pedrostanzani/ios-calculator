import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0'
        };
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