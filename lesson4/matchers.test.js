//  // toBe and toEqual are equivalent for numbers
test('测试对象相等', () => {
    let data = {a: 1}
    data.b = 2
    expect(data).toEqual({a:1, b:2})
})
// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false
test('toBeUndefined匹配器', () => {
    let a = undefined
    expect(a).toBeUndefined()
})
test('toBeNull匹配器', () => {
    let a = null
    expect(a).toBeNull()
})
// 非falsy的值
test('toBeTruthy匹配器', () => {
    let a = 1
    expect(a).toBeTruthy()
})
// falsy的值
test('toBeFalsy匹配器', () => {
    let a = null
    expect(a).toBeFalsy()
    expect(a).not.toBeTruthy()
})
//  数字相关的匹配器
test('toBeGreaterThan', () => {
    let a = 10
    expect(a).toBeGreaterThan(9)
})
test('toBeGreaterThanOrEqual', () => {
    let a = 10
    expect(a).toBeGreaterThanOrEqual(10)
})
test('toBeLessThan', () => {
    let a = 8
    expect(a).toBeLessThan(9)
})
// 浮点数相等
test('toBeCloseTo', () => {
    let a = 0.1
    let b = 0.2
    // expect(a).toBe(0.3) 错误
    expect(a + b).toBeCloseTo(0.3)
})
// string
test("toMatch", () => {
    const str = "asdaasdsad"
    expect(str).toMatch("asd")
})
// array set
test("toContain", () => {
    const arr =["10", 40, 50]
    expect(arr).toContain("10")
})
// toThrow
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }
  
  test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
  });