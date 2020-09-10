"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_socks_1 = require("react-socks");
const tmdb_power_png_1 = require("../../assets/tmdb-power.png");
const Sidebar_1 = require("../Sidebar/Sidebar");
require("./Header.scss");
exports.Header = () => (react_1.default.createElement("nav", { className: "navbar-wrapper" },
    react_1.default.createElement(react_socks_1.Breakpoint, { medium: true, up: true },
        react_1.default.createElement("ul", { className: "navbar-links" },
            react_1.default.createElement("li", { className: "navbar-link-logo" },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/" },
                    react_1.default.createElement("img", { src: tmdb_power_png_1.default, alt: "logo" }))),
            react_1.default.createElement("div", { className: "navbar-top-links" },
                react_1.default.createElement("li", { className: "navbar-link" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/nowplaying" }, "Now Playing")),
                react_1.default.createElement("li", { className: "navbar-link" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/upcoming" }, "Coming Soon")),
                react_1.default.createElement("li", { className: "navbar-link" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/search" }, "Movie Search")),
                react_1.default.createElement("li", { className: "navbar-link" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/genres" }, "Genres"))))),
    react_1.default.createElement(react_socks_1.Breakpoint, { small: true, down: true },
        react_1.default.createElement(Sidebar_1.default, null))));
//# sourceMappingURL=Header.js.map