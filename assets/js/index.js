class RangeValidator {
    #from;
    #to;
    #arr;
    
    #fillArray() {
        this.#arr.length = 0;
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
        this.#from = Math.min(startValue, endValue);
        this.#to = Math.max(startValue, endValue);
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
        this.#from = value;
        this.#fillArray();
    }
    set to(value) {
        this.#to = value;
        this.#fillArray();
    }
    
    get range () {
        return [this.from, this.to];
    }

    validate(val) {
        if (this.#arr.indexOf(val) > -1) {
            return val;
        }
        throw new RangeError(`Number ${val} is out of range from ${rangeValidator.range[0]} to ${rangeValidator.range[this.range.length - 1]}`);
    }
}

const rangeValidator = new RangeValidator(1, 5);
try {
    console.log(rangeValidator.validate(3)); 
} catch (err) {
    console.log(err.message);
}
try {
    rangeValidator.validate(6); 
} catch (err) {
    console.log(err.message);
}