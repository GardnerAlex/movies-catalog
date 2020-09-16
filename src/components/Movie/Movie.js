"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const styles_1 = require("@material-ui/core/styles");
const lab_1 = require("@material-ui/lab");
const Card_1 = require("@material-ui/core/Card");
const CardMedia_1 = require("@material-ui/core/CardMedia");
const CardActions_1 = require("@material-ui/core/CardActions");
const core_1 = require("@material-ui/core");
const Typography_1 = require("@material-ui/core/Typography");
const Favorite_1 = require("@material-ui/icons/Favorite");
const apiDefaults_1 = require("../../api/apiDefaults");
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    root: {
        width: 250,
        height: '100%',
        paddingTop: 0,
        backgroundColor: '#fff'
    },
    media: {
        height: 0,
        paddingTop: '150%'
    },
    actions: {
        height: theme.spacing(1),
        padding: '10px 10px 8px 15px',
        marginTop: '10px',
        justifyContent: 'space-between'
    },
    textBox: {
        margin: '5px 15px'
    },
    rating: {}
}));
exports.Movie = (props) => {
    const { movie } = props;
    const classes = useStyles();
    const [favorites, setFavorites] = react_1.useState({ color: 'primary' });
    const handleFavoritesClick = () => {
        if (favorites.color === 'primary') {
            setFavorites({ color: 'secondary' });
        }
        else {
            setFavorites({ color: 'primary' });
        }
    };
    return (react_1.default.createElement(Card_1.default, { className: classes.root },
        react_1.default.createElement(react_router_dom_1.Link, { to: `/moviedetails/${movie.id}_${movie.title}`, key: movie.id },
            react_1.default.createElement(CardMedia_1.default, { className: classes.media, image: `${apiDefaults_1.apiSettings.images.base_url}${apiDefaults_1.apiSettings.images.poster_sizes[4]}${movie.poster_path}`, title: movie.title })),
        react_1.default.createElement(CardActions_1.default, { className: classes.actions },
            react_1.default.createElement(core_1.Tooltip, { title: "User rating" },
                react_1.default.createElement("div", { "aria-label": "user rating", className: classes.rating },
                    react_1.default.createElement(lab_1.Rating, { size: "small", name: "half-rating-read", precision: 0.1, readOnly: true, value: movie.vote_average / 2 }))),
            react_1.default.createElement(core_1.Tooltip, { title: "Add to Favorites" },
                react_1.default.createElement(core_1.IconButton, { size: "small", "aria-label": "add to favorites", onClick: handleFavoritesClick, color: favorites.color },
                    react_1.default.createElement(Favorite_1.default, null)))),
        react_1.default.createElement("div", { className: classes.textBox },
            react_1.default.createElement(Typography_1.default, { variant: "body1", component: "h3" }, movie.title),
            react_1.default.createElement(Typography_1.default, { variant: "caption" }, `Genre: ${apiDefaults_1.genresObj[movie.genre_ids[0]]} | ${movie.release_date.slice(0, 4)}`))));
};
//# sourceMappingURL=Movie.js.map