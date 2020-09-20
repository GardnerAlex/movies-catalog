import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FiberNewSharpIcon from '@material-ui/icons/FiberNewSharp';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';
import TheatersSharpIcon from '@material-ui/icons/TheatersSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { MoviesContainer } from '../components/MoviesContainer';
import { HomePage } from '../components/HomePage';
import { siteNav } from '../config';

export const routes = [
  {
    path: '/',
    toMenu: true,
    toHomePage: false,
    icon: HomeTwoToneIcon,
    sidebarName: 'Home',
    component: HomePage
  },
  {
    path: `/${siteNav.trending}`,
    toMenu: true,
    toHomePage: true,
    description: 'This week most interesting movies to watch',
    image: 'http://image.tmdb.org/t/p/w300/pq0JSpwyT2URytdFG0euztQPAyR.jpg',
    icon: TrendingUpSharpIcon,
    sidebarName: 'Trending',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.nowplaying}`,
    toMenu: true,
    toHomePage: true,
    description: 'Movies, which you can now watch in the movie theatre',
    image: 'http://image.tmdb.org/t/p/w300/r5srC0cqU36n38azFnCyReEksiR.jpg',
    icon: FiberNewSharpIcon,
    sidebarName: 'Now playing',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.popular}`,
    description: 'Popular movies according to their rating and users opinions',
    image: 'http://image.tmdb.org/t/p/w300/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
    toMenu: true,
    toHomePage: true,
    icon: TheatersSharpIcon,
    sidebarName: 'Popular',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.favorites}`,
    toMenu: true,
    toHomePage: false,
    icon: FavoriteIcon,
    sidebarName: 'Favorites',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.watchlater}`,
    toMenu: true,
    toHomePage: false,
    icon: BookmarkBorderIcon,
    sidebarName: 'Watch later',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.genres}/:genreName`,
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Genres',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.search}/:query`,
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Search',
    component: MoviesContainer
  },
  {
    path: `/${siteNav.moviedetails}/:movieId`,
    toMenu: false,
    toHomePage: false,
    sidebarName: 'Movie',
    component: MoviesContainer
  }
];
