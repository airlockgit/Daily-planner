import axios from 'axios';

const Api = {
    fetchProducts: () => axios.get('http://localhost:7070/api/services'),
    fetchProduct: (id) => axios.get('http://localhost:7070/api/services/'+ id),
}

export default Api;