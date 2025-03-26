import { useGoogleOAuth2Mutation } from '@/api/user service/authentication.api';
import { routeProto } from '@/redux/store/route.slice';
import { Button } from '@heroui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // * define google auth mutation
  const [GoogleOAuth2MutationTrigger, GoogleOAuth2MutationResult] =
    useGoogleOAuth2Mutation();
  const GoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => {
      // * trigger verification in backend after gain google oauth token
      GoogleOAuth2MutationTrigger(tokenResponse.code);
      // console.log(tokenResponse);
    },
    onError: (error) => console.log(error),
    scope: '',
  });
  // * catch the google oauth 2 data change event
  useEffect(() => {
    if (GoogleOAuth2MutationResult.isError) {
      if (GoogleOAuth2MutationResult.error) {
        const { error } = GoogleOAuth2MutationResult;
        if ('status' in error) {
          if (error.status && error.status >= 400 && error.status < 500) {
            toast.error(String(error.data));
          }
        }
      }
    }

    if (GoogleOAuth2MutationResult.isLoading) {
      toast.loading('Please wait...', { autoClose: 5000 });
    }
    if (GoogleOAuth2MutationResult.isSuccess) {
      navigate(routeProto.HOME());
    }
  }, [GoogleOAuth2MutationResult]);

  return (
    <>
      <Button
        radius="sm"
        className=" w-full"
        variant="bordered"
        size="lg"
        onPress={() => GoogleLogin()}
        startContent={<FcGoogle />}>
        {t('auth.sign up.sign up with google')}
      </Button>
    </>
  );
};

export default GoogleLoginButton;
