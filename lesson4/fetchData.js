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