import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Login.css";
import { alertSuccess, alertError } from "../../utils/alerts";
import isLoggedIn from "../../utils/isLoggedIn";
import { userLogin } from "../../utils/apiMethods";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isLoggedIn() && navigate("/admin");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    setLoading(true);
    userLogin(data)
      .then((res) => {
        alertSuccess(res.data.message);
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        navigate("/admin");
      })
      .catch((error) => {
        alertError(error.response.data.error);
        setLoading(false);
      });
  };
  return (
    <div className="text-center container main-form">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h3>Welcome</h3>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="johndoe@example.com"
              name="email"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button disabled={loading ? true : false} className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3 ">
            Don't have an account? Please <a href="/signup">Signup</a>
          </p>
        </form>
      </main>
    </div>
  );
}
