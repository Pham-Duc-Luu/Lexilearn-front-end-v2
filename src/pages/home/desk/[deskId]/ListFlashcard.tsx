'use client';
import { Flashcard } from '@/api';
import { cn } from '@/lib/utils';
import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Divider,
  Image,
} from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FlashcardPre = ({
  data,
  index,
  className,
  ...props
}: { data: Flashcard; index: number } & CardProps) => {
  return (
    <Card
      className={cn('  rounded-md p-2', className)}
      shadow="none"
      {...props}
      isPressable>
      <CardHeader className=" font-light  text-sm p-0  justify-between">
        <div>{index + 1}. flashcard</div>
      </CardHeader>
      <CardBody className=" flex justify-center items-center gap-4 px-0 py-2 flex-row">
        <div className=" flex-1 flex items-center justify -start gap-4 text-md">
          <Image
            height={60}
            className=" aspect-square rounded-md object-cover"
            src={data.front_image}
          />
          <div className=" overflow-hidden">{data.front_text}</div>
        </div>
        <Divider orientation="vertical" className=" h-20"></Divider>
        <div className=" flex-1 flex items-center justify-start gap-4 text-md">
          <Image
            className=" aspect-square object-cover rounded-md"
            height={60}
            src={data.back_image}
          />
          <div className=" overflow-hidden">{data.back_text}</div>
        </div>
      </CardBody>
    </Card>
  );
};
const ListFlashcard = ({
  previewFlashcards,
  className,
  onSelectFlashcard = () => {},
  ...props
}: {
  previewFlashcards?: Flashcard[];
  onSelectFlashcard?: (e: Flashcard & { index: number }) => void;
} & CardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Card className={cn(' rounded-sm', className)} {...props}>
      <CardHeader
        className=" font-bold justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}>
        <div>{previewFlashcards?.length} items</div>
        <FaChevronDown />
      </CardHeader>
      <Divider></Divider>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 500 }}
            exit={{ height: 0 }}
            className="  overflow-y-scroll ">
            {previewFlashcards?.map((data, index) => (
              <>
                <FlashcardPre
                  onPress={(e) => onSelectFlashcard({ ...data, index })}
                  className=" w-full"
                  index={index}
                  data={data}></FlashcardPre>
                <Divider></Divider>
              </>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ListFlashcard;
