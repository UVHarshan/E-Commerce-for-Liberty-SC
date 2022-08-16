import {Redirect, Route, Switch} from "react-router-dom";
import '../../assets/styles/styles.css';
import Sidebar from "./sidebar.component";
import AddUser from "../../components/shop/AddUser";
import AddCategory from "../../components/shop/AddCategory";
import AddNewProduct from "../../components/shop/AddNewProduct";
import ProductsList from "../../components/shop/ManageProducts";
import CategoryList from "../../components/shop/CategoryList";
import UsersList from "../../components/shop/UsersList";
import EditUser from "../../components/shop/EditUser";
import UpdateProduct from "../../components/shop/UpdateProduct";
import AddBill from "../../components/shop/AddBill";
import Dashboard from "../../components/shop/dashboard.component";
import AddSupplier from "../../components/shop/AddSupplier";
import SendOrder from "../../components/shop/sendOrder";
import Report from "../../components/shop/Report";
import PowerBI from "../../components/shop/PowerBI";


function Shop() {
    if (JSON.parse(localStorage.getItem("liberty-store-userData"))=== null
        || JSON.parse(localStorage.getItem("liberty-store-userData")).userType === "customer") {
        return (
            <Redirect to="/login"/>
        )
    }

    return (
        <div className="row m-0 p-0">
            <div className="col-3 col-lg-2 sidebar-col m-0 p-0">
                <Sidebar/>
            </div>
            <div className="col-9 col-lg-10 m-0 px-3 py-5">
                <Switch>
                    <Route path="/shop/add-product" component={AddNewProduct}/>
                    <Route path="/shop/add-category" component={AddCategory}/>
                    <Route path="/shop/product-list" component={ProductsList}/>
                    <Route path="/shop/product-category-list" component={CategoryList}/>
                    <Route path="/shop/add-bill" component={AddBill}/>
                    <Route path="/shop/add-user" component={AddUser}/>
                    <Route path="/shop/user-list" component={UsersList}/>
                    <Route path="/shop/add-supplier" component={AddSupplier}/>
                    <Route path="/shop/send-order" component={SendOrder}/>
                    <Route path="/shop/edit-user/:id" component={EditUser}/>
                    <Route path="/shop/edit-product/:id" component={UpdateProduct}/>
                    <Route path="/shop/report" component={Report}/>
                    <Route path="/shop/power-bi" component={PowerBI}/>
                    <Route path="/shop/" component={Dashboard}/>
                </Switch>
            </div>
        </div>
  );
}

export default Shop;
