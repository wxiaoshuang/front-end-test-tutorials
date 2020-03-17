import Counter from './Counter'
let counter = null;
// 在每一个测试用例执行之前执行,一个test是一个测试用例
beforeEach(() => {
    console.log('beforeEach')
    counter = new Counter();
})
// 在每一个测试用例执行之后执行
afterEach(() => {
    console.log('afterEach')
})
// 在所有测试用例执行之前执行
beforeAll(() => {
    console.log('beforeAll')
})
afterAll(() => {
    console.log('afterAll')
})
// describe可以将测试分组
describe('测试counter', () => {
    test("测试counter的add方法", () => {
        console.log('测试add方法')
        counter.add(4)
        expect(counter.count).toBe(4)
    })
    test("测试counter的minus方法", () => {
        console.log('测试minus方法')
        counter.minus(3)
        expect(counter.count).toBe(-3)
    })
})
