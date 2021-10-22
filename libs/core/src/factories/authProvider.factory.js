import { BasicAuthStrategy, SSOAuthStrategy } from '@dsp/business';
import { AuthService } from '../services/auth.service';

export const createAuthProvider = ({
  router,
  http,
  queryClient,
  appContext
}) => {
  const { sso } = appContext;

  const strategy = sso.isEnabled
    ? new SSOAuthStrategy({ http, options: sso.options, router })
    : new BasicAuthStrategy({ http, router });

  return new AuthService({ strategy, queryClient, router });
};
