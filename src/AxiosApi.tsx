import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://david-js-23-default-rtdb.europe-west1.firebasedatabase.app'
})

export default axiosApi