import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstOperand: 0,
            secondOperand: 0,
            operator: null,

            display: '0',
            lock: true,

            lastCommand: null,
            lastOperation: null,
        };
    }

    setDisplay(display) {
        this.setState({display})
    }

    // Helper functions
    displayToNumber() {
        return Number(this.state.display);
    }

    runOperation(first, second) {
        let result;

        switch (this.state.operator) {
            case '-': result = first - second; break;
            case 'x': result = first * second; break;
            case '÷': result = first / second; break;

            case null:
            case '+': 
                result = first + second; 
                break;
            
            default:
                break;
        }

        return result;
    }

    selectOperation(operator) {
        if (this.state.lastOperation === '=') {
            // Step 1: overwrite (store overwritten value on first slot)
            let value = this.displayToNumber();
            this.setState({ firstOperand: value });
            this.setDisplay(value);
        }

        else {
            let lastCommandIsOperator = ['+', '-', 'x', '+'].includes(this.state.lastCommand);
            if (!lastCommandIsOperator) {
                // Step 1: confirm value on display and store it in second slot
                let value = this.displayToNumber();
                this.setState({ secondOperand: value });
    
                // Step 2: execute previous operation and store it on first operator
                let result = this.runOperation(this.state.firstOperand, value);
                this.setState({firstOperand: result});
                this.setDisplay(result);

            }
        }

        // Step 3: store the newly input operator
        this.setState({ operator });
    }

    handleEqual() {
        let value, result;

        if (this.state.lastOperation === '=') {
            // Step 1: overwrite (store overwritten value on first slot)
            value = this.displayToNumber();
            this.setState({ firstOperand: value });

            // Step 2: execute operation and store it on first operator
            result = this.runOperation(value, this.state.secondOperand);
            this.setState({firstOperand: result});
        } else {
            // Step 1: confirm value on display and store it in second slot
            value = this.displayToNumber();
            this.setState({ secondOperand: value });

            // Step 2: execute previous operation and store it on first operator
            result = this.runOperation(this.state.firstOperand, value);
            this.setState({firstOperand: result});
        }

        this.setDisplay(result);

        // When would it be NaN?
        // if (!isNaN(result)) {
        //     this.setState({firstOperand: result});
        // }
    }

    handleInput(i) {
        let display = this.state.display;

        if (this.state.lock) {
            display = 0;
            this.setState({lock: false});
        }

        // Prevent separator from being input more than once
        if (i === '.' && display.indexOf('.') !== -1) {
            return;
        }

        display += i.toString();
        
        // Remove leading zeroes if number displays no separator
        if (display.charAt(0) === '0' && display.indexOf('.') === -1) {
            display = display.replace('0', '');
        }

        this.setDisplay(display);
    }

    handleClick(i) {
        this.setState({lastCommand: i});
        if ([...Array(10).keys(), '.'].includes(i)) {
            this.handleInput(i);
        }
        if (['+', '-', 'x', '÷'].includes(i)) {
            this.setState({lock: true, lastOperation: i});
            this.selectOperation(i);
        }
        if (i === '=') {
            this.setState({lock: true, lastOperation: i});
            this.handleEqual();
        }
    }

    render() {
        const digits = [...Array(10).keys()].map((i) => {
            return (<button key={i} onClick={() => this.handleClick(i)}>{i}</button>);
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
                    <button onClick={() => this.handleClick('÷')}>÷</button>
                    <button onClick={() => this.handleClick('x')}>x</button>
                    <button onClick={() => this.handleClick('+')}>+</button>
                    <button onClick={() => this.handleClick('-')}>-</button>
                    <button onClick={() => this.handleClick('=')}>=</button>
                </div>

            </div>
        );
    }
}

export default Calculator;