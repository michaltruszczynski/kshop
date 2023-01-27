import React from 'react';

import BackgroundContent from '../../components/BackgroundContent/BackgroundContent';
import Logo from '../../components/Logo/Logo';

const WithFetchContentManager = Component => {
      return function ComponentWithFetchContentManager({ state, ...props }) {

            switch (state.status) {
            case 'idle':
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
            case 'success':
                  return <Component {...props} />
            case 'error':
                  return (
                        <BackgroundContent>
                              Something went wrong.
                        </BackgroundContent>
                  );
            case 'loading':
                  return (
                        <BackgroundContent>
                              Loading...
                        </BackgroundContent>
                  );
            default:
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
      }
      }
}
export default WithFetchContentManager;

