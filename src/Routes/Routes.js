"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const HomeTwoTone_1 = require("@material-ui/icons/HomeTwoTone");
const FiberNewSharp_1 = require("@material-ui/icons/FiberNewSharp");
const TrendingUpSharp_1 = require("@material-ui/icons/TrendingUpSharp");
const TheatersSharp_1 = require("@material-ui/icons/TheatersSharp");
const MoviesList_1 = require("../components/MoviesList/MoviesList");
const MovieDetails_1 = require("../components/MovieDetails/MovieDetails");
const HomePage_1 = require("../components/HomePage/HomePage");
exports.Routes = [
    {
        path: '/',
        urlPath: '/',
        toMenu: true,
        icon: HomeTwoTone_1.default,
        sidebarName: 'Home',
        component: HomePage_1.HomePage
    },
    {
        path: '/trending',
        urlPath: '/trending',
        toMenu: true,
        icon: TrendingUpSharp_1.default,
        sidebarName: 'Trending',
        component: MoviesList_1.MoviesList
    },
    {
        path: '/nowPlaying',
        urlPath: '/nowplaying',
        toMenu: true,
        icon: FiberNewSharp_1.default,
        sidebarName: 'Now playing',
        component: MoviesList_1.MoviesList
    },
    {
        path: '/popular',
        urlPath: '/popular',
        toMenu: true,
        icon: TheatersSharp_1.default,
        sidebarName: 'Popular',
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