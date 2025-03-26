'use client';
import {
  Sidebar,
  SidebarBody,
  SideBarButton,
  SideBarItemButon,
} from '@/components/aceternity/sidebar';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Button, Divider } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdHome,
  MdLibraryBooks,
  MdOutlineHome,
  MdOutlineLibraryBooks,
  MdOutlineSettings,
  MdSettings,
} from 'react-icons/md';

import { routeProto } from '@/redux/store/route.slice';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { CiLock } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router';

export function PrecreateNewComponent({
  link,
  setselectButton,
  selectButton,
  idx,
}: Parameters<typeof SideBarItemButon>[0] & {
  link: SideBarButton;
  setselectButton: React.Dispatch<React.SetStateAction<string | undefined>>;
  idx: string | number;

  selectButton: React.SetStateAction<string | undefined>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <SideBarItemButon
        onClick={() => {
          // link.href && navigate(link.href);
          setselectButton(link.label);
          onOpen();
        }}
        className={selectButton === link.label ? 'bg-color-4/40' : ''}
        key={idx}
        button={{
          ...link,
          icon: selectButton === link.label ? link.iconFill : link.iconLine,
        }}
        variant="light"
        {...link.buttonProps}
      />
      <Modal
        className=" rounded-sm"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Mhat do you want to create today?
              </ModalHeader>
              <ModalBody className=" m-4 gap-6 flex flex-col">
                <Button
                  onPress={() =>
                    // * redirect to create new desk page
                    navigate(routeProto.CREATE_NEW_DESK())
                  }
                  className=" w-full h-20 text-2xl rounded-sm  bg-color-4/20 border-color-4 border-x-4 border-t-4 border-b-8"
                  variant="light">
                  create new desk
                </Button>
                <Button
                  endContent={<CiLock />}
                  isDisabled={true}
                  className=" w-full h-20 text-2xl rounded-sm  border-color-3 bg-color-3/20 border-x-4 border-t-4 border-b-8"
                  variant="light">
                  create new document
                </Button>
                <Button
                  endContent={<CiLock />}
                  disabled={true}
                  isDisabled={true}
                  className=" w-full h-20 text-2xl rounded-sm  border-color-2 bg-color-2/20 border-x-4 border-t-4 border-b-8"
                  variant="light">
                  create new slide
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  variant="bordered"
                  className=" rounded-md"
                  onPress={onClose}>
                  cancal
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const topSideBar: SideBarButton[] = [
    {
      label: 'Dashboard',
      iconLine: (
        <MdOutlineHome
          size={24}
          className="text-neutral-700 dark:text-neutral-200 font-thin text-sm  flex-shrink-0"
        />
      ),
      href: routeProto.HOME(),
      iconFill: (
        <MdHome
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },

    {
      label: 'Library',
      iconLine: (
        <MdOutlineLibraryBooks
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
      href: routeProto.LIBRARY(),

      iconFill: (
        <MdLibraryBooks
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },

    {
      label: 'Add',
      iconLine: (
        <MdAdd
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),

      iconFill: (
        <MdAdd
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
    // {
    //   label: "User",
    //   iconLine: (
    //     <FaRegUserCircle
    //       size={24}
    //       className="text-neutral-700 dark:text-neutral-200 font-thin text-sm  flex-shrink-0"
    //     />
    //   ),

    //   iconFill: (
    //     <FaUserCircle
    //       size={24}
    //       className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
    //     />
    //   ),
    // },
  ];

  const bottomSideBar: SideBarButton[] = [
    {
      label: 'Settings',
      iconLine: (
        <MdOutlineSettings
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
      iconFill: (
        <MdSettings
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
  ];
  const { sidebar } = useAppSelector(
    (state) => state.persistedReducer.HomePage
  );
  const [selectButton, setselectButton] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    topSideBar.forEach((item) => {
      if (item.href === location.pathname) {
        setselectButton(item.label);
      }
    });
  }, [location]);

  return (
    <>
      <div
        className={cn(
          'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
          'flex-1' // for your use case, use `h-screen` instead of `h-[60vh]`
        )}>
        <div>
          <Sidebar open={sidebar.isOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 justify-between overflow-y-auto overflow-x-hidden">
                <div className=" flex flex-col gap-4 ">
                  {topSideBar.map((link, idx) => {
                    if (link.label === 'Add') {
                      return (
                        <PrecreateNewComponent
                          link={link}
                          idx={idx}
                          selectButton={selectButton}
                          setselectButton={setselectButton}
                          onClick={() => {
                            link.href && navigate(link.href);
                            setselectButton(link.label);
                          }}
                          className={
                            selectButton === link.label ? 'bg-color-4/40' : ''
                          }
                          key={idx}
                          button={{
                            ...link,
                            icon:
                              selectButton === link.label
                                ? link.iconFill
                                : link.iconLine,
                          }}
                          variant="light"
                          {...link.buttonProps}></PrecreateNewComponent>
                      );
                    }

                    return (
                      <SideBarItemButon
                        onClick={() => {
                          link.href && navigate(link.href);
                          setselectButton(link.label);
                        }}
                        className={
                          selectButton === link.label ? 'bg-color-4/40' : ''
                        }
                        key={idx}
                        button={{
                          ...link,
                          icon:
                            selectButton === link.label
                              ? link.iconFill
                              : link.iconLine,
                        }}
                        variant="light"
                        {...link.buttonProps}
                      />
                    );
                  })}
                </div>
                <div className=" flex flex-col ">
                  {bottomSideBar.map((link, idx) => (
                    <SideBarItemButon
                      onClick={() => setselectButton(link.label)}
                      className={
                        selectButton === link.label ? 'bg-color-4/40' : ''
                      }
                      key={idx}
                      button={{
                        ...link,
                        icon:
                          selectButton === link.label
                            ? link.iconFill
                            : link.iconLine,
                      }}
                      variant="light"
                    />
                  ))}
                </div>
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
        {/* <Dashboard /> */}
        <div>
          <Divider orientation="vertical" className=" h-full"></Divider>
        </div>
        <>{children}</>
      </div>
    </>
  );
}
