import React, { Component } from "react";
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav>
          <h2>MOVIES</h2>
          {/* <input
            type="text"
            placeholder="search movie"
            onchange={this.props.search}
          /> */}
        </nav>

        <div className="categories">
        
          <button onClick={this.props.change} name="popolar"> POPULAR</button>
          <button onClick={this.props.change} name="trending">TRENDING</button>
           <button onClick={this.props.change} name="upcoming">UPCOMING</button>
           <button onClick={this.props.change} name="top">TOP RATED</button>
          {/* <button></button>  */}
        </div>

        <div className="language">
          <button onClick={this.props.add} name="eng">
            ENGLISH
          </button>
          <button onClick={this.props.add} name="marathi">
            MARATHI
          </button>
          <button onClick={this.props.add} name="hi">
            HINDI
          </button>
          <button onClick={this.props.add} name="tamil">
            TAMIL
          </button>
          <button onClick={this.props.add} name="te">
            TELEGU
          </button>
        </div>
      </div>
    );
  }
}
