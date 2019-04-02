import React from "react";
import "./Login.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import FadeTransition from "./Transitions/fadeTransitions";

class LoginAndRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLogin() {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    });
  }

  showRegister() {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    });
  }

  render() {
    return (
      <div className="root">
        <div>
          <div className="selected" onClick={this.showLogin.bind(this)}>
            Login
          </div>
          <div className="selected" onClick={this.showRegister.bind(this)}>
            Register
          </div>
        </div>

        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <Login />
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <Register />
          </div>
        </FadeTransition>
      </div>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {};
  }

  submitLogin(e) { }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="Input your username"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            id="password"
            placeholder="Input your password"
          />
        </FormGroup>
        <FormGroup>
          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}
          >
            Login
          </button>
        </FormGroup>
      </Form>
    );
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: []
    };
  }

  showErrorInformation(element, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          element,
          msg
        }
      ]
    }));
  }

  clearErrorInformation(element) {
    this.setState(prevState => {
      let newArr = [];
      for (let error of prevState.errors) {
        if (element !== error.element) {
          newArr.push(error);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
  }

  sumbitRegister(e) {
    if (this.state.username === "") {
      this.showErrorInformation("username", "Username cannot be empty!");
      console.log("username cannot be empty");
    }
    if (this.state.email === "") {
      this.showErrorInformation("email", "Email cannot be empty!");
      console.log("username cannot be empty");
    }
    if (this.state.password === "") {
      this.showErrorInformation("password", "Password cannot be empty!");
      console.log("username cannot be empty");
    }
  }

  render() {
    var emailError = null;
    var usernameError = null;
    var passwordError = null;

    for (let error of this.state.errors) {
      if (error.element === "username") {
        usernameError = error.msg;
      }
      if (error.element === "password") {
        passwordError = error.msg;
      }
      if (error.element === "email") {
        emailError = error.msg;
      }
    }

    return (
      <Form>
        <FormGroup>
          <Label>Email</Label>
          <Input name="email" id="email" placeholder="Input your Email" />
          <small>{emailError ? emailError : ""}</small>
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="Input your username"
          />
          <small>{usernameError ? usernameError : ""}</small>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            id="password"
            placeholder="Input your password"
          />
          <small>{passwordError ? passwordError : ""}</small>
        </FormGroup>
        <FormGroup>
          <button
            type="button"
            className="register-btn"
            onClick={this.sumbitRegister.bind(this)}
          >
            Register
          </button>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginAndRegister;