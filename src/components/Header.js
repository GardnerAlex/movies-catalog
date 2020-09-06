"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Typography_1 = require("@material-ui/core/Typography");
const Link_1 = require("@material-ui/core/Link");
const API_KEY = 'd32dade5b7e3663be8be530290d660cc';
const baseUrl = 'https://api.themoviedb.org/3';
const MOVIE_API_URL = `${baseUrl}/movie/popular?api_key=${API_KEY}`;
const genresUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=`;
const useStyles = styles_1.makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0
    }
}));
function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Toolbar_1.default, { className: classes.toolbar },
            react_1.default.createElement(Typography_1.default, { component: "h3", variant: "h5", color: "inherit", align: "center", noWrap: true, className: classes.toolbarTitle }, title),
            react_1.default.createElement(core_1.Input, { type: "text", value: props.query, onChange: event => props.setQuery(event.target.value) }),
            react_1.default.createElement(Button_1.default, { variant: "outlined", size: "small", onClick: () => {
                    props.setUrl(`${MOVIE_API_URL}&page=${props.query}`);
                } }, "Search")),
        react_1.default.createElement(Toolbar_1.default, { component: "nav", variant: "dense", className: classes.toolbarSecondary }, sections.map((section) => (react_1.default.createElement(Link_1.default, { color: "inherit", noWrap: true, key: section.title, variant: "body2", href: section.url, className: classes.toolbarLink, onClick: () => {
                props.setUrl(`${genresUrl}${section.id}`);
            } }, section.title))))));
}
exports.Header = Header;
//# sourceMappingURL=Header.js.map