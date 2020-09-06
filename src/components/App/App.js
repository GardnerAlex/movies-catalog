Object.defineProperty(exports, '__esModule', { value: true });
exports.App = void 0;
const react_1 = require('react');
const Movie_1 = require('../Movie/Movie');
require('./App.css');
const styles_1 = require('@material-ui/core/styles');
const Grid_1 = require('@material-ui/core/Grid');
const CssBaseline_1 = require('@material-ui/core/CssBaseline');
const Container_1 = require('@material-ui/core/Container');
const Header_1 = require('../Header');
const api_1 = require('../../api/api');

const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    width: '350px'
  },
  control: {
    padding: theme.spacing(2)
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));
const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' }
];
exports.App = () => {
  const classes = useStyles();
  const [moviesData, setSignUpData] = react_1.useState([]);
  const [loading, setLoading] = react_1.useState(false);
  const [errorMessage, setErrorMessage] = react_1.useState(null);
  react_1.useEffect(() => {
    setLoading(true);
    api_1.fetchMovies()
      .then(jsonResponse => {
        setLoading(false);
        console.log(jsonResponse);
        setSignUpData(jsonResponse.Search);
      })
      .catch(err => setErrorMessage(err.toString()));
  }, []);
  return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(CssBaseline_1.default, null),
    react_1.default.createElement(Container_1.default, { maxWidth: 'lg' },
      react_1.default.createElement(Header_1.Header, { title: 'Movies Catalog', sections }),
      react_1.default.createElement('div', { className: 'cards' },
        loading
                    && react_1.default.createElement('span', null, 'loading...'),
        errorMessage
                    && react_1.default.createElement('span', null, errorMessage),
        react_1.default.createElement(Grid_1.default, { container: true, className: classes.root, spacing: 3 },
          react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
            react_1.default.createElement(Grid_1.default, { container: true, justify: 'center', spacing: 2 }, moviesData
                            && moviesData.map((movie, index) => (react_1.default.createElement(Grid_1.default, { className: classes.paper, key: `${movie.imdbIDTitle}${index}`, item: true },
                              react_1.default.createElement(Movie_1.Movie, { inputData: movie })))))))))));
};
// # sourceMappingURL=App.js.map
