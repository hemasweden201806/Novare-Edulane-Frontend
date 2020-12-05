import Api from "./Api";

class FileStorageApi {
  getAllFiles() {
    return Api.get("/filestorage");
  }
  getFileById(id) {
    return Api.get("/filestorage/" + id);
  }
  uploadFile(newFile) {
    return Api.post("/filestorage", newFile);
  }
  deleteFile(id) {
    return Api.delete("/filestorage/" + id);
  }
}
export default new FileStorageApi();
