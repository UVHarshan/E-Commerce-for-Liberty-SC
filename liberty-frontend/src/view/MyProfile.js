import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import usrIcon from "../assets/images/user-icon.png";
import {API} from "../services/RESTService";

export default class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
            customer: ""
        }
    }

    async componentDidMount() {
        //    TODO: Get data from bg. Use signed user id
        const customer = await API.GET("customers/" +
            JSON.parse(localStorage.getItem("liberty-store-userData")).userId);
        this.setState({customer:customer});
    }

    render() {
        if (JSON.parse(localStorage.getItem("liberty-store-userData"))=== null ||
            JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "customer") {
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="py-5 container">
                <div className="card mx-auto p-2 p-sm-4" style={{maxWidth: "500px"}}>
                    <h1 className="text-center mb-3 h2">My Profile</h1>
                    <div className="text-center">
                        <img src={usrIcon} alt="profile icon" width={180} height={180} className="mx-auto"/>
                    </div>
                    <div className="h6 mx-auto my-3 align-content-center">
                        <table>
                            <thead className="d-none"><tr><th>_</th><th>_</th></tr></thead>
                            <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.customer.firstName}</td>
                            </tr>
                            <tr>
                                <td>Second Name</td>
                                <td>{this.state.customer.lastName}</td>
                            </tr>
                            <tr>
                                <td>username</td>
                                <td>{this.state.customer.userName}</td>
                            </tr>
                            <tr>
                                <td>Contact Number</td>
                                <td>{this.state.customer.mobile}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.customer.email}</td>
                            </tr>
                            <tr>
                                <td>Delivery Address</td>
                                <td>{this.state.customer.deliveryAddress}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
