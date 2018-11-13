const HOST_URL = 'https://cnodejs.org/api/v1';

const GET_TOPICS = '/topics';
const GET_TOPICS_BY_ID = '/topic/';

const obj2uri = obj => {
  return Object.keys(obj)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&');
};

export default {
  getTopics(obj) {
    return HOST_URL + GET_TOPICS + '?' + obj2uri(obj);
  },

  getTopicByID(id, obj) {
    return HOST_URL + GET_TOPICS_BY_ID + id + '?' + obj2uri(obj);
  }
};
