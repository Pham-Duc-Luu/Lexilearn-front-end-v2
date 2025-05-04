import {useAppSelector} from '@/redux/store/ProtoStore.slice';
import {ReactNode, useLayoutEffect} from 'react';
import {useNavigate} from 'react-router';
import {routeProto} from "@/redux/store/route.slice.ts";

// * this component will be use to authentication my frontend
const AuthProvider = ({children}: { children: ReactNode }) => {
    /**
     * * check the refresh token in the cookies,
     * * if refresh token not exist => ask user to login or navigate to login page
     */
    const {access_token} = useAppSelector(
        (state) => state.persistedReducer.auth
    );

    const navigate = useNavigate();
    useLayoutEffect(() => {
        if (!access_token) {
            navigate(routeProto.AUTH());
        }
    }, [access_token, navigate]);

    return <>{children}</>;
};

export default AuthProvider;
