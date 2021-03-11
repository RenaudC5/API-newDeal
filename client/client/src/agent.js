import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080/';

const responseBody = res => res.body;

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const COUNTRY = {
  get: () =>
    requests.get('country/'),

  del: (id) =>
    requests.del('country/'+id),
  post: (country) =>
    requests.post('country/',country),

  put: (id,country) =>
    requests.put('country/'+id,country),
};


export default {
 COUNTRY
};
