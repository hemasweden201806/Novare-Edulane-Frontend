import Api from './Api';

class PrivChatApi {
  sendMessage(payload) {
    return Api.post('/message', payload);
  }

  deleteMessage(id) {
    return Api.delete(`/message/${id}`);
  }

  stream = 'http://localhost:8080/message/stream';
}

export default new PrivChatApi();
