import { Component, createContext } from "react";
import AUTH_SERVICE from "./services/authService";
import ITEM_SERVICE from "./services/itemService";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const MyContext = createContext();

export default class MyProvider extends Component {
  state = {
    loggedUser: false,
    formSignup: {
      name: "",
      email: "",
      password: "",
    },
    loginForm: {
      email: "",
      password: "",
    },
    itemForm: {
      name: "",
      price: 0,
      description: "",
      file: {},
    },
    user: {
      cart: [],
    },
    totalCart: 0,
    searchItem: "",
  };

  updateDataUser = () => {
    AUTH_SERVICE.getUser()
      .then(({ data }) => {
        this.setState({
          loggedUser: true,
          user: data.user,
        });
        let total = 0;
        this.state.user.cart.forEach((item) => {
          total = total + item.itemCart.price * item.count;
        });
        this.setState({ totalCart: total });
      })
      .catch((err) => {
        Swal.fire(`Error,`, `<p>${err}</p>`, "error");
        console.log(err);
      });
  };

  handleUpdateCount = (e, obj) => {
    if (e.target.value < 1) {
      return null;
    } else {
      const a = this.state.user.cart[obj];
      a.count = Number(e.target.value);
      this.setState({ [a]: 1 });
      let total = 0;
      this.state.user.cart.forEach((item) => {
        total = total + item.itemCart.price * item.count;
      });
      this.setState({ totalCart: total });
    }
  };

  handleInput = (e, obj) => {
    if (obj === "searchItem") {
      this.setState({
        searchItem: e.target.value,
      });
    } else {
      const a = this.state[obj];
      const key = e.target.name;
      a[key] = e.target.value;
      this.setState({ obj: a });
    }
  };

  handleFile = (e, obj) => {
    const a = this.state[obj];
    const key = e.target.name;
    a[key] = e.target.files[0];
    this.setState({ obj: a });
  };

  createItem = (e, cb) => {
    e.preventDefault();

    const myFormData = new FormData();
    for (let data in this.state.itemForm) {
      if (data === "file") {
        continue;
      }
      myFormData.append(data, this.state.itemForm[data]);
    }
    myFormData.append("image", this.state.itemForm.file);

    ITEM_SERVICE.additem(myFormData)
      .then((result) => {
        this.setState({
          itemForm: {
            name: "",
            price: 0,
            description: "",
            file: {},
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (document.cookie) {
      this.updateDataUser();
    }
  }

  handleSignup = (e, cb) => {
    e.preventDefault();
    let regex = new RegExp(
      "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$"
    );
    if (regex.test(this.state.formSignup.email)) {
      AUTH_SERVICE.signup(this.state.formSignup)
        .then((result) => {
          Swal.fire(
            `Cuenta creada`,
            `Ingresa con tu correo y contraseña`,
            "success"
          );
          cb();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Correo inválido.",
        text: "Ingresa una cuenta de correo válida",
      });
    }
  };

  //UPDATE
  handleLogin = (e, cb) => {
    e.preventDefault();
    AUTH_SERVICE.login(this.state.loginForm)
      .then((result) => {
        this.updateDataUser();
        Cookies.set("name", this.state.user.name, { expires: 1 });
        setTimeout(() => {
          Swal.fire(`Bienvenido,`, `${this.state.user.name}`, "success");
        }, 2000);
        cb();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal",
          footer: '<a href="/signup">Crea tu cuenta</a>',
        });
        console.log(err);
      });
  };

  handleLogout = async (cb) => {
    await AUTH_SERVICE.logout();
    window.localStorage.clear();
    Cookies.remove("name");
    this.setState({ loggedUser: false, user: { cart: [] } });
    cb();
  };

  addItem = (e, itemid) => {
    AUTH_SERVICE.additem(this.state.user._id, itemid).then((result) =>
      this.updateDataUser()
    );
  };

  deleteItemCart = (e, itemId) => {
    AUTH_SERVICE.deleteItem(this.state.user._id, itemId).then((result) => {
      this.updateDataUser();
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          loggedUser: this.state.loggedUser,
          formSignup: this.state.formSignup,
          loginForm: this.state.loginForm,
          itemForm: this.state.itemForm,
          handleFile: this.handleFile,
          createItem: this.createItem,
          handleInput: this.handleInput,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          addItem: this.addItem,
          user: this.state.user,
          deleteitemCart: this.deleteItemCart,
          totalCart: this.state.totalCart,
          searchItem: this.state.searchItem,
          updateDataUser: this.updateDataUser,
          handleUpdateCount: this.handleUpdateCount,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
