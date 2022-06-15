const axios = require('axios');
const API_KEY = '22781965-6f9dce81fb9780324cf438200';

export default async function getData(searchQuery, pageCount) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&per_page=40&page=${pageCount}&image_type=photo&orientation=horizontal&safesearch=true`);
    return response.data;   
    } catch (error) {
        console.log(error)
    }

};




