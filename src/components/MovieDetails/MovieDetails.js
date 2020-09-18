"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDetails = void 0;
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
const BookmarkBorder_1 = require("@material-ui/icons/BookmarkBorder");
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
        flex: 1,
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
exports.MovieDetails = (props) => {
    const { movie, addToLocalStorageHandler, deleteFromLocalStorageHandler, watchLaterState, favoritesState } = props;
    const classes = useStyles();
    const [favorites, setFavorites] = react_1.useState({ color: favoritesState });
    const [watchLater, setWatchLater] = react_1.useState({ color: watchLaterState });
    const handleClick = (clickType) => {
        if (clickType === 'favorites') {
            if (favorites.color === 'primary') {
                addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
                setFavorites({ color: 'secondary' });
            }
            else {
                deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
                setFavorites({ color: 'primary' });
            }
        }
        if (clickType === 'watchlater') {
            if (watchLater.color === 'primary') {
                addToLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
                setWatchLater({ color: 'secondary' });
            }
            else {
                deleteFromLocalStorageHandler({ queryType: clickType, movieDataToAdd: movie });
                setWatchLater({ color: 'primary' });
            }
        }
    };
    return (react_1.default.createElement(Card_1.default, { className: classes.root },
        react_1.default.createElement(react_router_dom_1.Link, { to: `/moviedetails/${movie.id}_${movie.title}`, key: movie.id },
            react_1.default.createElement(CardMedia_1.default, { className: classes.media, image: `${apiDefaults_1.apiSettings.images.base_url}${apiDefaults_1.apiSettings.images.poster_sizes[4]}${movie.poster_path}`, title: movie.title })),
        react_1.default.createElement(CardActions_1.default, { className: classes.actions },
            react_1.default.createElement(core_1.Tooltip, { title: "User rating" },
                react_1.default.createElement("div", { "aria-label": "user rating", className: classes.rating },
                    react_1.default.createElement(lab_1.Rating, { size: "small", name: "half-rating-read", precision: 0.1, readOnly: true, value: movie.vote_average / 2 }))),
            react_1.default.createElement(core_1.Tooltip, { title: "Add to Watch later list" },
                react_1.default.createElement(core_1.IconButton, { size: "small", "aria-label": "add to favorites", onClick: () => handleClick('watchlater'), color: watchLater.color },
                    react_1.default.createElement(BookmarkBorder_1.default, null))),
            react_1.default.createElement(core_1.Tooltip, { title: "Add to Favorites list" },
                react_1.default.createElement(core_1.IconButton, { size: "small", "aria-label": "add to Watch later list", onClick: () => handleClick('favorites'), color: favorites.color },
                    react_1.default.createElement(Favorite_1.default, null)))),
        react_1.default.createElement("div", { className: classes.textBox },
            react_1.default.createElement(Typography_1.default, { variant: "body1", component: "h3" }, movie.title),
            react_1.default.createElement(Typography_1.default, { variant: "caption" }, `Genre: ${apiDefaults_1.genresObj[movie.genre_ids[0]]} | ${movie.release_date.slice(0, 4)}`))));
};
//# sourceMappingURL=MovieDetails.js.map