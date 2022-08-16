import React, { Component } from "react";
import { API } from "../../services/RESTService";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.state = { categories: [] };
    }


    async componentDidMount() {
        const category = await API.GET("prodCategories/", "", null);
        this.setState({ categories: category });
    }


    async deleteCategory(id) {
        await API.DELETE("prodCategories/" + id);

        // Setting the state by assigning elements unless the deleted element
        this.setState({
            categories: this.state.categories.filter((el) => el._id !== id),
        });
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deleted successful',
            showConfirmButton: false,
            timer: 1600
        });
    }

    categoryList() {
        return this.state.categories.map((category) => {
            return (
                <tr>
                    <td>{category.category}</td>
                    <td><a href="#" onClick={async () => {
                        await this.deleteCategory(category._id)
                    }}>Delete</a></td>
                </tr>
            );
        });
    }

    render() {
        if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null
            || JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "admin") {
                return (
                    <WarningPage />
                )
        }
        return (
            <div className="card dashboard-card">
                <h1 className="text-center mb-3 h2">Product Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.categoryList()}</tbody>
                </table>
            </div>
        );
    }
}
