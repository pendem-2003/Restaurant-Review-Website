import http from "../http-common";
class Api{
    find(queryName="",page=0){
        return http.get(`?search=${queryName}&page=${page}`)
    }
    get(id){
        return http.get(`/${id}`)
    }
    delete(reviewId){
        return http.delete(`/reviews?reviewId=${reviewId}`)
    }
    post(data){
        return http.post(`/reviews/`,data)
    }
    put(data){
        return http.put(`/reviews/`,data)
    }
}
export default new Api();