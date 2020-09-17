import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FiberNewSharpIcon from '@material-ui/icons/FiberNewSharp';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';
import TheatersSharpIcon from '@material-ui/icons/TheatersSharp';
import { MoviesList } from '../components/MoviesList/MoviesList';
import { MovieDetails } from '../components/MovieDetails/MovieDetails';
import { HomePage } from '../components/HomePage/HomePage';

export const Routes = [
  {
    path: '/',
    urlPath: '/',
    toMenu: true,
    icon: HomeTwoToneIcon,
    sidebarName: 'Home',
    component: HomePage
  },
  {
    path: '/trending',
    urlPath: '/trending',
    toMenu: true,
    description: 'This week most interesting movies to watch',
    image: 'http://image.tmdb.org/t/p/w300/pq0JSpwyT2URytdFG0euztQPAyR.jpg',
    icon: TrendingUpSharpIcon,
    sidebarName: 'Trending',
    component: MoviesList
  },
  {
    path: '/nowPlaying',
    urlPath: '/nowplaying',
    toMenu: true,
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
    icon: TheatersSharpIcon,
    sidebarName: 'Popular',
    component: MoviesList
  },
  {
    path: '/movie/:id/:movieTitle',
    urlPath: '',
    toMenu: false,
    sidebarName: 'Movie',
    component: MovieDetails
  },
  {
    path: '/favorites',
    toMenu: false,
    sidebarName: '',
    component: MoviesList
  },
  {
    path: '/watchlater',
    toMenu: false,
    sidebarName: '',
    component: MoviesList
  },
  {
    path: '/genres/:genreName',
    urlPath: '',
    toMenu: false,
    sidebarName: 'Genres',
    component: MoviesList
  },
  // {
  //   path: '/search',
  //   toMenu: true,
  //   sidebarName: 'Search',
  //   component: MovieSearch
  // },
  // {
  //   path: '/genres/:genreName/:genreId',
  //   toMenu: false,
  //   sidebarName: 'genresList',
  //   component: GenreMoviesList
  // },
  {
    path: '/movieDetails/:id',
    toMenu: false,
    sidebarName: 'Movie',
    component: MovieDetails
  }
];
