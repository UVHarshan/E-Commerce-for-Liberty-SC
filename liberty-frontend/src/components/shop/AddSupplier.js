import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { API } from "../../services/RESTService";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";


export default class AddSupplier extends Component {
    constructor(props) {
        super(props);

        // Method Binding
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            mobile: "",
            email: "",
            redirect: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeMobile(e) {
        this.setState({
            mobile: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const supplier = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email
        };

        // connecting frontend to the backend 
        await API.POST("suppliers/add", supplier).then(() => this.setState({ redirect: true }));
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add new supplier successful',
            showConfirmButton: false,
            timer: 1700
        }).then(Array.from(document.querySelectorAll("input")).forEach(input => (input.value = "")));
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
                <h1 className="text-center mb-3 h2">Add New Supplier</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Name</label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.name} onChange={this.onChangeName} aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Mobile Number </label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.mobile} onChange={this.onChangeMobile} aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email}
                            onChange={this.onChangeEmail} aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary px-5 float-end"> Add</button>
                </form>
            </div>
        );
    }
}
