import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard(대쉬보드)',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: '사용자관리',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: '메뉴관리',
    path: '/menu',
    icon: icon('ic-blog'),
  },
  {
    title: '코드관리',
    path: '/code',
    icon: icon('ic-cart'),
  },
  {
    title: 'Templates1',
    path: '/temp',
    icon: icon('ic-cart'),
  },
  {
    title: 'Templates2',
    path: '/temp2',
    icon: icon('ic-cart'),
  },
  /*
  {
    title: 'Templates2',
    path: '/temp',
    icon: icon('ic-cart'),
  },
  {
    title: 'Templates3',
    path: '/temp',
    icon: icon('ic-cart'),
  },
  {
    title: 'Templates4',
    path: '/temp',
    icon: icon('ic-cart'),
  },
  {
    title: 'Templates5',
    path: '/temp',
    icon: icon('ic-cart'),
  },
  */
  {
    title: 'Product(상품)',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog(블로그)',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in(로그인)',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
