import React, { Component } from "react";
import { getMovies } from "./fakeMovieService";
import "./pagination";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import Genre from "./genre";
import { GenFilter } from "./utils/gen";
import { getGenres } from "./fakeGenreService";
import MoviesTable from "./moviestable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pagesize: 4,
    currentpage: 1,
    genId: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

  render() {
    let values = GenFilter(this.state.movies, this.state.genId);

    let sortedMovies = _.orderBy(
      values,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(
      sortedMovies,
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
            <h6 className="pt-5">{this.getMessage(values)}</h6>
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

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
