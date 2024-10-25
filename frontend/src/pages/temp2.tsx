import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CodeView } from 'src/sections/temp2/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Temp2 - ${CONFIG.appName}`}</title>
      </Helmet>

      <CodeView />
    </>
  );
}
