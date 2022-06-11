import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0'
        };
    }

    setDisplay(dp) {
        let display = '';
        let digitCount = 0;

        // Limit display length to 9 digits
        for (let i = 0; i < dp.length; i++) {
            const char = dp.charAt(i);
            
            if (char >= '0' && char <= 9) {
                display += char;
                digitCount++;
            } else {
                display += char;
            }

            if (digitCount > 8) {
                i = dp.length;
            }
        }

        // Implementation pending: include decimal separators
        
        this.setState({ display });
    }

    handleSignChange() {
        let display = this.state.display;

        if (display.charAt(0) === '-') {
            display = display.replace('-', '');
        } else {
            display = '-' + display;
        }

        this.setDisplay(display);
    }

    handleInput(i) {
        let display = this.state.display;

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

    render() {
        const digits = [...Array(10).keys()].map((i) => {
            return (<button onClick={() => this.handleInput(i)} key={i}>{i}</button>);
        });

        return (
            <div>
                <div className='display'>{this.state.display}</div>
                {digits}
                <button onClick={() => this.handleInput('.')}>.</button>
                <button onClick={() => this.handleSignChange()}>+/-</button>
            </div>
        );
    }
}

export default Calculator;