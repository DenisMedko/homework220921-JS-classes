class RangeValidator {
    #from;
    #to;
    #arr;
    #fillArray() {
        if (this.#arr.length) {
            this.#arr.length = 0;
        }
        if (this.to > this.from) {
            for (let i = this.from; i <= this.to + 1; i++) {
                this.#arr.push(i);
            } 
        } else if(this.to === this.from) {
            this.#arr.push(this.from);
            this.#arr.push(this.to);
        } else {
            throw new Error(`Range array does'n created: start value ${this.from} must be <= than end value ${this.to}`);
        }
    }
    #checkTypeOfValue(obj) {
        if (isNaN(obj.value) || !Number.isInteger(+obj.value)) {
            throw new TypeError(`Value ${obj.name} ${obj.value} is not integer number`);    
        }
        return +obj.value;    
    }
    constructor(startValue, endValue){
        this.#from  = this.#checkTypeOfValue({name : 'from', value : startValue});
        this.#to    = this.#checkTypeOfValue({name : 'to', value : endValue});
        this.#arr   = [];
        this.#fillArray();
    }
    get from() {
        return this.#from;
    }
    get to() {
        return this.#to;
    }
    set from(val) {
        this.#from = this.#checkTypeOfValue({name : 'from', value : val});
        this.#fillArray();
    }
    set to(val) {
        this.#to = this.#checkTypeOfValue({name : 'to', value : val});
        this.#fillArray();
    }
    
    get range () {
        return [this.from, this.to];
    }

    validate(val) {
        val = this.#checkTypeOfValue({name : 'your number', value : val});
        if (this.#arr.indexOf(val) < 0 ) {
            throw new RangeError(`Your number ${val} is out of range from ${this.range[0]} to ${this.range[this.range.length - 1]}`); 
        }
        return val;
    }
}

try {
    const rangeValidator = new RangeValidator(1, '5');
    let validationResult;
    try {
        validationResult = rangeValidator.validate('3'); 
    } catch (err) {
        validationResult = err.message;
    }
    console.log(validationResult);
    try {
        rangeValidator.from = 4;
        validationResult = rangeValidator.validate(5); 
    } catch (err) {
        validationResult = err.message;
    }
    console.log(validationResult);
    try {
        rangeValidator.to = '10';
        validationResult = rangeValidator.validate(6); 
    } catch (err) {
        validationResult = err.message;
    }
    console.log(validationResult);
    try {
        rangeValidator.to = Infinity;
        validationResult = rangeValidator.validate(99); 
    } catch (err) {
        validationResult = err.message;
    }
    console.log(validationResult);
} catch (err) {
    console.log(err.message);
}