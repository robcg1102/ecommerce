import axios from "axios";

const baseURL = "https://servercommerce.herokuapp.com/api";

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const AUTH_SERVICE = {
  signup: (data) => {
    return service.post("/signup", data);
  },

  login: (data) => {
    return service.post("/login", data);
  },

  getUser: () => {
    return service.get("/profile");
  },

  logout: () => {
    return service.get("/logout");
  },

  additem: (userid, itemid) => {
    return service.put(`/additemcart/${userid}`, { iditem: itemid, count: 1 });
  },

  addpurchase: (userid, items, total) => {
    return service.put(`/addpurchase/${userid}`, {
      items: items,
      total: total,
    });
  },

  deleteItem: (userid, itemid) => {
    return service.delete(`/deleteitemcart/${userid}/${itemid}`);
  },

  updateItem: (userid, itemid, count) => {
    return service.put(`/updateitemcart/${userid}/${itemid}`, { count: count });
  },
};

export default AUTH_SERVICE;
