export const limitDigits = (display) => {
    // Limit display length to 9 digits
    let result = '';
    let digitCount = 0;
    
    for (let i = 0; i < display.length; i++) {
        const char = display.charAt(i);
        
        if (char >= '0' && char <= 9) {
            result += char;
            digitCount++;
        } else {
            result += char;
        }

        if (digitCount > 8) {
            i = display.length;
        }
    }

    return result;
}

export const includeSeparators = (display) => {
    let result = '';
    let start, end;

    start = 0;
    if (display.charAt(0) === '-') {
        result += '-'
        start = 1;
    }

    end = display.indexOf('.');
    if (end === -1) {
        end = display.length;
    }

    for (let i = start; i < end; i++) {
        const char = display.charAt(i);
        let remaining = end - i - 1;

        result += char;

        if (remaining !== 0 && remaining % 3 === 0) {
            result += ',';
        }
    }

    result += display.slice(end);

    return result;
}