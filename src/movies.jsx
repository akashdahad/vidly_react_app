import React, { Component } from "react";
import { getMovies } from "./fakeMovieService";
import "./pagination";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import Genre from "./genre";
import { GenFilter } from "./utils/gen";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pagesize: 4,
    currentpage: 1,
    genId: null,
  };
  render() {
    let values = GenFilter(this.state.movies, this.state.genId);

    const movies = paginate(
      values,
      this.state.currentpage,
      this.state.pagesize
    );
    return (
      <div className="mt-5 p-2">
        <div className="row">
          <div className="col-md-3">
            <Genre onGen={this.handleGenre} currentgen={this.state.genId} />
          </div>
          <div className="col-md-9">
            <h6>{this.getMessage(values)}</h6>
            <table className="table table-hover mt-3 ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td> {movie.title} </td>
                    <td> {movie.genre.name} </td>
                    <td> {movie.numberInStock} </td>
                    <td> {movie.dailyRentalRate} </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie._id)}
                        className="btn btn-md btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={values.length}
              pageSize={this.state.pagesize}
              onPageChange={this.onPageChange}
              currentPage={this.state.currentpage}
            />
          </div>
        </div>
      </div>
    );
  }

  handleGenre = (gen) => {
    this.setState({ genId: gen });
  };

  onPageChange = (page) => {
    this.setState({ currentpage: page });
  };

  //   getTotalMovies = (movies) => {
  //     let total = movies.length;
  //     return total;
  //   };

  getMessage = (movies) => {
    console.log(movies);
    let t = movies.length;
    if (t > 0) {
      return "There are " + t + " Movies in  Database ";
    } else {
      return " There are No Movies in Database";
    }
  };

  handleDelete = (mid) => {
    const movies = this.state.movies.filter((m) => m._id !== mid);
    this.setState({ movies });
  };
}

export default Movies;
