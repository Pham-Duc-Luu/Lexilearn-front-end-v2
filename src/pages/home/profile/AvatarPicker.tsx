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
import {
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  Tooltip,
} from '@heroui/react';
import domtoimage from 'dom-to-image';
import FormData from 'form-data';
import { motion } from 'framer-motion';
import lodash from 'lodash';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';
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

const AvatarPicker = ({
  config,
  setConfig = () => {},
  isLoading = false,
  ...props
}: {
  config?: Partial<AvatarFullConfig>;
  isLoading?: boolean;
  setConfig?: (config: AvatarFullConfig) => void;
  onExport?: (formdata: FormData) => void;
}) => {
  // const [config, setConfig] = useState<AvatarFullConfig>(
  //   genConfig(props.config)
  // );

  const captureRef = useRef<HTMLDivElement>(null);
  const avatarId = useId();
  const captureAndUpload = async () => {
    const scale = 2;
    const node = document.getElementById(avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          'border-radius': 0,
        },
        width: node.offsetWidth * scale,
      });
      const formdata = new FormData();
      formdata.append('image', blob);

      props?.onExport?.(formdata);
    }
  };

  // useEffect(() => {
  //   props?.setConfig?.(config);
  // }, [config]);

  return (
    <div className=" col-span-12 flex gap-4 m-10 justify-center items-center flex-col">
      <div ref={captureRef} id={avatarId}>
        <AvatarView className="w-40 h-40 " {...genConfig(config)}></AvatarView>
      </div>
      <Card>
        <CardBody className="  flex justify-center gap-4 flex-row items-center">
          {/* Sex  */}

          {/* <StyleDropdownConfigButton
            styleOptions={defaultOptions['sex']}
            style={genConfig(config).sex}
            onChange={(e) => {
              setConfig({ ...config, sex: e.newStyle ? e.newStyle : 'man' });
            }}>
            <Face color={genConfig(config).faceColor} />
          </StyleDropdownConfigButton> */}

          {/* Face */}

          <StyleDropdownConfigButton
            color={genConfig(config).faceColor}
            onChange={(e) => {
              setConfig({
                ...config,
                faceColor: e.newColor ? e.newColor : '#ffffff',
              });
            }}>
            <Face color={genConfig(config).faceColor} />
          </StyleDropdownConfigButton>

          {/* Hair style */}
          <StyleDropdownConfigButton
            color={genConfig(config).hairColor}
            style={defaultOptions['hairStyleMan'][0]}
            onChange={(e) => {
              setConfig({
                ...config,
                hairColor:
                  e?.newColor && e?.newColor?.length > 0
                    ? e.newColor
                    : genConfig(config).hairColor,
                hairStyle: e.newStyle ? e.newStyle : 'normal',
              });
            }}
            styleOptions={Array.from(
              new Set([
                ...defaultOptions['hairStyleMan'],
                ...defaultOptions['hairStyleWoman'],
              ])
            )}>
            <Hair
              style={genConfig(config).hairStyle}
              color={genConfig(config).hairColor}
              colorRandom={false}
            />
          </StyleDropdownConfigButton>

          {/* Hat style */}
          <StyleDropdownConfigButton
            color={genConfig(config).hatColor}
            style={defaultOptions['hatStyle'][0]}
            onChange={(e) => {
              setConfig({
                ...config,
                hatColor:
                  e?.newColor && e?.newColor?.length > 0
                    ? e.newColor
                    : genConfig(config).hatColor,
                hatStyle: e.newStyle ? e.newStyle : 'none',
              });
            }}
            styleOptions={defaultOptions['hatStyle']}>
            <Hat
              style={genConfig(config).hatStyle}
              color={genConfig(config)?.hatColor}
            />
          </StyleDropdownConfigButton>

          {/* Eyes style */}
          <StyleDropdownConfigButton
            style={genConfig(config).eyeStyle}
            styleOptions={defaultOptions['eyeStyle']}
            onChange={(e) => {
              setConfig({ ...config, eyeStyle: e?.newStyle });
            }}>
            <Eyes style={genConfig(config).eyeStyle} />
          </StyleDropdownConfigButton>

          {/* Glasses style */}
          <StyleDropdownConfigButton
            style={genConfig(config).glassesStyle}
            styleOptions={defaultOptions['glassesStyle']}
            onChange={(e) => {
              setConfig({ ...config, glassesStyle: e?.newStyle });
            }}>
            <Glasses style={genConfig(config).glassesStyle} />
          </StyleDropdownConfigButton>

          {/* Ear style */}
          <StyleDropdownConfigButton
            style={genConfig(config).earSize}
            styleOptions={defaultOptions['earSize']}
            onChange={(e) => {
              setConfig({ ...config, earSize: e?.newStyle });
            }}>
            {/* <Glasses style={genConfig(config).glassesStyle} /> */}
            <Ear size={genConfig(config).earSize} color="#fff" />
          </StyleDropdownConfigButton>

          {/* Nose style */}
          <StyleDropdownConfigButton
            style={genConfig(config).noseStyle}
            styleOptions={defaultOptions['noseStyle']}
            onChange={(e) => {
              setConfig({ ...config, noseStyle: e?.newStyle });
            }}>
            {/* <Glasses style={genConfig(config).glassesStyle} /> */}
            <Nose style={genConfig(config).noseStyle} />
          </StyleDropdownConfigButton>

          {/* Mouth style */}
          <StyleDropdownConfigButton
            style={genConfig(config).mouthStyle}
            styleOptions={defaultOptions['mouthStyle']}
            onChange={(e) => {
              setConfig({ ...config, mouthStyle: e?.newStyle });
            }}>
            {/* <Glasses style={genConfig(config).glassesStyle} /> */}
            <Mouth style={genConfig(config).mouthStyle} />
          </StyleDropdownConfigButton>

          {/* Shirt style */}

          <StyleDropdownConfigButton
            style={genConfig(config).shirtStyle}
            styleOptions={defaultOptions['shirtStyle']}
            color={genConfig(config).shirtColor}
            onChange={(e) => {
              setConfig({
                ...config,
                shirtStyle: e?.newStyle,
                shirtColor: e.newColor,
              });
            }}>
            {/* <Glasses style={genConfig(config).glassesStyle} /> */}
            <Shirt
              style={genConfig(config).shirtStyle}
              color={genConfig(config).shirtColor}
            />
          </StyleDropdownConfigButton>

          {/* backgroud style */}
          <StyleDropdownConfigButton
            color={genConfig(config).bgColor}
            onChange={(e) => {
              setConfig({
                ...config,
                bgColor: e?.newColor,
              });
            }}>
            {/* <Glasses style={genConfig(config).glassesStyle} /> */}
            <div
              className=" w-full h-full rounded-full"
              style={{
                backgroundColor: genConfig(config).bgColor,
              }}></div>
          </StyleDropdownConfigButton>
          <Divider orientation="vertical" className="h-6"></Divider>

          {isLoading ? (
            <Spinner className=" h-10 w-10"></Spinner>
          ) : (
            <Tooltip content="Set the avatar" placement="bottom">
              <Button
                isIconOnly
                variant="light"
                color="primary"
                className=" h-10 w-10"
                onPress={captureAndUpload}>
                <MdOutlineFileDownload size={28} />
              </Button>
            </Tooltip>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AvatarPicker;
