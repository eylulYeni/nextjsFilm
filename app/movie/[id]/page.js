import React from "react";
import Movies from "@/mocks/movies.json";
import MovieContainer from "@/containers/movie";
import { notFound } from "next/navigation";
import { getMovie } from "@/services/movie";

/* async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

async function MoviePage({ params, searchParams }) {
  /*   await delay(2000); */

  /*   const movie = await getMovie(params.id);
  console.log(movie); */

  /*   const movieDetail = Movies.results.find(
    (movie) => movie.id.toString() === params.id
  ); */

  const movieDetail = await getMovie(params.id);

  if (!movieDetail) {
    notFound();
  }

  if (searchParams.error === "true") {
    throw new Error("Error happened");
  }

  return <MovieContainer movie={movieDetail} />;
}

export default MoviePage;
