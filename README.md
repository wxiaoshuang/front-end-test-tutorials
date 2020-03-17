# 自动化测试
>lesson1 手写测试方法
# 测试框架Jest
目前主流的有Mocha, Jasmine, Jest, 
个人倾向Jest，原因：容易上手，开箱即用，功能全面。

>lesson2 开箱即用的jest测试

>lesson3 jest配置文件

执行 `npx jest --init` 弹出jest的配置文件`jest.config.js`

命令行运行 `npx jest --coverage
`得到测试覆盖率报告,或者package.json文件配置scripts: `"coverage":"jest --coverage"`,然后执行 `npm run coverage`

> lesson4

配置babel，支持es6的模块写法(import/export)

`npm install @babel/core babel/preset-env -D`

新建babel的配置文件`.babelrc`
```javascript
{
    "presets":[
        ["@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
}
```
原理：

## jest中的匹配器
查看lesson4的`matchers.test.js`文件
```javascript
// toBe and toEqual are equivalent for numbers
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
```
## 测试异步代码
在lesson4的目录下安装axios, `npm install axios -S`,新建`fetchData.js`文件

```javascript
import axios from 'axios'
function fetchDataByCallback(fn) {
    let url = 'http://www.dell-lee.com/react/api/demo.json'
    axios.get(url).then(response => {
        fn(response.data)
    })
}
function fetchDataByPromise(fn) {
    let url = 'http://www.dell-lee.com/react/api/demo.json'
    return axios.get(url)
}
function fetchDataByErrorPromise(fn) {
    let url = 'http://www.dell-lee.com/react/api/demo1.json'
    return axios.get(url)
}
export {fetchDataByCallback, fetchDataByPromise, fetchDataByErrorPromise}
```

测试文件`fetchData.test.js`
```javascript
import {
    fetchDataByCallback,
    fetchDataByPromise,
    fetchDataByErrorPromise
} from "./fetchData";
// 1 回调函数的方式
test("fetchDataByCallback的结果是{success: true}", (done) => {
    function callback(data) {
        try {
            expect(data).toMatchObject({ success: true })
            done();
        } catch (e) {
            done(e)
        }
    }
    fetchDataByCallback(callback)
})
// 2 promise的方式
test("fetchDataByPromise的结果是{success: true}", () => {
    return fetchDataByPromise().then(data => {
        expect(data.data).toMatchObject({ success: true })
    })
})
test("fetchDataByErrorPromise的结果是404", () => {
    expect.assertions(1) // 申明多少expect断言被执行了
    return fetchDataByErrorPromise().catch(e => {
        expect(e.toString()).toMatch('404')
    })
})
// // 3 .resolves / .rejects
test('the data contain {success: true}', () => {
    return expect(fetchDataByPromise()).resolves.toMatchObject({ data: { success: true } })
});
test('the fetch fails with an error', () => {
    // console.log()
    return expect(fetchDataByErrorPromise()).rejects.toThrow();
});
// 4 Async/Await
test('Async/Await success', async () => {
    const data = await fetchDataByPromise();
    expect(data.data).toMatchObject({ success: true });
});

test('Async/Await error', async () => {
    expect.assertions(1);
    try {
        await fetchDataByErrorPromise();
    } catch (e) {
        expect(e.toString()).toMatch('Error');
    }
})
test('Async/Await resolves success', async () => {
    await expect(fetchDataByPromise()).resolves.toMatchObject({ data: { success: true } });
});

test('Async/Await rejects error', async () => {
    await expect(fetchDataByErrorPromise()).rejects.toThrow();
});
```

## jest中的函数
Methods
```javascript
afterAll(fn, timeout)
afterEach(fn, timeout)
beforeAll(fn, timeout)
beforeEach(fn, timeout)
describe(name, fn)
describe.each(table)(name, fn, timeout)
describe.only(name, fn)
describe.only.each(table)(name, fn)
describe.skip(name, fn)
describe.skip.each(table)(name, fn)
test(name, fn, timeout)
test.each(table)(name, fn, timeout)
test.only(name, fn, timeout)
test.only.each(table)(name, fn)
test.skip(name, fn)
test.skip.each(table)(name, fn)
test.todo(name)
```
主要介绍前5个，打开`lesson4/Counter.test.js`文件，查看用法

```javascript
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
// 在所有测试用例执行之后执行
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

```



# vue测试

## 什么是TDD(test driver development)
# react测试