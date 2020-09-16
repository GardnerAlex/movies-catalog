import { MoviesList } from '../components/MoviesList/MoviesList';
import { MovieDetails } from '../components/MovieDetails/MovieDetails';
import { HomePage } from '../components/HomePage/HomePage';

export const Routes = [
  {
    path: '/',
    urlPath: '/',
    toMenu: true,
    sidebarName: 'Home',
    component: HomePage
  },
  {
    path: '/trending',
    urlPath: '/trending',
    toMenu: true,
    sidebarName: 'Trending',
    component: MoviesList
  },
  {
    path: '/popular',
    urlPath: '/popular',
    toMenu: true,
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
  // {
  //   path: '/upcoming',
  //   toMenu: true,
  //   sidebarName: 'upcoming',
  //   component: ComingSoon
  // },
  {
    path: '/genres/:genreTitle',
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
