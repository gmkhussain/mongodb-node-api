
const HEADER_JSON = {
    headers: {
        'content-type': 'application/json'
    }
};

const HEADER_MULTIPART_FORM = {
    headers: {
        'content-type': 'multipart/form-data; boundary=---------------------------293582696224464',
        'accept-patch': 'text/example;charset=utf-8'
    }
};


export default HEADER_JSON;
export { HEADER_JSON, HEADER_MULTIPART_FORM };