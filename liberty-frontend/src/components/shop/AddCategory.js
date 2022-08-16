import React, { Component } from 'react';
import { API } from "../../services/RESTService";
import { Redirect } from "react-router-dom";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";


export default class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: "",
            redirect: false
        };
    }

    onChangeCategory(e) {
        this.setState({ category: e.target.value, });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.category === "") {
            Swal.fire("Please type your new category. It can't be empty");
            return
        }
        await API.POST("prodCategories/add", { category: this.state.category });
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add new Category successful',
            showConfirmButton: false,
            timer: 1700
        });
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/shop/product-category-list' />
        }
        if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null
            || JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "admin") {
            return (
                <WarningPage />
            )
        }
        return (
            <div className="card dashboard-card">
                <h1 className="text-center  mb-3 h2"> Add New Category </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputBrand" className="form-label"> Category</label>
                        <input type="text" className="form-control" value={this.state.category}
                            onChange={this.onChangeCategory} id="exampleInputBrand" aria-describedby="brandHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add New Category</button>
                </form>
            </div>
        );
    }
}
