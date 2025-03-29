'use client';
import { useGetUserProfileQuery } from '@/api/user service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toggleSideBar } from '@/redux/store/HomePage.proto.slice';
import { useAppDispatch } from '@/redux/store/ProtoStore.slice';
import { routeProto } from '@/redux/store/route.slice';
import {
  // Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  useDisclosure,
} from '@heroui/react';
import React from 'react';
import { BiBell } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { MdHelpOutline, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router';
import SparklesText from './magicui/sparkles-text';
const NotificationSideDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="bordered" radius="sm" onPress={onOpen}>
        <BiBell size={26} />
      </Button>
      <Drawer
        className=" rounded-sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export interface AvatarDropdownOptions {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

const AvatarSettingDropdown = () => {
  const userProfileQuery = useGetUserProfileQuery();
  // Important : this is the avatar options
  const options: AvatarDropdownOptions[] = [
    { label: 'Profile', icon: <CgProfile />, href: routeProto.PROFILE() },
    { label: 'Help & Feedback', icon: <MdHelpOutline /> },
    { label: 'Log out', icon: <MdLogout /> },
  ];

  const navigate = useNavigate();
  return (
    <Dropdown className=" rounded-sm" placement="bottom-start">
      <DropdownTrigger>
        {/* <Avatar
          as="button"
          name={currentData?.metadata?.name}
          className="transition-transform"
          isBordered={true}
          src={currentData?.metadata?.avatar}
        /> */}
        <Avatar className=" cursor-pointer">
          <AvatarImage
            src={userProfileQuery.data?.getUserProfile?.avatar}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        {options.map((option, index) => (
          <DropdownItem
            className=" rounded-sm"
            key={index}
            onPress={() => {
              if (option?.href) navigate(option.href);
            }}
            startContent={option.icon}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const NavBarProtoV1 = () => {
  const dispatch = useAppDispatch();
  return (
    <Navbar className=" flex justify-between flex-1 max-h-16" maxWidth="full">
      <div className="flex justify-center items-center gap-6 m-2">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => dispatch(toggleSideBar())}>
          <FaBars size={20} />
        </Button>
        <SparklesText
          text="LexiLearn"
          sparklesCount={4}
          className=" text-xl"></SparklesText>
      </div>
      <div className=" flex gap-4 ">
        <NotificationSideDrawer></NotificationSideDrawer>
        <AvatarSettingDropdown></AvatarSettingDropdown>
      </div>
    </Navbar>
  );
};

export default NavBarProtoV1;
