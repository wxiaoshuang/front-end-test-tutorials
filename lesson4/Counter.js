class Counter {
    constructor() {
        this.count = 0;
    }
    add(num){
        this.count = this.count + num;
    }
    minus(num) {
        this.count = this.count - num;
    }
}
export default Counter