import { cn } from '@/lib/utils';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@heroui/react';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import { NavLink, Outlet, useLocation } from 'react-router';
import SettingDialog from '../setting/setting.dialog';
import AudioDialog from './componetPage/audio.dialog';
import CardPage from './componetPage/card';
import DeskTitleModel from './componetPage/desk-title.model';
import FlipCard from './componetPage/Flipcard';
import StackCardPage from './componetPage/stack-card';

export interface ComponentsUrlProps {
  url: string;
  name: string;
  component: ReactNode;
}

export const ComponentsUrl: ComponentsUrlProps[] = [
  {
    url: 'card',
    name: 'Card',
    component: <CardPage />,
  },
  {
    url: 'flipCard',
    name: 'Flip card',
    component: <FlipCard />,
  },
  {
    url: 'stack-card',
    name: 'Stack card',
    component: <StackCardPage />,
  },
  {
    url: 'audio-dialog',
    name: 'audio dialog',
    component: <AudioDialog />,
  },
  {
    url: 'setting-dialog',
    name: 'Setting dialog',
    component: <SettingDialog />,
  },
  {
    url: 'Desk-title-editor',
    name: 'Desk title editor',
    component: <DeskTitleModel />,
  },
];

export const SideLinkComponent = ({
  url,
  name,
  onActive,
}: {
  url: string;
  isActive?: boolean;
  name: string;
  onActive?: (e: { url: string; name: string }) => void;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <NavLink
      to={url}
      onClick={() => {
        onActive?.({ url, name });
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {({ isActive }) => (
        <motion.div
          className={cn(
            'flex justify-start items-center gap-4',
            isActive || isHover ? 'text-gray-950  font-bold' : 'text-gray-500'
          )}>
          <motion.div
            className="origin-left"
            animate={{
              scaleX: isHover ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              type: 'tween',
            }}>
            <MdNavigateNext />
          </motion.div>
          {name}
        </motion.div>
      )}
    </NavLink>
  );
};

export const PlayGroundLayout = () => {
  const location = useLocation();

  return (
    <div className=" min-h-screen flex justify-center items-center min-w-full">
      <motion.div>
        <Card className=" px-4 min-h-screen rounded-l-none rounded-r-sm shadow-none">
          <CardHeader className=" flex items-center justify-between gap-6">
            <div className=" font-bold">All components</div>
            <RiArrowDownSLine size={20} />
          </CardHeader>
          <CardBody className=" flex justify-start items-start flex-col gap-2 pl-4">
            {ComponentsUrl.map(({ url, name }) => (
              <SideLinkComponent url={url} name={name}></SideLinkComponent>
            ))}
          </CardBody>
        </Card>
      </motion.div>
      <Divider orientation="vertical" className=" h-screen"></Divider>
      <div className=" flex-1 flex justify-center h-screen flex-col items-center">
        <div className=" w-full ">
          <Breadcrumbs className="m-4">
            <BreadcrumbItem size="lg">All components</BreadcrumbItem>

            <BreadcrumbItem size="lg">
              {
                ComponentsUrl.find(
                  (item) =>
                    item.url === location.pathname.split('/components/')[1]
                )?.name
              }
            </BreadcrumbItem>
          </Breadcrumbs>
          <Divider orientation="horizontal" className=" w-full"></Divider>
        </div>
        <div className=" flex-1 w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
