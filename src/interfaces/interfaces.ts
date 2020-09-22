import { IconButtonProps } from '@material-ui/core';

export interface ImoviesData {
  "data"?: {};
  "results"?: Array<ImoviesData>;
  "popularity"?: number;
  "vote_count"?: number;
  "video"?: boolean;
  "poster_path"?: string;
  "id"?: number;
  media_type?: string;
  "adult"?: boolean;
  "backdrop_path"?: string;
  "original_language"?: string;
  "original_title"?: string;
  "genre_ids"?: Array<number>;
  "title"?: string;
  "vote_average"?: number;
  "overview"?: string;
  "release_date"?: string;
}

export interface IlocalApiRequest {
  movieDataToAdd?: ImoviesData;
  queryType: string;
  query?: string;
  pageId?: number;
  movieId?: string;
  genreName?: string;
}

export interface IApiRespResults {
  results?: Array<ImoviesData>,
  page?: number;
  total_results?: number;
  total_pages?: number;
  data?: IApiRespResults | ImoviesData;
}

export interface IMovieApiResponse {
  data?: IApiRespResults | ImoviesData;
  "id"?: number;
}

export interface IconsInfo {
  color: IconButtonProps;
  text: string
}

export interface IMatchInterface {
  location?: {
    search: string;
    pathname: string;
  };
  match?:
    {
      params: {
        genreName: string;
      };
    },
  history?: {
    location:
      {
        search: any;
        pathname: string;
      };
  }
}

export interface IApiUrlInterface {
  [params: string] : string;
  queryType?: string;
  search: string;
  popular: string;
  trending: string;
  nowplaying: string;
  genres: string;
}

export interface IResultsFromDb {
  data: { results: [{[p: string]: string}]}
}
