const API_BASE_URL = '//localhost:4000'


const HEADER_JSON = {
    headers: {
        'content-type': 'application/json'
    }
};

const HEADER_MULTIPART_FORM = {
    headers: {
        'content-type': 'multipart/form-data; boundary=---------------------------293582696224464'
    }
};


export default API_BASE_URL;
export { API_BASE_URL, HEADER_JSON, HEADER_MULTIPART_FORM };