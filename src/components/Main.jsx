import React, { Component } from "react";
import axios from "axios";

import Header from "../components/Header.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],

      err: "",
      language: "en",
      category: "popular",
      li: null,
      id: "",
    };
  }

  fetchData = () => {
    const api = "92a26a0f3494c37de0d782903df76c79";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.category}?api_key=${api}&with_original_language=${this.state.language}&page=1`
      )
      .then((res) => {
        // console.log(res.data);
        this.setState({
          movies: res.data.results,
        });
      })
      .catch((err) => {
        this.setState({
          err: err,
        });
      });
  };

  setlang = (e) => {
    if (e.target.name === "marathi") {
      this.setState({ language: "mr" });
    } else if (e.target.name === "hi") {
      this.setState({ language: "hi" });
    } else if (e.target.name === "tamil") {
      this.setState({ language: "ta" });
    } else if (e.target.name === "te") {
      this.setState({ language: "te" });
    } else {
      this.setState({ language: "en" });
    }
  };

  change = (e) => {
    if (e.target.name === "popular") {
      this.setState({ category: "popular" });
    } else if (e.target.name === "trending") {
      this.setState({ category: "trending" });
    } else if (e.target.name === "upcoming") {
      this.setState({ category: "upcoming" });
    } else if (e.target.name === "top") {
      this.setState({ category: "top_rated" });
    }
  };

  // marathi = () => {
  //   // window.location.reload();
  //   console.log("hello");
  //   this.setState({ language: "mr" });
  // };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.language !== this.state.language ||
      prevState.category !== this.state.category
    ) {
      this.fetchData();
    }
  }

  // search = (e) => {
  //   let s = e.target.value;
  //   let filtermovie = this.state.movies.filter((sm) => {
  //     if (sm.original_title.toLowerCase().includes(s.toLowerCase())) {
  //       return filtermovie;
  //     } else {
  //       return null;
  //     }
  //   });
  //   this.setState({ movies: filtermovie });
  // };

  close = () => {
    document.getElementById("showtrailor").style.display = "none";
    document.getElementById("iframe").style.display = "none";
    document.getElementById("close").style.display = "none";
  };
  trailor = () => {
    document.getElementById("showtrailor").style.display = "block";
    document.getElementById("iframe").style.display = "block";
    document.getElementById("close").style.display = "block";
    this.state.movies.map((movie) => {
      return this.setState({ id: movie.id });
    });

    const apikey = "92a26a0f3494c37de0d782903df76c79";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/videos?api_key=${apikey}&language=en-US`
      )
      .then((response) => {
        console.log(response.data.results[0].key);
        if (response.data.results.length) {
          // let url = `https://www.youtube.com/embed/${response.data.results[0].key}`;
          this.setState({
            li: `https://www.youtube.com/embed/${response.data.results[0].key}`,
          });
        }
        console.log(this.state.li);
      })

      .catch((reject) => {
        this.setState({
          err: "err",
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    console.log(this.state.id);
    // console.log(this.state.language);
    // console.log(this.state.category);
    return (
      <div>
        <Header add={this.setlang} search={this.search} change={this.change} />
      
        {/* </div> */}
        <div className="container">
          {this.state.movies.map((movie) => {
            return (
              <div>
                <div key={movie.id} className="movie-container">
                  <h1>{movie.original_title}</h1>

                  <p>release date: {movie.release_date}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                  <h4>views: {movie.popularity}</h4>
                  <h5>Likes: {movie.vote_count}</h5>
                  <button onClick={this.trailor}>view trailor</button>
                </div>
                <div>
                  <div id="showtrailor">
                    {/* <h1>{movie.original_title}</h1> */}
                    <iframe id="iframe" src={this.state.li}></iframe>
                    <button id="close" onClick={this.close}>
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
