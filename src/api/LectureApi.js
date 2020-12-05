import Api from './Api';

class LectureApi {
    getAllLectures() {
        return Api.get('/lectures');
    }
    getLectureById(id) {
        return Api.get('/lectures/'+id);
    }
    createLecture(newLecture) {
        return Api.post('/lectures', newLecture);
    }
    updateLecture(updateLecture) {
        return Api.put('/lectures', updateLecture);
    }
    deleteLecture(id) {
        return Api.delete('/lectures/'+id);
    }
}
export default new LectureApi();