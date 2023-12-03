import {
  MdAnalytics,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
  MdHome,
} from 'react-icons/md';

export const products = [
  {
    id: '1',
    title: 'M.D.P.',
    img: '/mdp.jpg',
  },
  {
    id: '2',
    title: 'Melamine',
    img: '/melamine.jpg',
  },
  {
    id: 'Oak',
    title: 'ABC',
    img: '/oak.jpg',
  },
  {
    id: '4',
    title: 'Pine',
    img: '/pine.jpg',
  },
  {
    id: '5',
    title: 'Plywood',
    img: '/plywood.jpg',
  },
  {
    id: '6',
    title: 'Veneer',
    img: '/veneer.jpg',
  },
];

export const menuIcons = [
  <MdHome size={30} key={'0'} />,

  <MdShoppingBag size={30} key={'1'} />,

  <MdAnalytics size={30} key={'2'} />,

  <MdSupervisedUserCircle size={30} key={'3'} />,

  <MdWork size={30} key={'4'} />,
];

export const teamImgs = [
  '/team-tamara.jpg',
  '/team-simon.jpg',
  '/team-sam.jpg',
];
