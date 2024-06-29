import Typography from '@mui/material/Typography';

import { AuthGuard } from '~/features/auth';
import { Route } from '~/shared/model/route.enum';
import { CustomerProfile } from '~/widgets/customer-profile';

export function ProfilePage(): JSX.Element {
  return (
    <AuthGuard
      shouldBeSignedIn
      redirectTo={Route.AUTH_SIGN_IN}
    >
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <CustomerProfile />
    </AuthGuard>
  );
}
