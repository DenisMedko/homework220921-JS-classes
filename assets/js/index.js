class RangeValidator {
    #from;
    #to;
    #arr;
    
    #fillArray() {
        if (this.#arr.length) {
            this.#arr.length = 0;
        }
        if (this.to > this.from) {
            for (let i = this.from; i <= this.to - this.from + 1; i++) {
                this.#arr.push(i);
            } 
        } else if(this.to === this.from) {
            this.#arr.push(this.from);
            this.#arr.push(this.to);
        } else {
            throw new Error('Start value must be <= end value');
        }

    }
    constructor(startValue, endValue){
        this.#from = Math.min(+startValue, +endValue);
        this.#to = Math.max(+startValue, +endValue);
        this.#arr = [];
        this.#fillArray();
    }
    get from() {
        return this.#from;
    }
    get to() {
        return this.#to;
    }
    set from(value) {
        value = +value;
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new TypeError(`Value from ${value} is not integer number`);    
        }
        this.#from = value;
        this.#fillArray();
    }
    set to(value) {
        value = +value;
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new TypeError(`Value to ${value} is not integer number`);    
        }
        this.#to = value;
        this.#fillArray();
    }
    
    get range () {
        return [this.from, this.to];
    }

    validate(val) {
        val = +val;
        if (typeof val !== 'number' || !Number.isInteger(val)) {
            throw new TypeError(`Value ${val} is not integer number`);    
        }
        if (this.#arr.indexOf(val) < 0 ) {
            throw new RangeError(`Number ${val} is out of range from ${rangeValidator.range[0]} to ${rangeValidator.range[this.range.length - 1]}`); 
        }
        return val;
    }
}

const rangeValidator = new RangeValidator(1, '5');
let validationResult;
try {
    validationResult = rangeValidator.validate('3'); 
} catch (err) {
    validationResult = err.message;
}
console.log(validationResult);
try {
    validationResult = rangeValidator.validate(5); 
} catch (err) {
    validationResult = err.message;
}
console.log(validationResult);
try {
    validationResult = rangeValidator.validate(6); 
} catch (err) {
    validationResult = err.message;
}
console.log(validationResult);