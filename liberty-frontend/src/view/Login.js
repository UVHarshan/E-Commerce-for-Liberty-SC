import React, {useState} from "react";
import {Link, Redirect, useHistory} from 'react-router-dom';
import {API} from "../services/RESTService";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isHide, setIsHide] = useState(true);
    const history = useHistory();

    async function login(e) {
        e.preventDefault();
        if (userName === "") {
            setError("Username can't be null"); 
            return;           
        } else if (password === "") {
            setError("Password can't be null");      
            return;      
        }

        try {
            const loginData = {userName, password};
            let authData = await API.POST("authentication", loginData);

            if (authData.userId === "") {
                setError(" Username or password is incorrect");
                return;
            }
            
            localStorage.setItem("liberty-store-userData", JSON.stringify(authData));
            window.location.reload();
            history.push("/");        
        } catch (err) {
            setError("Error: " + err.response.data.errorMessage);
        }

    }

    if (JSON.parse(localStorage.getItem("liberty-store-userData")) !== null) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="py-5 container">
            <div className="card mx-auto" style={{maxWidth: "500px"}}>
                <h1 className="text-center pt-4">Login</h1>
                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                            <input type="text" className="form-control"
                                   onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type={isHide ? "password" : "text"} className="form-control"
                                   onChange={e => setPassword(e.target.value)}/>
                            <small className="text-primary text-decoration-underline" style={{cursor: 'pointer'}}
                                   onClick={() => setIsHide(!isHide)}>&nbsp;
                                <i className={isHide ? "feather-eye" : "feather-eye-off"}/>{isHide ? '  show' : '  Hide'}
                            </small>
                        </div>
                        <div className="mb-3">
                            <Link to="/forgot-password"> Forgot Password?</Link>
                            <Link className="float-end" to="/signup">Is new user?</Link>
                        </div>
                        {error !== "" && < div className="alert alert-danger" role="alert">{error}</div>}
                        <button type="submit" className="btn btn-primary float-end px-5"> Login</button>
                    </form>
                </div>
            </div>
        </div>
  );
}
