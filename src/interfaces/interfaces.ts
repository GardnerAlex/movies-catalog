import { IconButtonProps } from '@material-ui/core';

export interface ImoviesData {
    "popularity": number;
    "vote_count": number;
    "video": boolean;
    "poster_path": string;
    "id": number;
    media_type: string;
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
    results: Array<ImoviesData>;
    page?: number;
    total_results?: number;
    total_pages?: number;
}

export interface IlocalApiRequest {
    movieDataToAdd?: ImoviesData;
    queryType: string;
    query?: string;
    pageId?: number;
    movieId?: string;
    genreName?: string;
}

// export interface IAddToDbRequest {
//     movieDataToAdd: ImoviesData;
//     queryType: PersonalStorages;
// }

export interface IApiRespResults {
    results: Array<ImoviesData>
}
export interface IApiResponse {
    data: IApiRespResults;
    page?: number;
    total_pages?: number;
    total_results?: number;
}

// useState<IconButtonProps>({ color: favoritesState.color, text: favoritesState.text }); // 'primary' means Not in Favorites

export interface IconsInfo {
    color: IconButtonProps;
    text: string
}
