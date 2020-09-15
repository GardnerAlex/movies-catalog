"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const MoviesList_1 = require("../components/MoviesList/MoviesList");
const MovieDetails_1 = require("../components/MovieDetails/MovieDetails");
exports.Routes = [
    {
        path: '/',
        urlPath: '/',
        toMenu: true,
        sidebarName: 'Home',
        component: MoviesList_1.MoviesList
    },
    {
        path: '/trending',
        urlPath: '/trending',
        toMenu: true,
        sidebarName: 'Trending',
        component: MoviesList_1.MoviesList
    },
    {
        path: '/movie/:id/:movieTitle',
        urlPath: '',
        toMenu: false,
        sidebarName: 'Movie',
        component: MovieDetails_1.MovieDetails
    },
    {
        path: '/genres/:genreTitle',
        urlPath: '',
        toMenu: false,
        sidebarName: 'Genres',
        component: MoviesList_1.MoviesList
    },
    {
        path: '/movieDetails/:id',
        toMenu: false,
        sidebarName: 'Movie',
        component: MovieDetails_1.MovieDetails
    }
];
//# sourceMappingURL=Routes.js.map