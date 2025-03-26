'use client';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { routeProto } from '@/redux/store/route.slice';
import { Button } from '@heroui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ReLoginNotify = () => {
  const { isAuthenticatedError } = useAppSelector(
    (state) => state.persistedReducer.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticatedError) {
      toast(
        <>
          <p> Some thing went wrong, please sign in again</p>
          <Button
            className=" rounded-sm"
            onPress={() => navigate(routeProto.AUTH())}>
            Sign in
          </Button>
        </>,
        {
          position: 'bottom-right',
          autoClose: false,
          type: 'error',
          theme: 'colored',
        }
      );
    }
  }, [isAuthenticatedError]);

  return <></>;
};

export default ReLoginNotify;
