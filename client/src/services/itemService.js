import axios from "axios";

const baseURL = "https://servercommerce.herokuapp.com/api";

const service = axios.create({
  baseURL,
  withCredentials: true
});

const ITEM_SERVICE = {
    allitems: () => {
        return service.get("/allitems")
    },

    additem: (data) => {
        return service.post("/additem", data)
    },

    getitem: (id) => {
        return service.get(`/getitem/${id}`)
    },

}

export default ITEM_SERVICE;
