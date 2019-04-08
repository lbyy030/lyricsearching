import React, { Component } from "react";
import ArtistsResults from "../../components/ArtistsResults/ArtistsResults";
import SimpleFavorite from "../../SimpleFavoriteList/SimpleFavortieList";
import TopChartArtists from "../../components/TopChartArtists/TopChartArtists";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchArtist.css";

class SearchArtist extends Component {
  handleClick() {
    this.props.action();
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    return (
      <div className="SearchArtist">
        <Container>
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body" />
                </div>
                <div className="col">
                  <input
                    className="form-control form-control-lg form-control-borderless"
                    type="search"
                    placeholder="Search for artist"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Row>
            <Col md="8" xs="12">
              <ArtistsResults />
            </Col>
            <Col md="4" xs="12">
              <SimpleFavorite />
              <TopChartArtists />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchArtist;