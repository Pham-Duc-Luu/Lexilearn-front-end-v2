import { Button } from '@heroui/react';
import {
  IconAdjustmentsAlt,
  IconBrandGithub,
  IconBrandMeta,
  IconCards,
  IconFileDescription,
  IconHome,
  IconLibrary,
  IconLogin,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { routeProto } from '@/redux/store/route.slice';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (href.startsWith('http')) {
          window.open(href, '_blank');
        } else {
          navigate(href);
        }
      }}
      className=" cursor-pointer">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative">
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ThemModeIcon({ mouseX }: { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
  }, []);

  return (
    <div
      className=" cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative">
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
              Switch to {theme === 'light' ? 'dark mode' : 'light mode'}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center">
          {theme === 'dark' ? (
            <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ) : (
            <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3',
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
      <ThemModeIcon mouseX={mouseX}></ThemModeIcon>
    </motion.div>
  );
};

/**
 *
 * THIS BUTTON USE TO NAVIGATE BETWEEN PAGES
 */
export function SettingBox() {
  const links = [
    {
      title: 'Home page',
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.HOME(),
    },
    {
      title: 'Login',
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.AUTH(),
    },
    {
      title: 'Edit desk page',
      icon: (
        <IconFileDescription className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.CREATE_NEW_DESK(),
    },
    {
      title: 'profile',
      icon: (
        <FaRegUserCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.PROFILE(),
    },
    {
      title: 'library',
      icon: (
        <IconLibrary className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.LIBRARY(),
    },
    {
      title: 'Review flashcard page',
      icon: (
        <IconCards className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: routeProto.REVIEW_DESK_FLASHCARD(),
    },
    {
      title: 'Meta',
      icon: (
        <IconBrandMeta className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: 'https://www.facebook.com/profile.php?id=100054196254333',
    },
    {
      title: 'GitHub',
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: 'https://github.com/Pham-Duc-Luu/LexiLearn-frontend',
    },
  ];
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className=" absolute right-6 bottom-6 flex flex-row-reverse justify-center origin-left items-center h-14"
      style={{ zIndex: 999 }}>
      <Button
        radius="full"
        size="lg"
        isIconOnly
        onPress={() => {
          setToggle(!toggle);
        }}>
        <IconAdjustmentsAlt className=" text-neutral-500 dark:text-neutral-300 "></IconAdjustmentsAlt>
      </Button>
      <motion.div
        animate={{ scaleX: toggle ? 1 : 0, display: toggle ? 'block' : 'none' }}
        style={{ transformOrigin: 'right center' }} // Set transform origin to the right
        className={cn(
          'flex items-center absolutes justify-center left-0  -translate-x-full'
        )}>
        <FloatingDockDesktop items={links}></FloatingDockDesktop>
      </motion.div>
    </div>
  );
}
