"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const NowPlaying_1 = require("./containers/NowPlaying/NowPlaying");
const Dashboard_1 = require("./containers/Dashboard/Dashboard");
const Upcoming_1 = require("./containers/Upcoming/Upcoming");
const MovieSearch_1 = require("./containers/MovieSearch/MovieSearch");
const Genres_1 = require("./containers/Genres/Genres");
const GenreList_1 = require("./containers/Genres/GenreList");
const MovieDetailsContainer_1 = require("./containers/MovieDetails/MovieDetailsContainer");
const Header_1 = require("./containers/Header/Header");
require("./App.css");
exports.App = () => {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(Header_1.Header, null),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Dashboard_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/search", component: MovieSearch_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/nowplaying", component: NowPlaying_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/upcoming", component: Upcoming_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/genres", component: Genres_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/genres/:genreName/:genreId", component: GenreList_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/movie/:id", component: MovieDetailsContainer_1.default })))));
};
//# sourceMappingURL=App.js.map