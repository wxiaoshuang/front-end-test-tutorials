const {add, multiply} = require('./math.js')
test("测试加法", () => {
    expect(add(3, 5)).toBe(8)
})
test("测试乘法", () => {
    expect(multiply(3, 5)).toBe(15)
})