Object.defineProperty(exports, '__esModule', { value: true });
exports.Movie = void 0;
const react_1 = require('react');
const styles_1 = require('@material-ui/core/styles');
const lab_1 = require('@material-ui/lab');
const Card_1 = require('@material-ui/core/Card');
const CardHeader_1 = require('@material-ui/core/CardHeader');
const CardMedia_1 = require('@material-ui/core/CardMedia');
const CardContent_1 = require('@material-ui/core/CardContent');
const CardActions_1 = require('@material-ui/core/CardActions');
const Collapse_1 = require('@material-ui/core/Collapse');
const IconButton_1 = require('@material-ui/core/IconButton');
const Typography_1 = require('@material-ui/core/Typography');
const colors_1 = require('@material-ui/core/colors');
const Favorite_1 = require('@material-ui/icons/Favorite');
const apiDefaults_1 = require('../../api/apiDefaults');

const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
  root: {
    width: 250
  },
  media: {
    height: 0,
    paddingTop: '150%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: colors_1.red[500]
  },
  actions: {
    height: '30px',
    marginTop: '0px',
    backgroundColor: 'white',
    opacity: '80%'
  }
}));
exports.Movie = (props) => {
  const { movie } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = react_1.useState(false);
  const [favorites, setFavorites] = react_1.useState('primary');
  const handleFavoritesClick = () => {
    if (favorites === 'primary') {
      setFavorites('secondary');
    } else {
      setFavorites('primary');
    }
  };
  return (react_1.default.createElement(Card_1.default, { className: classes.root },
    react_1.default.createElement(CardMedia_1.default, { className: classes.media, image: `${apiDefaults_1.apiSettings.images.base_url}${apiDefaults_1.apiSettings.images.poster_sizes[4]}${movie.poster_path}`, title: movie.title }),
    react_1.default.createElement(CardHeader_1.default, { title: movie.title, subheader: `${apiDefaults_1.genresObj[movie.genre_ids[0]]} ${movie.release_date}` }),
    react_1.default.createElement(CardActions_1.default, { disableSpacing: true, className: classes.actions },
      react_1.default.createElement(IconButton_1.default, { 'aria-label': 'add to favorites', onClick: handleFavoritesClick, color: favorites },
        react_1.default.createElement(Favorite_1.default, null)),
      react_1.default.createElement(IconButton_1.default, { 'aria-label': 'user rating' },
        react_1.default.createElement(lab_1.Rating, { name: 'half-rating-read', precision: 0.1, readOnly: true, value: movie.vote_average / 2 }))),
    react_1.default.createElement(Collapse_1.default, { in: expanded, timeout: 'auto', unmountOnExit: true },
      react_1.default.createElement(CardContent_1.default, null,
        react_1.default.createElement(Typography_1.default, { paragraph: true }, 'Details:'),
        react_1.default.createElement(Typography_1.default, { paragraph: true }, movie.overview)))));
};
// # sourceMappingURL=Movie.js.map
