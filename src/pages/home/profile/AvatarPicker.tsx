import AvatarView, { genConfig } from '@/components/avatar-generator';
import SectionWrapper from '@/components/avatar-generator/AvatarEditor/SectionWrapper';
import Ear from '@/components/avatar-generator/ear/index';
import Eyes from '@/components/avatar-generator/eyes/index';
import Face from '@/components/avatar-generator/face/index';
import Glasses from '@/components/avatar-generator/glasses/index';
import Hair from '@/components/avatar-generator/hair/index';
import Hat from '@/components/avatar-generator/hat/index';
import Mouth from '@/components/avatar-generator/mouth/index';
import Nose from '@/components/avatar-generator/nose/index';
import Shirt from '@/components/avatar-generator/shirt/index';

import { AvatarFullConfig } from '@/components/avatar-generator/types';
import { defaultOptions } from '@/components/avatar-generator/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, Card, CardBody, Divider, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import lodash from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import {
  MdKeyboardArrowDown,
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineFileDownload,
} from 'react-icons/md';
export interface StyleDropdownConfigMenuProps<T> {
  styleOptions?: T[];
  style?: T;
  color?: string;
  onChange?: (e: { newStyle?: T; newColor?: string }) => void;
}
export function StyleDropdownConfigMenu<T>({
  styleOptions = [],
  style,
  onChange,
  color,
}: StyleDropdownConfigMenuProps<T>) {
  const [isPickColor, setIsPickColor] = useState(false);
  const [newColor, setNewColor] = useState(color);
  const [index, setIndex] = useState(
    Math.max(
      0,
      lodash.findIndex(styleOptions, (o) => o === style)
    )
  );

  const next = () => {
    if (styleOptions && style)
      setIndex((prevIndex) => (prevIndex + 1) % styleOptions.length);
  };

  const prev = () => {
    if (styleOptions && style)
      setIndex((prevIndex) =>
        prevIndex === 0 ? styleOptions.length - 1 : prevIndex - 1
      );
  };

  useEffect(() => {
    onChange?.({ newStyle: styleOptions[index], newColor });
  }, [newColor, styleOptions[index], style]);
  return (
    <DropdownMenuContent className="w-56">
      <>
        {/* <DropdownMenuLabel>Hair style</DropdownMenuLabel> */}
        {styleOptions.length > 0 && (
          <>
            <DropdownMenuLabel className=" flex items-center p-0 justify-between">
              <Button
                onPress={prev}
                isIconOnly
                variant="light"
                className=" rounded-sm">
                <MdNavigateBefore size={20} />
              </Button>
              <>{styleOptions[index]}</>
              <Button
                onPress={next}
                isIconOnly
                variant="light"
                className=" rounded-sm">
                <MdNavigateNext size={20} />
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {color && color.length > 0 && (
          <DropdownMenuLabel>
            <Button
              onPress={() => {
                setIsPickColor(!isPickColor);
              }}
              className=" w-full rounded-sm justify-between"
              variant="light"
              endContent={<MdKeyboardArrowDown size={20} />}>
              Pick color
            </Button>
          </DropdownMenuLabel>
        )}
      </>

      <>
        <DropdownMenuLabel className="py-0">
          <motion.div
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            initial={{ height: '0px' }}
            animate={{
              height: isPickColor ? '200px' : '0px',
              overflow: 'hidden',
              marginTop: isPickColor ? 2 : 0,
              marginBottom: isPickColor ? 2 : 0,
            }}>
            <HexColorPicker
              color={newColor}
              className=" p-0"
              onChange={(newColor) => {
                setNewColor(newColor);
              }}
            />
          </motion.div>
        </DropdownMenuLabel>
      </>
    </DropdownMenuContent>
  );
}

export function StyleDropdownConfigButton<T>({
  children,
  ...props
}: {
  children: ReactNode;
} & StyleDropdownConfigMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button
            isIconOnly
            variant="light"
            as="div"
            onPress={() => setIsOpen(true)}>
            <SectionWrapper className="w-10 h-10 rounded-full p-1" tip="">
              {children}
            </SectionWrapper>
          </Button>
        </DropdownMenuTrigger>
        {isOpen && (
          <StyleDropdownConfigMenu {...props}></StyleDropdownConfigMenu>
        )}
      </DropdownMenu>
    </>
  );
}

const AvatarPicker = () => {
  const [config, setConfig] = useState<AvatarFullConfig>({
    sex: 'man',
    faceColor: '#ffffff',
    earSize: 'small',
    eyeStyle: 'circle',
    noseStyle: 'round',
    mouthStyle: 'smile',
    shirtStyle: 'hoody',
    glassesStyle: 'none',
    hairColor: '#000000',
    hairStyle: 'normal',
    hatStyle: 'beanie',
    hatColor: '#000000',
    eyeBrowStyle: 'up',
    shirtColor: '#ffffff',
    bgColor: '#ffffff',
  });
  return (
    <div className=" col-span-12 flex gap-4 m-10 justify-center items-center flex-col">
      <AvatarView className="w-40 h-40 " {...genConfig(config)}></AvatarView>
      <Card>
        <CardBody className="  flex justify-center gap-4 flex-row items-center">
          {/* Face */}

          <StyleDropdownConfigButton
            color={config.faceColor}
            onChange={(e) => {
              const newConfig = {
                ...config,
              };
              setConfig({ ...config, faceColor: e.newColor });
              console.log(newConfig);
            }}>
            <Face color={config.faceColor} />
          </StyleDropdownConfigButton>

          {/* Hair style */}
          <StyleDropdownConfigButton
            color={config.hairColor}
            style={defaultOptions['hairStyleMan'][0]}
            onChange={(e) => {
              setConfig({
                ...config,
                hairColor:
                  e?.newColor && e?.newColor?.length > 0
                    ? e.newColor
                    : config.hairColor,
                hairStyle: e.newStyle,
              });
            }}
            styleOptions={defaultOptions['hairStyleMan']}>
            <Hair
              style={config?.hairStyle}
              color={config?.hairColor ? config?.hairColor : '#000000'}
              colorRandom={false}
            />
          </StyleDropdownConfigButton>

          {/* Hat style */}
          <StyleDropdownConfigButton
            color={config.hatColor}
            style={defaultOptions['hatStyle'][0]}
            onChange={(e) => {
              setConfig({
                ...config,
                hatColor:
                  e?.newColor && e?.newColor?.length > 0
                    ? e.newColor
                    : config.hatColor,
                hatStyle: e.newStyle,
              });
            }}
            styleOptions={defaultOptions['hatStyle']}>
            <Hat
              style={config.hatStyle}
              color={config?.hatColor ? config?.hatColor : '#000000'}
            />
          </StyleDropdownConfigButton>

          {/* Eyes style */}
          <StyleDropdownConfigButton
            style={config.eyeStyle}
            styleOptions={defaultOptions['eyeStyle']}
            onChange={(e) => {
              setConfig({ ...config, eyeStyle: e?.newStyle });
            }}>
            <Eyes style={config.eyeStyle} />
          </StyleDropdownConfigButton>

          {/* Glasses style */}
          <StyleDropdownConfigButton
            style={config.glassesStyle}
            styleOptions={defaultOptions['glassesStyle']}
            onChange={(e) => {
              setConfig({ ...config, glassesStyle: e?.newStyle });
            }}>
            <Glasses style={config.glassesStyle} />
          </StyleDropdownConfigButton>

          {/* Ear style */}
          <StyleDropdownConfigButton
            style={config.earSize}
            styleOptions={defaultOptions['earSize']}
            onChange={(e) => {
              setConfig({ ...config, earSize: e?.newStyle });
            }}>
            {/* <Glasses style={config.glassesStyle} /> */}
            <Ear size={config.earSize} color="#fff" />
          </StyleDropdownConfigButton>

          {/* Nose style */}
          <StyleDropdownConfigButton
            style={config.noseStyle}
            styleOptions={defaultOptions['noseStyle']}
            onChange={(e) => {
              setConfig({ ...config, noseStyle: e?.newStyle });
            }}>
            {/* <Glasses style={config.glassesStyle} /> */}
            <Nose style={config.noseStyle} />
          </StyleDropdownConfigButton>

          {/* Mouth style */}
          <StyleDropdownConfigButton
            style={config.mouthStyle}
            styleOptions={defaultOptions['mouthStyle']}
            onChange={(e) => {
              setConfig({ ...config, mouthStyle: e?.newStyle });
            }}>
            {/* <Glasses style={config.glassesStyle} /> */}
            <Mouth style={config.mouthStyle} />
          </StyleDropdownConfigButton>

          {/* Shirt style */}

          <StyleDropdownConfigButton
            style={config.shirtStyle}
            styleOptions={defaultOptions['shirtStyle']}
            color={config.shirtColor}
            onChange={(e) => {
              setConfig({
                ...config,
                shirtStyle: e?.newStyle,
                shirtColor: e.newColor,
              });
            }}>
            {/* <Glasses style={config.glassesStyle} /> */}
            <Shirt style={config.shirtStyle} color={config.shirtColor} />
          </StyleDropdownConfigButton>

          {/* backgroud style */}
          <StyleDropdownConfigButton
            color={config.bgColor}
            onChange={(e) => {
              setConfig({
                ...config,
                bgColor: e?.newColor,
              });
            }}>
            {/* <Glasses style={config.glassesStyle} /> */}
            <div
              className=" w-full h-full rounded-full"
              style={{
                backgroundColor: config.bgColor,
              }}></div>
          </StyleDropdownConfigButton>
          <Divider orientation="vertical" className="h-6"></Divider>

          <Tooltip content="Set the avatar" placement="bottom">
            <Button isIconOnly variant="light" color="primary">
              <MdOutlineFileDownload size={28} />
            </Button>
          </Tooltip>
        </CardBody>
      </Card>
    </div>
  );
};

export default AvatarPicker;
