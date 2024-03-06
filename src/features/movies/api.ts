import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  Movie,
  MovieSearchFilter,
  SearchMovieResponse,
} from "../../shared/types/movies";

const BASE_URL = "http://www.omdbapi.com/";
const API_KEY = "4978c858";

export const searchMovieById = async (
  id: string
): Promise<Movie | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const useSearchMovieById = (id: string) =>
  useQuery({
    queryKey: [id],
    queryFn: () => searchMovieById(id),
  });

export const searchMovies = async ({
  search = "batman",
  pageNumber,
}: MovieSearchFilter): Promise<SearchMovieResponse | undefined> => {
  try {
    const response = await fetch(
      `${BASE_URL}?s=${search}&page=${pageNumber}&type=movie&apikey=${API_KEY}`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const useSearchMovies = (searchString?: string) =>
  useInfiniteQuery({
    queryKey: ["movies", searchString],
    queryFn: ({ pageParam }) =>
      searchMovies({ search: searchString, pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select(data) {
      return {
        pageParams: data.pageParams,
        movies: data.pages
          .flatMap((pages) => pages?.Search)
          .filter((page) => page !== undefined),
      };
    },
  });
