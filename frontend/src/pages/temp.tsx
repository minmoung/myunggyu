import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CodeView } from 'src/sections/temp/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Temp - ${CONFIG.appName}`}</title>
      </Helmet>

      <CodeView />
    </>
  );
}
