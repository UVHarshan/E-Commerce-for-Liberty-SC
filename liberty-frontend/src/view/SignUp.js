import React, {useState} from "react";
import {Link, Redirect, useHistory} from 'react-router-dom';
import {API} from "../services/RESTService";
import Swal from "sweetalert2";


export default function SignUp() {

    // Using 'useState' hook
    const [isValidated, setIsValidated] = useState(false);
    const [error, setError] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");


//   const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

// Function to be called when user clicks the 'register' button
    async function register(e) {
        e.preventDefault();
        setError("");
        setIsValidated(true);
        if (password !== passwordVerify && password !== "") {
            setError("  Password are not matched  ");
            return;
        }

        if (password.length < 6) {
            setError("  Please enter a password at least of 6 characters  ")
        }

        try {
            const registerData =
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    mobile,
                    deliveryAddress,
                    password
                };
            // sending data to the backend as a JSON object
            API.POST("customers/add", "", registerData).then(async () => {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your account has been created successfully. To continue the process please login with given credentials',
                    showConfirmButton: false,
                    timer: 1700
                });
                history.push("/login");
            });

        } catch (err) {
            setError("Error: " + err.response.data.errorMessage);
            console.log(err);
        }
    }

    if (JSON.parse(localStorage.getItem("liberty-store-userData"))!== null) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="py-5 container">
            <div className="card dashboard-card">
                <h1 className="text-center"> Create an account </h1>
                <div className="card-body">
                    <form onSubmit={register} className="row">
                        <div className="mb-3 col-12 col-lg-6">
                            <label for="exampleInputFName" className="form-label"> First Name</label>
                            <input type="text" required className="form-control" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                            {isValidated && firstName === "" &&
                            <small className="text-danger">This field can't be null</small>}
                        </div>
                        <div className="mb-3 col-12 col-lg-6">
                            <label for="exampleInputLName" className="form-label"> Last Name</label>
                            <input type="text" className="form-control" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)} id="exampleInputLName"
                                   aria-describedby="emailHelp"/>
                            {isValidated && lastName === "" &&
                            <small className="text-danger">This field can't be null</small>}
                        </div>
                        <div className="mb-3 col-12 col-lg-6">
                            <label htmlFor="exampleInputUName" className="form-label"> userName</label>
                            <input type="text" className="form-control" value={userName}
                                   onChange={(e) => setUserName(e.target.value)} id="exampleInputUName"
                                   aria-describedby="emailHelp"/>
                            {isValidated && userName === "" &&
                            <small className="text-danger">This field can't be null</small>}

                        </div>
                        <div className="mb-3 col-12 col-lg-6">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} id="exampleInputUName"
                                   aria-describedby="emailHelp"/>
                            {isValidated && userName === "" &&
                            <small className="text-danger">This field can't be null</small>}

                            {/*<nput type="st" className="form-control" id="exampleInputEmail1" value={email}*/}
                            {/*       onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>*/}
                            {/*{isValidated && email === "" && <small className="text-danger">This field can't be null</small>}*/}

                        </div>
                        <div className="mb-3">
                            <label for="exampleInputMobile" className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" id="exampleInputMobile" value={mobile}
                                   onChange={(e) => setMobile(e.target.value)} aria-describedby="emailHelp"/>
                            {isValidated && mobile === "" &&
                            <small className="text-danger">This field can't be null</small>}

                        </div>
                        <div className="mb-3 col-12">
                            <label htmlFor="exampleInputAddressD" className="form-label">Delivery address</label>
                            <input type="text" className="form-control" id="exampleInputPostalCode"
                                   value={deliveryAddress}
                                   onChange={(e) => setDeliveryAddress(e.target.value)}/>
                            {isValidated && deliveryAddress === "" &&
                            <small className="text-danger">This field can't be null</small>}

                        </div>

                        <div className="mb-3 col-12 col-sm-6">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            {isValidated && password === "" &&
                            <small className="text-danger">This field can't be null</small>}

                        </div>
                        <div className="mb-3 col-12 col-sm-6">
                            <label for="exampleInputPassword2" className="form-label"> Retype Password</label>
                            <input type="password" className="form-control" value={passwordVerify}
                                   onChange={(e) => setPasswordVerify(e.target.value)}/>
                            {isValidated && passwordVerify === "" &&
                            <small className="text-danger">This field can't be null</small>}

                        </div>
                        <div className="mb-3">
                            <Link className="float-end" to="/login">Already have an account?</Link>
                        </div>
                        {error !== "" && < div className="alert alert-danger" role="alert">{error}</div>}
                        <button type="submit" className="btn btn-primary px-5 float-end"> Create an account!</button>
                    </form>
                </div>
            </div>
        </div>
  );
}
