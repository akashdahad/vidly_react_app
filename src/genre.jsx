import React, { Component } from "react";
import { getGenres } from "./fakeGenreService";
class Genre extends Component {
  state = {
    genre: getGenres(),
  };
  render() {
    return (
      <ul className="list-group">
        <li
          className={
            this.props.currentgen === null
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => this.props.onGen(null)}
          style={{ cursor: "pointer" }}
        >
          All Genres
        </li>
        {this.state.genre.map((genre) => (
          <li
            key={genre._id}
            className={
              this.props.currentgen === genre._id
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onGen(genre._id)}
            style={{ cursor: "pointer" }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Genre;
