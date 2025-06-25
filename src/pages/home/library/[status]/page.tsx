'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@heroui/react';
import { HiDotsVertical } from 'react-icons/hi';
import {
  MdOutlineModeEdit,
  MdOutlinePendingActions,
  MdPlayArrow,
} from 'react-icons/md';

import { Desk, useGetDeskNeedReviewFlashcarQuantityQuery } from '@/api';
import { cn } from '@/lib/utils';
import { routeProto } from '@/redux/store/route.slice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { RxIdCard } from 'react-icons/rx';
import { useNavigate } from 'react-router';
dayjs.extend(relativeTime);

export default function LibraryCardItem({
  item,
  className,
  onDelete,
  onDeleteSync,
  ...props
}: {
  item: Desk;
  onDelete?: (e: Desk) => void;
  onDeleteSync?: () => Promise<any>;
} & CardProps) {
  const [isDisplayThumbnail, setIsDisplayThumbnail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const NeedReviewFlashcarQuantity = useGetDeskNeedReviewFlashcarQuantityQuery({
    deskId: Number(item?.id),
  });

  const handleDeleteSync = async () => {
    try {
      setIsLoading(true);

      if (onDeleteSync) {
        await onDeleteSync?.();
        setIsLoading(false);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Card
      isDisabled={isLoading}
      className={cn(
        ' w-full rounded-sm flex flex-row justify-start items-center  p-2 md:h-36 ',
        className,
        isLoading && 'cursor-wait'
      )}
      {...props}>
      {isDisplayThumbnail && item?.thumbnail && (
        <Image
          className=" h-full aspect-square rounded-sm"
          removeWrapper
          onError={() => {
            setIsDisplayThumbnail(false);
          }}
          onLoad={() => {}}
          fallbackSrc
          src={item?.thumbnail}></Image>
      )}

      <CardBody
        onClick={() => navigate(routeProto.DESK(item.id))}
        className=" flex h-full gap-2 mx-2 cursor-pointer">
        <div className=" flex justify-start items-center gap-4">
          <h1 className=" truncate text-xl font-semibold">{item?.name}</h1>
          <Chip size="sm">flashcards</Chip>
        </div>
        <div className=" flex gap-8 ">
          {/* <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
            <TbVocabulary></TbVocabulary>
            {`${0} vocabularies`}
          </div> */}
          <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
            <RxIdCard></RxIdCard>
            {`${item?.flashcardQuantity} flashcards`}
          </div>
          {NeedReviewFlashcarQuantity?.data?.getDeskNeedReviewFlashcard && (
            <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
              <MdOutlinePendingActions></MdOutlinePendingActions>
              {`${NeedReviewFlashcarQuantity.data.getDeskNeedReviewFlashcard?.total} need to review`}
            </div>
          )}
        </div>

        {/* <div className=" flex justify-start gap-3 items-end flex-1 text-sm font-extralight text-gray-600">
                <Avatar
                  isBordered
                  className="h-6 w-6"
                  src={item.avatarUrl}
                ></Avatar>
                <p>{item.author.name}</p>•<p>{dateCreated.to(dateNow)}</p>
              </div> */}
      </CardBody>
      <CardFooter className=" flex flex-col h-full justify-between items-end">
        <div>
          <Dropdown className=" rounded-sm">
            <DropdownTrigger>
              <Button isIconOnly radius="full" variant="light">
                <HiDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                className=" rounded-sm"
                onPress={() => {
                  navigate(routeProto.EDIT_DESK_PAGE(item.id));
                }}
                startContent={<MdOutlineModeEdit size={18} />}
                key="edit">
                Edit desk
              </DropdownItem>
              <DropdownItem
                className=" rounded-sm"
                color="warning"
                onPress={async () => {
                  onDelete?.(item);
                  await handleDeleteSync();
                }}
                variant="light"
                startContent={
                  // <Button
                  //   size="sm"
                  //   isIconOnly
                  //   className=" rounded-sm"
                  //   color="warning"
                  //   onPress={() => {
                  //     deleteDeskMutationtrigger(item.id);
                  //   }}
                  //   variant="bordered">
                  <IoTrashBin size={18} />
                  // </Button>
                }
                key="delete">
                Delete desk
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <span className=" flex justify-end items-center gap-4">
          <Button
            className=" rounded-sm bg-color-4 text-white text-md"
            variant="flat"
            size="sm"
            onPress={() => navigate(routeProto.REVIEW_DESK_FLASHCARD(item.id))}
            startContent={<MdPlayArrow size={20} />}>
            review
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
}
