import React, { Component } from "react";
import "./Filters.scss";

export default class Filters extends Component {
  listOfAllergens = [
    "milk",
    "nuts",
    "fish",
    "eggs",
    "gluten",
    "soybeans",
    "peanuts",
    "mustard",
  ];
  palmOilOptions = ["with", "without"];

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      allergens: "",
      palmOil: "without",
      loading: true,
    };
  }

  queryChange = (event) => {
    this.setState({ query: event.target.value });
  };

  searchProducts = () => {
    this.filterSearch(this.state.query);
  };

  onAllergensChange = (event) => {
    this.setState({ allergens: event.target.value });
  };

  onPalmOilChange = (event) => {
    this.setState({ palmOil: event.target.value });
  };

  filterSearch = (productName) => {
    let url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${productName}&search_simple=1`;

    if (this.state.allergens) {
      url += `&tagtype_0=allergens&tag_contains_0=does_not_contain&tag_0=${this.state.allergens}`;
    }

    if (this.state.palmOil) {
      url += `&ingredients_from_palm_oil=${this.state.palmOil}`;
    }

    url += `&json=true`;

    this.props.getFilteredProducts(url);
  };

  render() {
    return (
      <>
        <h3>Find products by name:</h3>
        <div className="search">
          <input
            className="search-bar"
            onChange={this.queryChange}
            type="text"
            placeholder="Product name"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.searchProducts();
              }
            }}
          ></input>
        </div>
        <div className="filters-section">
          <h3>Find allergen-free products:</h3>
          <div className="allergens-filters">
            {this.listOfAllergens.map((item, i) => {
              return (
                <div key={i} className="filter-input">
                  <label htmlFor={item}>No {item}</label>
                  <input
                    name="allergies"
                    value={item}
                    type="radio"
                    key={item}
                    checked={this.state.allergens === item}
                    onChange={this.onAllergensChange}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h3>Palm Oil content:</h3>
            {this.palmOilOptions.map((item, i) => {
              return (
                <div key={i} className="filter-input">
                  <label htmlFor={item}>{item}</label>
                  <input
                    name="palm-oil"
                    value={item}
                    type="radio"
                    id={item}
                    checked={this.state.palmOil === item}
                    onChange={this.onPalmOilChange}
                  />
                </div>
              );
            })}
          </div>

          <button className="search-button" onClick={this.searchProducts}>
            Search
          </button>
        </div>
      </>
    );
  }
}

// List of API Allergens -TOP 6
// en:gluten
// en:soybeans
// en:milk
// en:nuts
// en:eggs
// en:fish
// en:peanuts

// &tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=A&additives=without&ingredients_from_palm_oil=without
