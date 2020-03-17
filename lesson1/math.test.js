const {add, multiply} = require('./math.js')
function expect(actual) {
    return {
        toBe: function(expected) {
            if(actual !== expected) {
               throw new Error(`测试不通过,期望值是${expected},实际值是${actual}`)
            }
        }
    }
}
function test(desc, fn) {
    try {
        fn()
        console.log(`${desc}通过`)
    }catch(e) {
        console.log(`${desc} ${e.message}`)
    }
}
test("测试加法", () => {
    expect(add(3, 5)).toBe(4)
})
test("测试乘法", () => {
    expect(multiply(3, 5)).toBe(15)
})