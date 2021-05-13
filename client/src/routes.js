import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import FormItem from "./components/FormItem";
import Home from "./components/Home";
import Login from "./components/Login";
import MyNavbar from "./components/Navbar";
import Signup from "./components/Signup";
import Item from "./components/Item";
import { Container } from "react-bootstrap";
import UserPage from "./components/UserPage";
import UserCart from "./components/UserCart";
import Footer from "./components/Footer";
import SearchItem from "./components/SearchItem";
import Searching from "./components/Searching";
import AllArticles from "./components/AllArticles";
import NotFoundPage from "./components/NotFoundPage";

export default function Routes() {
  return (
    <Router>
      <MyNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/additem" component={FormItem} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/item/:id" component={Item} />
          <Route exact path="/userpage" component={UserPage} />
          <Route exact path="/usercart" component={UserCart} />
          <Route exact path="/search/:item" component={SearchItem} />
          <Route exact path="/searching/:item" component={Searching} />
          <Route exact path="/allarticles" component={AllArticles} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}
