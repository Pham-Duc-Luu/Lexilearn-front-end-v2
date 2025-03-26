import { ResetPasswordResquestDto, resetPasswordSchema } from '@/api/dto';
import {
  useResetPasswordMutation,
  useSendOtpMutation,
} from '@/api/user service/authentication.api';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  InputOtp,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { RiSendPlane2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { AuthDisplay } from '.';
import PasswordInputComponent from './PasswordInputComponent';

export const ForgotPasswordcard = ({
  display,
  duration,
  setDisplay,
}: {
  display: AuthDisplay;
  duration: number;
  setDisplay: React.Dispatch<React.SetStateAction<AuthDisplay>>;
}) => {
  const { t } = useTranslation();
  const [useSendOtpMutationTrigger, useSendOtpMutationResult] =
    useSendOtpMutation();
  const [useResetPasswordMutationTrigger, useResetPasswordMutationResult] =
    useResetPasswordMutation();

  const emailInputRef = useRef(null);

  // * define sign in schema
  const form = useForm<ResetPasswordResquestDto>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // * handle send otp
  useEffect(() => {
    if (useSendOtpMutationResult.isLoading) {
      toast.loading('Please wait...', {
        autoClose: 5000,
      });
    }

    if (useSendOtpMutationResult.isError) {
      toast.error('Failed to send OTP', {
        autoClose: 5000,
      });
    }

    if (useSendOtpMutationResult.isSuccess) {
      toast.success('OTP sent successfully', {
        autoClose: 5000,
      });
    }
  }, [useSendOtpMutationResult, emailInputRef]);

  function onSubmit(values: ResetPasswordResquestDto) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    useResetPasswordMutationTrigger(values);
  }

  useEffect(() => {
    if (useResetPasswordMutationResult.isLoading) {
      toast.loading('Please wait...', {
        autoClose: 5000,
      });
    }

    if (useResetPasswordMutationResult.isError) {
      if (useResetPasswordMutationResult.error) {
        const { error } = useResetPasswordMutationResult;
        if ('status' in error) {
          if (error.status && error.status >= 400 && error.status < 500) {
            toast.error(String(error.data), {
              autoClose: 5000,
            });
          }
        }
      }
    }

    if (useResetPasswordMutationResult.isSuccess) {
      toast.success('Password reset!!', {
        autoClose: 5000,
      });
      setDisplay('log in');
    }
  }, [useResetPasswordMutationResult, emailInputRef]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, top: '100%' }}
        className="absolute w-1/2  h-full"
        animate={{
          opacity: display === 'forgot password' ? 1 : 0,
          top: 0,
        }}
        transition={{ duration, ease: 'linear' }}>
        <Card className=" col-span-1 w-full h-full shadow-none rounded-r-none rounded-l-sm">
          <CardHeader className="m-4  flex flex-col justify-center items-start">
            <h1 className=" text-xl font-bold">
              {t('auth.forgotPassword.label')}
            </h1>
          </CardHeader>
          <CardBody className="  flex flex-col justify-start p-8  items-center gap-10">
            <Form {...form}>
              <form
                className=" flex flex-col justify-start items-center gap-10"
                onSubmit={form.handleSubmit(onSubmit)}>
                <Input
                  {...form.register('email')}
                  isDisabled={useSendOtpMutationResult.isLoading}
                  isInvalid={form.formState.errors.email ? true : false}
                  errorMessage={form.formState.errors.email?.message}
                  placeholder={t('auth.forgotPassword.email.label')}
                  type="email"
                  endContent={
                    <Button
                      className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
                      endContent={<RiSendPlane2Line />}
                      onPress={() => {
                        // @ts-nocheck
                        form.trigger('email');
                        !form.getFieldState('email').invalid &&
                          form.getValues('email').length > 0 &&
                          useSendOtpMutationTrigger(form.getValues('email'));
                      }}>
                      {t('auth.forgotPassword.action.send OTP')}
                    </Button>
                  }
                  className="w-full"
                  radius="sm"
                  variant="underlined"
                  labelPlacement="outside"
                  size="lg"
                  startContent={<MdOutlineEmail />}></Input>

                {useSendOtpMutationResult.isSuccess && (
                  <>
                    <div className=" w-full  flex justify-between items-center">
                      <InputOtp
                        {...form.register('otp')}
                        isInvalid={form.formState.errors.otp ? true : false}
                        errorMessage={form.formState.errors.otp?.message}
                        description="enter otp"
                        variant="underlined"
                        length={6}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          {/* <FormLabel>Username</FormLabel> */}
                          <FormControl>
                            <PasswordInputComponent
                              placeholder={t(
                                'auth.forgotPassword.password.label'
                              )}
                              className="w-full"
                              type="password"
                              radius="sm"
                              variant="underlined"
                              startContent={<MdOutlinePassword />}
                              labelPlacement="outside"
                              size="lg"
                              isInvalid={
                                form.formState.errors.password ? true : false
                              }
                              errorMessage={
                                form.formState.errors.password?.message
                              }
                              {...field}></PasswordInputComponent>
                          </FormControl>
                          {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm">
                      Reset password
                    </Button>
                  </>
                )}
              </form>
            </Form>
          </CardBody>
          <CardFooter className=" bg-gray-100 flex justify-center items-center gap-3">
            <div>{t('auth.sign up.sign in.label')}</div>
            <Button
              className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
              onPress={() => setDisplay('log in')}>
              {t('auth.sign up.sign in.action')}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};
