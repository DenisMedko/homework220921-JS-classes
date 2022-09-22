class RangeValidator {
    #from;
    #to;
    #arr;
    
    #fillArray() {
        if (this.#arr.length) {
            this.#arr.length = 0;
        }
        if (typeof this.from !== 'number' || !Number.isInteger(this.from)) {
            throw new TypeError(`Value from ${this.from} is not integer number`);    
        }
        if (typeof this.to !== 'number' || !Number.isInteger(+this.to)) {
            throw new TypeError(`Value to ${this.to} is not integer number`);    
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
        this.#from = +value;
        this.#fillArray();
    }
    set to(value) {
        this.#to = +value;
        this.#fillArray();
    }
    
    get range () {
        return [this.from, this.to];
    }

    validate(val) {
        if (typeof +val !== 'number' || !Number.isInteger(+val)) {
            throw new TypeError(`Value ${val} is not integer number`);    
        }
        if (this.#arr.indexOf(+val) < 0 ) {
            throw new RangeError(`Number ${val} is out of range from ${rangeValidator.range[0]} to ${rangeValidator.range[this.range.length - 1]}`); 
        }
        return val;
    }
}

const rangeValidator = new RangeValidator(1, '5');
try {
    console.log(rangeValidator.validate('3')); 
} catch (err) {
    console.log(err.message);
}
try {
    console.log(rangeValidator.validate(5)); 
} catch (err) {
    console.log(err.message);
}
try {
    rangeValidator.validate(6); 
} catch (err) {
    console.log(err.message);
}