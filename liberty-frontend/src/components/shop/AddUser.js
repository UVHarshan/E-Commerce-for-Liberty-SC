import React, { Component } from 'react';
import { API } from "../../services/RESTService";
import { Redirect } from "react-router-dom";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";
import Select from "react-select";

export default class AddUser extends Component {
    constructor(props) {
        super(props);

        // Method Binding
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            username: "",
            password: "",
            userType: "",
            redirect: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.userType === "") {
            Swal.fire('Please select the user Type');
            return
        }

        const user = {
            name: this.state.name,
            userName: this.state.username,
            password: this.state.password,
            userType: this.state.userType
        };

        await API.POST("users/add", user);
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add new user successful',
            showConfirmButton: false,
            timer: 1700
        });
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/shop/user-list' />
        }
        if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null
            || JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "admin") {
                return (
                    <WarningPage />
                )
        }
        return (
            <div className="card dashboard-card">
                <h1 className="text-center mb-3 h2">Add New Employee</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Name</label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.name} onChange={this.onChangeName} aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Username </label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.username} onChange={this.onChangeUsername}
                            aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" required className="form-control" id="exampleInputPassword1"
                            value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">User Type</label>
                        <Select id="select-product"
                            options={["admin", "cashier"].map(uType => ({ value: uType, label: uType }))}
                            onChange={e => this.setState({ userType: e.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary px-4 float-end"> Add New User</button>
                </form>
            </div>
        );
    }
}
