import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { IMovieApiResponse, ImoviesData } from '../../interfaces';
import { addToLocalStorage, deleteFromLocalStorage } from '../../api';
import { iconButtonStyles, buttonColorSecondary, buttonColorPrimary, tooltipTexts } from '../../config';

export const PersonalizedListPlaceHolder = (props: {icon:any, personalStorageType: string, movie: ImoviesData, personalStorageData: IMovieApiResponse}) => {
  const { personalStorageType, movie, personalStorageData, icon } = props;
  const Icon = icon;
  const getPersonalizedState = (id: number): iconButtonStyles => {
    if (personalStorageData.results.findIndex(item => item.id === id) !== -1) {
      return buttonColorSecondary;
    }
    return buttonColorPrimary;
  };

  const [personalState, setPersonalState] = useState<IconButtonProps>({ color: getPersonalizedState(movie.id) }); // 'primary' means Not in Favorites

  const addToLocalStorageHandler = (inputParams: { queryType: string, movieDataToAdd: ImoviesData }) => {
    addToLocalStorage(inputParams);
  };

  const deleteFromLocalStorageHandler = (inputParams: { queryType: string, movieDataToAdd: ImoviesData }) => {
    deleteFromLocalStorage(inputParams);
  };

  const handleClick = () => {
    if (personalState.color === buttonColorPrimary) {
      addToLocalStorageHandler({ queryType: personalStorageType, movieDataToAdd: movie });
      setPersonalState({ color: buttonColorSecondary });
    } else {
      deleteFromLocalStorageHandler({ queryType: personalStorageType, movieDataToAdd: movie });
      setPersonalState({ color: buttonColorPrimary });
    }
  };
  return (
    // @ts-ignore
    <Tooltip title={tooltipTexts[personalStorageType][personalState.color]}>
      <IconButton
        size="small"
        aria-label="add to favorites"
        onClick={() => handleClick()}
        color={personalState.color}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};
