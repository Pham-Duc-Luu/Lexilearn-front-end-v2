import { useRefreshTokenQuery } from '@/api';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

// * this component will be use to authentication my frontend
const AuthProvider = ({ children }: { children: ReactNode }) => {
  /**
   * * check the refresh token in the cookies,
   * * if refresh token not exist => ask user to login or navigate to login page
   */
  const { access_token } = useAppSelector(
    (state) => state.persistedReducer.auth
  );

  const refresh_token = useRefreshTokenQuery(null);
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //     if (refresh_token.isError) navigate(routeProto.AUTH())
  //
  // });

  return <>{children}</>;
};

export default AuthProvider;
