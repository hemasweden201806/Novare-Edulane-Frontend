import Api from './Api';

class NewsApi {
    getAllNews() {
        return Api.get('/');
    }
    getNewsById(id) {
        return Api.get('/'+id);
    }
    createNews(newNews) {
        return Api.post('/', newNews);
    }
    updateNews(updateNews) {
        return Api.put('/', updateNews);
    }
    deleteNews(id) {
        return Api.delete('/'+id);
    }
}
export default new NewsApi();