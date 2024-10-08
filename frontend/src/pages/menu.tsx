import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MenuView } from 'src/sections/menu/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Menu - ${CONFIG.appName}`}</title>
      </Helmet>

      <MenuView />
    </>
  );
}
