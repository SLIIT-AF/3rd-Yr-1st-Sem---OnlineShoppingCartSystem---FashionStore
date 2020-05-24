import axios from "axios";

const baseUrl = 'http://localhost:3500/'

export default {
    
    createUser(url = baseUrl + 'user/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: res => axios.post(url, res),
            send_email: message => axios.post(url+"/send_email", message),
            update: (id, up) => axios.put(url + id, up),
            delete: id => axios.delete(url + id)
        }
    }

}