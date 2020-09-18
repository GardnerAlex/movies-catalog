import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FiberNewSharpIcon from '@material-ui/icons/FiberNewSharp';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';
import TheatersSharpIcon from '@material-ui/icons/TheatersSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { MoviesList } from '../components/MoviesList/MoviesList';
import { MovieDetails } from '../components/MovieDetails/MovieDetails';
import { HomePage } from '../components/HomePage/HomePage';

export const Routes = [
  {
    path: '/',
    urlPath: '/',
    toMenu: true,
    toHomePage: false,
    icon: HomeTwoToneIcon,
    sidebarName: 'Home',
    component: HomePage
  },
  {
    path: '/trending',
    urlPath: '/trending',
    toMenu: true,
    toHomePage: true,
    description: 'This week most interesting movies to watch',
    image: 'http://image.tmdb.org/t/p/w300/pq0JSpwyT2URytdFG0euztQPAyR.jpg',
    icon: TrendingUpSharpIcon,
    sidebarName: 'Trending',
    component: MoviesList
  },
  {
    path: '/nowplaying',
    urlPath: '/nowplaying',
    toMenu: true,
    toHomePage: true,
    description: 'Movies, which you can now watch in the movie theatre',
    image: 'http://image.tmdb.org/t/p/w300/r5srC0cqU36n38azFnCyReEksiR.jpg',
    icon: FiberNewSharpIcon,
    sidebarName: 'Now playing',
    component: MoviesList
  },
  {
    path: '/popular',
    urlPath: '/popular',
    description: 'Popular movies according to their rating and users opinions',
    image: 'http://image.tmdb.org/t/p/w300/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
    toMenu: true,
    toHomePage: true,
    icon: TheatersSharpIcon,
    sidebarName: 'Popular',
    component: MoviesList
  },
  {
    path: '/movie/:id/:movieTitle',
    urlPath: '',
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Movie',
    component: MovieDetails
  },
  {
    path: '/favorites',
    urlPath: '/favorites',
    toMenu: true,
    toHomePage: false,
    icon: FavoriteIcon,
    sidebarName: 'Favorites',
    component: MoviesList
  },
  {
    path: '/watchlater',
    urlPath: '/watchlater',
    toMenu: true,
    toHomePage: false,
    icon: BookmarkBorderIcon,
    sidebarName: 'Watch later',
    component: MoviesList
  },
  {
    path: '/genres/:genreName',
    urlPath: '',
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Genres',
    component: MoviesList
  },
  {
    path: '/search/:query',
    urlPath: '',
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Search',
    component: MoviesList
  },
  // {
  //   path: '/genres/:genreName/:genreId',
  //   toMenu: false,
  //   sidebarName: 'genresList',
  //   component: GenreMoviesList
  // },
  {
    path: '/movieDetails/:id',
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Movie',
    component: MovieDetails
  }
];
