class RangeValidator {
    #from;
    #to;
    //#arr;
    // #fillArray() {
    //     if (this.#arr.length) {
    //         this.#arr.length = 0;
    //     }
        
    //     if (this.to > this.from) {
    //         for (let i = this.from; i <= this.to + 1; i++) {
    //             this.#arr.push(i);
    //         } 
    //     } else if(this.to === this.from) {
    //         this.#arr.push(this.from);
    //         this.#arr.push(this.to);
    //     } else {
    //         throw new Error(`Range array does'n created: start value ${this.from} must be <= than end value ${this.to}`);
    //     }
    // }
    #checkTypeOfValue(obj) {
        if (isNaN(obj.value) || !isFinite(+obj.value) || !Number.isInteger(+obj.value)) {
                throw new TypeError(`Value ${obj.name} ${obj.value} is not integer number`);    
        }
        return +obj.value;  
    }
    static isRangeValidator(obj) {
        return obj instanceof RangeValidator;
    }
    constructor(startValue, endValue){
        //this.#arr = [];
        //this.#from  = this.#checkTypeOfValue({name : 'from', value : startValue});
        this.from = startValue;
        //this.#to    = this.#checkTypeOfValue({name : 'to', value : endValue});
        this.to = endValue;
        //this.#fillArray();
    }
    get from() {
        return this.#from;
    }
    get to() {
        return this.#to;
    }
    set from(val) {
        //console.log('from in setter check');
        this.#from = this.#checkTypeOfValue({name : 'from', value : val});
        //this.#fillArray();
    }
    set to(val) {
        //console.log('to in setter check');
        this.#to = this.#checkTypeOfValue({name : 'to', value : val});
        //this.#fillArray();
    }
    get range () {
        return [this.from, this.to];
    }
    validate(val) {
        val = this.#checkTypeOfValue({name : 'your number', value : val});
        try {
            //if (this.#arr.indexOf(val) < 0 ) {
            if (val < this.range[0] || val > this.range[1]) {
                throw new RangeError(`Your number ${val} is out of range from ${this.range[0]} to ${this.range[1]}`);
                //this.range.length - 1 
            }
            return val;
        } catch (err) {
            return err.message;
        }    
    }
}

let rangeValidator = {};
try {
    rangeValidator = new RangeValidator(1, '5');
} catch (err) {
    console.log(err.message);
} 

if (RangeValidator.isRangeValidator(rangeValidator)) {

    console.log(rangeValidator.validate('3'));
    
    try {
        rangeValidator.from = 4;
        console.log(rangeValidator.validate(5));
    } catch (err) {
        console.log(err.message);
    } 

    try {
        rangeValidator.to = '10';    
        console.log(rangeValidator.validate(6));
    } catch (err) {
        console.log(err.message);
    } 

    console.log(rangeValidator.validate(99));
    
    try {
        rangeValidator.to = Infinity;
        console.log(rangeValidator.validate(99));
    } catch (err) {
        console.log(err.message);
    } 
   
} else {
    console.log(`Your range validator is not instanse of ${RangeValidator.name}`);  
}        
