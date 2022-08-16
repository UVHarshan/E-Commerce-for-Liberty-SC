import React, { Component } from 'react';
import { API } from "../../services/RESTService";
import { Redirect } from "react-router-dom";
import WarningPage from "./WarningPage";
import Select from "react-select";
import Swal from "sweetalert2";

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        // Method Binding
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            userName: "",
            password: "",
            userType: "",
            redirect: false
        };
    }


    componentDidMount() {
        API.GET("users/" + this.props.match.params.id)
            .then(responseData => {
                this.setState({
                    name: responseData.name,
                    userName: responseData.userName,
                    password: responseData.password,
                    userType: responseData.userType
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeUserType(e) {
        this.setState({
            userType: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault(); // What is the usage??????
        const user = {
            name: this.state.name,
            userName: this.state.userName,
            password: this.state.password,
            userType: this.state.userType
        };
        await API.POST("users/update/" + this.props.match.params.id, "", user);
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Update the user successful',
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
                <h1 className="text-center mb-3 h2">Modify User Details</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Name</label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.name} onChange={this.onChangeName} aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputBrand" className="form-label"> Username </label>
                        <input type="text" required className="form-control" id="exampleInputBrand"
                            value={this.state.userName} onChange={this.onChangeUsername}
                            aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" required className="form-control" id="exampleInputPassword1"
                            value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">User Type</label>
                        <select className="form-select" aria-label="Default select example"
                            value={this.state.userType} onChange={this.onChangeUserType}>
                            <option value="admin">Admin</option>
                            <option value="cashier">Cashier</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 float-end"> Edit User</button>
                </form>
            </div>
        );
    }
}
