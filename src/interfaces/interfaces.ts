export interface ImoviesData {
    "popularity": number;
    "vote_count": number;
    "video": boolean;
    "poster_path": string;
    "id": number;
    "adult": boolean;
    "backdrop_path": string;
    "original_language": string;
    "original_title": string;
    "genre_ids": Array<number>;
    "title": string;
    "vote_average": number;
    "overview": string;
    "release_date": string;
}

export interface IMovieApiResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: Array<ImoviesData>
}

export interface IlocalApiRequest {
    queryType: string;
    pageId?: number;
    movieId?: number | string;
    genreName?: string;
}
