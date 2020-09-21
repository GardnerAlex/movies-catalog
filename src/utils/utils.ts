// some small utils for the project
import { IMatchInterface } from '../interfaces';

const querystring = require('querystring');

export const getPageNum = (params: IMatchInterface): number | undefined => {
  let pageNum: number;
  const numCheck = new RegExp('^[0-9]+$');
  if (params.location.search.length > 0 && params.location.search.startsWith('?')) {
    const pageNumParsed = querystring.parse(params.location.search.split('?')[1]);
    if (numCheck.test(pageNumParsed) === true) {
      pageNum = Number.parseInt(pageNumParsed, 10);
    }
  }
  return pageNum;
};
