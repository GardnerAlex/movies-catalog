"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_transition_group_1 = require("react-transition-group");
const react_router_dom_1 = require("react-router-dom");
const tmdb_power_png_1 = require("../../assets/tmdb-power.png");
require("./Sidebar.scss");
const Sidebar = () => {
    const [expandedLinks, setExpandedLinks] = react_1.useState(false);
    const toggleLinks = () => {
        setExpandedLinks(!expandedLinks);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("ul", { className: "sidebar-top" },
            react_1.default.createElement("div", { className: "sidebar-links" },
                react_1.default.createElement("li", { className: "sidebar-link bars", onClick: toggleLinks },
                    react_1.default.createElement("i", { className: "fa fa-bars", "aria-hidden": "true" })),
                react_1.default.createElement("li", { className: "sidebar-link-logo", onClick: () => setExpandedLinks(false) },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/" },
                        react_1.default.createElement("img", { src: tmdb_power_png_1.default, alt: "logo" }))))),
        react_1.default.createElement(react_transition_group_1.CSSTransition, { in: expandedLinks, timeout: 300, classNames: "visible", unmountOnExit: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement("li", { className: "sidebar-link", onClick: () => setExpandedLinks(false) },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/nowplaying" }, "Now Playing")),
                react_1.default.createElement("li", { className: "sidebar-link", onClick: () => setExpandedLinks(false) },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/upcoming" }, "Coming Soon")),
                react_1.default.createElement("li", { className: "sidebar-link", onClick: () => setExpandedLinks(false) },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/search" }, "Movie Search")),
                react_1.default.createElement("li", { className: "sidebar-link", onClick: () => setExpandedLinks(false) },
                    react_1.default.createElement(react_router_dom_1.NavLink, { to: "/genres" }, "Genres"))))));
};
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map