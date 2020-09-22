// some small utils for the project
import { IMatchInterface } from '../interfaces';

const querystring = require('querystring');

export const getPageNum = (params: IMatchInterface): number | undefined => {
  let pageNum: number = 1;
  const numCheck = new RegExp('^[0-9]+$');
  if (params.location.search.length > 0 && params.location.search.startsWith('?')) {
    const pageNumParsed = querystring.parse(params.location.search.split('?')[1]);
    if (numCheck.test(pageNumParsed.page) === true) {
      pageNum = Number.parseInt(pageNumParsed.page, 10);
    }
  }
  return pageNum;
};
