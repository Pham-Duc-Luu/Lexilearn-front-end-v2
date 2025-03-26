'use client';
import React from 'react';
import SparklesText from './magicui/sparkles-text';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarProps,
} from '@heroui/react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import DropdownAvatar from './DropdownAvatar';
import { useAppSelector } from '@/redux/store/hooks';
import { AUTH_SIGN_IN, DASHBOARD_ROUTE } from '@/redux/store/route.slice';

const MainNavbar = (navbarProps: NavbarProps) => {
  const router = useRouter();
  const t = useTranslations('dashboard.my collection');
  const { auth } = useAppSelector((state) => state.persistedReducer);
  const Tutils = useTranslations('utils');

  return (
    <Navbar
      isBordered
      {...navbarProps}
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}>
      <NavbarContent justify="start">
        <NavbarBrand
          className="mr-4  cursor-pointer"
          onClick={() => {
            router.push(DASHBOARD_ROUTE());
          }}>
          {/* <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">ACME</p> */}

          <SparklesText
            text="LexiLearn"
            sparklesCount={4}
            className=" text-xl"></SparklesText>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="primary">
              {t('title')}
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-3" justify="end">
          {auth?.access_token ? (
            <DropdownAvatar></DropdownAvatar>
          ) : (
            <Button
              size="lg"
              variant="bordered"
              onClick={() => {
                router.push(AUTH_SIGN_IN());
              }}>
              {Tutils('sign in')}
            </Button>
          )}
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

export default MainNavbar;
