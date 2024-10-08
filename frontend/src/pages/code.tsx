import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CodeView } from 'src/sections/code/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Code - ${CONFIG.appName}`}</title>
      </Helmet>

      <CodeView />
    </>
  );
}
