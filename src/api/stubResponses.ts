import { IApiRespResults } from '../interfaces/interfaces';

export const stubRespFavorites: IApiRespResults = {
  results: [
    {
      adult: false,
      backdrop_path: '/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
      genre_ids: [28, 12, 18, 14, 10752],
      id: 57792,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Mulan',
      overview: 'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
      popularity: 1773.016,
      poster_path: '/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
      release_date: '2020-09-10',
      title: 'Mulan',
      video: false,
      vote_average: 7.6,
      vote_count: 1582
    },
    {
      adult: false,
      backdrop_path: '/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
      genre_ids: [28, 878, 53],
      id: 577922,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Tenet',
      overview: 'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      popularity: 274.155,
      poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
      release_date: '2020-08-22',
      title: 'Tenet',
      video: false,
      vote_average: 7.5,
      vote_count: 1545
    }
  ]
};

const newArr = stubRespFavorites.results.findIndex(item => item.id === 5779223);
console.log(newArr);
