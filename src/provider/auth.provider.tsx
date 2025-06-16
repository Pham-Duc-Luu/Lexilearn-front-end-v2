import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

// * this component will be use to authentication my frontend
const AuthProvider = ({ children }: { children: ReactNode }) => {
  /**
   * * check the refresh token in the cookies,
   * * if refresh token not exist => ask user to login or navigate to login page
   */
  const { isLogin } = useAppSelector((state) => state.persistedReducer.auth);

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLogin) navigate(routeProto.AUTH());
  // });

  return <>{children}</>;
};

export default AuthProvider;
