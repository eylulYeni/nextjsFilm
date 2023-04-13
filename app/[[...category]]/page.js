import HomeContainer from "@/containers/home";
import React from "react";
import Movies from "@/mocks/movies.json";

import {
  getSingleCategory,
  getCategories,
  getPopularMovies,
  getTopRatedMovies,
} from "@/services/movie";

/* 
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

async function HomePage({ params }) {
  let selectedCategory;

  /*   const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: popularMovies } = await getPopularMovies(); */

  const [
    { results: topRatedMovies },
    { results: popularMovies },
    { genres: categories },
  ] = await Promise.all([
    getTopRatedMovies(),
    getPopularMovies(),
    getCategories(),
  ]);
  /*   console.log(categories); */

  if (params.category?.length > 0) {
    const { results } = await getSingleCategory(params.category[0]);
    selectedCategory = results;
  }
  /*  console.log(topRatedMovies); */

  return (
    <HomeContainer
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      categories={categories}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? selectedCategory.slice(0, 7) : [],
      }}
    />
  );
}

export default HomePage;
