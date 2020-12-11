import React, { Component } from "react";
class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } 
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelete } = this.props;

    return (
      <table className="table table-hover mt-3 ">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.rais("title")}
              scope="col"
            >
              Name <i className="fas fa-sort"></i>
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("genre.name")}
              scope="col"
            >
              Genre
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("numberInStock")}
              scope="col"
            >
              Stock
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("dailyRentalRate")}
              scope="col"
            >
              Rate
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("action")}
              scope="col"
            >
              {" "}
              Action
            </th>
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
                  onClick={() => onDelete(movie._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
