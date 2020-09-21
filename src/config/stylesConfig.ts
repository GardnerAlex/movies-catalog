import { personalStorages } from './baseConfig';

type stylesConfigTypes = {
  drawerWidth: number;
  drawerBreakPoint: 'md' | 'xs' | 'sm' | 'lg' | 'xl'
}
export const stylesConfig: stylesConfigTypes = {
  drawerWidth: 220,
  drawerBreakPoint: 'md'
};

export type iconButtonStyles = 'primary' | 'secondary';

export const buttonColorPrimary: iconButtonStyles = 'primary';
export const buttonColorSecondary: iconButtonStyles = 'secondary';

export const tooltipTexts = {
  [personalStorages.watchLater]: {
    [buttonColorPrimary]: 'Add to Watch Later list',
    [buttonColorSecondary]: 'Remove from Watch Later list'
  },
  [personalStorages.favorites]: {
    [buttonColorPrimary]: 'Add to Favorites list',
    [buttonColorSecondary]: 'Remove from Favorites list'
  }
};
