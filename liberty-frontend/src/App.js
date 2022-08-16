import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Shop from "./layout/shop/shopMain.component";
import HomePage from "./view/HomePage";
import SignUp from "./view/SignUp";
import Login from "./view/Login";
import Navbar from "./layout/navbar.component";
import Footer from "./layout/footer.component";
import CheckoutPage from "./view/CheckoutPage";
import CategoryViewPage from "./view/CategoryViewPage";
import MyProfile from "./view/MyProfile";
import PaymentCart from "./view/PaymentCart";
import ProductViewPage from "./view/ProductViewPage";

function App() {

    return (
        <Router>
            <Navbar />
            <div className="clientWrapper">
                <Switch>
                    <Route path="/shop" component={Shop} />
                    <Route path="/my-profile" component={MyProfile} />
                    <Route path="/payment" component={PaymentCart} />
                    <Route path="/product/:id1" component={ProductViewPage} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/category" component={CategoryViewPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
            <Footer />

        </Router>

    );
}

export default App;
