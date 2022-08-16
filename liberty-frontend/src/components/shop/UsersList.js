import React, { Component } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { API } from "../../services/RESTService";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [] };
  }

  // Retrieving users from the database
  async componentDidMount() {
    const users = await API.GET("users/", "", null);
    this.setState({ users: users })
  }


  async deleteUser(id) {
    await API.DELETE("users/" + id);
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Deleted user successful',
      showConfirmButton: false,
      timer: 1700
    });

    // Setting the state by assigning elements unless the deleted element
    this.setState({
      users: this.state.users.filter((el) => el._id !== id), // Filtering the users array
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
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <MaterialTable
          title="Registered Employees"
          columns={[
            { title: "Name", field: "name" },
            { title: "UserName", field: "userName" },
            { title: "User Type", field: "userType" },
            { title: "Action", field: "action" },
          ]}
          data={this.state.users.map((user, index) => ({
            name: user.name,
            userName: user.userName,
            userType: user.userType,
            action: (
              <div>
                <button className="btn btn-danger px-3 py-1 mt-1" onClick={() => this.deleteUser(user._id)}>Delete</button>
                {" "}
                <Link to={"/shop/edit-user/" + user._id}>
                  <button className="btn btn-warning px-4 py-1 mt-1">  Edit  </button>
                </Link>
              </div>
            ),
          }))}
          options={{
            sorting: true,
          }}
        />
      </div>
    );
  }
}
