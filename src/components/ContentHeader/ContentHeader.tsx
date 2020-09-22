import { siteNav } from '../../config';
import { IMatchInterface } from '../../interfaces';

export const contentHeader = (match: IMatchInterface) => {
  const location = match.location.pathname.split('/')[1];
  switch (location) {
    case siteNav.genres:
      return `${match.match.params.genreName.charAt(0).toUpperCase()}${match.match.params.genreName.slice(1)} Movies`;
    case siteNav.watchLater:
      return 'Movies to watch later:';
    case siteNav.favorites:
      return 'Favorites movies:';
    case siteNav.moviedetails:
      return 'Movie details:';
    case siteNav.nowplaying:
      return 'Movies in the theatres right now:';
    case siteNav.trending:
      return 'Hot and gaining popularity movies this week:';
    case siteNav.popular:
      return 'Popular movies:';
    default:
      return 'Main page';
  }
};
