import React, { Component } from "react";
import fire from "../Config/Fire";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import queryString from "query-string";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      select: "lyric",
      qVal: queryString.stringify({ q: " " }),
      urlTo: "search"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  //Stateless functional component
  logout() {
    fire.auth().signOut();
  }

  handleSelectChange(event) {
    let goTo = "";
    if (event.target.value === "lyric") {
      goTo = "search";
    } else if (event.target.value === "artist") {
      goTo = "searchArtist";
    }
    this.setState({
      select: event.target.value,
      urlTo: goTo
    });
  }

  handleChange(event) {
    const newWord = event.target.value;
    const searchObj = {
      q: newWord
    };
    const stringified = queryString.stringify(searchObj);
    this.setState({
      value: newWord,
      qVal: stringified
    });
  }

  handleSubmit(event) {
    const url = "/" + this.state.urlTo + "/?" + this.state.qVal;
    this.props.history.push(url);
    event.preventDefault();
  }

  render() {
    var loginRegisterCont = null;
    if (fire.auth().currentUser == null) {
      this.setStates = {
        isLogin: false,
        isLogout: true
      };
      loginRegisterCont = <Link to="/login">Login|Register</Link>;
    } else {
      this.setStates = {
        isLogin: true,
        isLogout: false
      };
      var user = fire.auth().currentUser.email;

      loginRegisterCont = <button onClick={this.logout}>{user} Logout</button>;
    }
    return (
      <nav className="navbar navbar-light bg-light">
        <Link className="col-sm-4" to={"/"}>
          LyricSearching
        </Link>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row align-items-center">
            <div className="col-sm-4 my-1">
              <label className="sr-only" htmlFor="inlineFormInputName">
                Search for:
              </label>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputName"
                placeholder="Search for:"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto my-1">
              <label
                className="mr-sm-2 sr-only"
                htmlFor="inlineFormCustomSelect"
              >
                Preference
              </label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                value={this.state.select}
                onChange={this.handleSelectChange}
              >
                <option value="lyric">Lyric</option>
                <option value="artist">Artist</option>
              </select>
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <button type="submit" className="btn btn-outline-primary">
            <FontAwesomeIcon icon="heart" />
          </button>
        </div>

        <NavItem>{loginRegisterCont}</NavItem>
      </nav>
    );
  }
}

export default NavBar;
