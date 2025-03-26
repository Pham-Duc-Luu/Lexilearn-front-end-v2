'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from '@heroui/react';
import React from 'react';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { motion } from 'framer-motion';
import { AuthDisplay } from '.';
import { LuUser } from 'react-icons/lu';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useSignUpMutation } from '@/api/user service/authentication.api';
import { SignUpRequestDto, signUpSchema } from '@/api/dto';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleLoginButton from './GoogleLoginButton';
import PasswordInputComponent from './PasswordInputComponent';
import { useTranslation } from 'react-i18next';

export const SignUpCard = ({
  display,
  duration,
  setDisplay,
}: {
  display: AuthDisplay;
  duration: number;
  setDisplay: React.Dispatch<React.SetStateAction<AuthDisplay>>;
}) => {
  const { t } = useTranslation();

  const [signUpMutationTrigger, signUpMutationResult] = useSignUpMutation();

  // * define sign in schema
  const form = useForm<SignUpRequestDto>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(values: SignUpRequestDto) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    signUpMutationTrigger(values);
  }

  // * catch the sign up data change event
  // useEffect(() => {
  //   if (signUpMutationResult.isError) {
  //     if (signUpMutationResult.error) {
  //       const { error } = signUpMutationResult;
  //       if ('status' in error) {
  //         if (error.status && error.status >= 400 && error.status < 500) {
  //           toast({
  //             variant: 'destructive',
  //             title: String(error.data),
  //           });
  //         }
  //       }
  //     }
  //   }
  //   if (signUpMutationResult.isLoading) {
  //     toast({
  //       variant: 'default',
  //       description: (
  //         <>
  //           <Spinner />
  //         </>
  //       ),
  //     });
  //   }
  //   if (signUpMutationResult.isSuccess) {
  //     toast({}).dismiss();

  //     router.push(routeProto.HOME());
  //   }
  // }, [signUpMutationResult]);

  return (
    <motion.div
      initial={{ opacity: 0, left: 0 }}
      className="absolute w-1/2  h-full"
      animate={{
        opacity: display === 'sign up' ? 1 : 0,
        right: 0,
        left: 'unset',
      }}
      transition={{ duration, ease: 'linear' }}>
      <Card className=" col-span-1 w-full h-full shadow-none rounded-r-sm rounded-l-none">
        <CardHeader>
          <h1 className=" m-4 text-xl font-bold">{t('auth.sign in.label')}</h1>
        </CardHeader>
        <CardBody className=" flex flex-col justify-start p-8 items-center gap-2">
          <GoogleLoginButton></GoogleLoginButton>
          <div className=" grid grid-cols-12 w-full grid-rows-1">
            <Divider className=" col-span-4 my-3"></Divider>
            <div className=" col-span-4 w-full text-center">
              {t('auth.sign in.or email')}
            </div>
            <Divider className=" col-span-4 my-3"></Divider>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full flex-col flex justify-center items-center gap-4">
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder={t('auth.sign in.email.label')}
                        className="w-full"
                        radius="sm"
                        type="email"
                        variant="underlined"
                        isInvalid={
                          form.formState.errors.user_email ? true : false
                        }
                        errorMessage={form.formState.errors.user_email?.message}
                        labelPlacement="outside"
                        size="lg"
                        startContent={<MdOutlineEmail />}
                        {...field}></Input>
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <PasswordInputComponent
                        placeholder={t('auth.sign in.password.label')}
                        className="w-full"
                        type="password"
                        radius="sm"
                        isInvalid={
                          form.formState.errors.user_password ? true : false
                        }
                        errorMessage={
                          form.formState.errors.user_password?.message
                        }
                        variant="underlined"
                        startContent={<MdOutlinePassword />}
                        labelPlacement="outside"
                        size="lg"
                        {...field}></PasswordInputComponent>
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder={t('auth.sign up.username.label')}
                        className="w-full"
                        type="text"
                        radius="sm"
                        variant="underlined"
                        isInvalid={
                          form.formState.errors.user_name ? true : false
                        }
                        errorMessage={form.formState.errors.user_name?.message}
                        startContent={<LuUser />}
                        labelPlacement="outside"
                        size="lg"
                        {...field}></Input>
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
                {t('auth.sign in.action')}
              </Button>
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
  );
};
