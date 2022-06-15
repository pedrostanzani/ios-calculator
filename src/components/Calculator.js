import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstOperand: 3,
            secondOperand: 2,
            operator: null,

            display: '0'
        };
    }

    selectOperation(operator) {
        this.setState({ operator });
    }

    handleEqual() {
        let first, second, result;

        first = this.state.firstOperand;
        second = this.state.secondOperand;

        console.log(first, second);

        switch (this.state.operator) {
            case '+': result = first + second; break;
            case '-': result = first - second; break;
            case 'x': result = first * second; break;
            case '÷': result = first / second; break;
        
            default:
                break;
        }

        if (!isNaN(result)) {
            this.setState({firstOperand: result});
        }

        console.log(result);
    }

    render() {
        const digits = [...Array(10).keys()].map((i) => {
            return (<button key={i}>{i}</button>);
        });

        return (
            <div>
                <div className='display'>{this.state.display}</div>

                <div>
                    {digits}
                    <button>.</button>
                </div>

                <div>
                    <button>AC</button>
                    <button>+/-</button>
                    <button>%</button>
                </div>

                <div>
                    <button onClick={() => this.selectOperation('÷')}>÷</button>
                    <button onClick={() => this.selectOperation('x')}>x</button>
                    <button onClick={() => this.selectOperation('+')}>+</button>
                    <button onClick={() => this.selectOperation('-')}>-</button>

                    <button onClick={() => this.handleEqual()}>=</button>
                </div>





            </div>
        );
    }
}

export default Calculator;