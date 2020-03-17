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