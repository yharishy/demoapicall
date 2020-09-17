import axios from 'axios';

axios.defaults.baseURL = 'https://magento2.signsigma.com/rest/default/V1/';
//axios.defaults.headers.post['accept'] = 'application/json';
axios.defaults.headers.post['store'] = 'us';
axios.defaults.headers.post['storeid'] = '1';
axios.defaults.headers.post['content-type'] = 'application/json';

export const executeApiCall = (endpoint, body) => {
    return axios.post(endpoint, body).then(res => {            
            return res.data;
        }).catch(err => {
            //console.log('error in request', err);
            return false;
    });    
};


