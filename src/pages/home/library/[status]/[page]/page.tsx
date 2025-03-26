'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@heroui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { MdOutlineModeEdit, MdPlayArrow } from 'react-icons/md';

import { Desk, DeskSortField, SortOrder, useDeleteDeskMutation } from '@/api';
import { useGetUserDesksQuery } from '@/api/user service/graphql/user.graphql.api';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { routeProto, URLParameterType } from '@/redux/store/route.slice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { RxIdCard } from 'react-icons/rx';
import { TbVocabulary } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router';
import { getDeskQueryStatus } from '../layout';
dayjs.extend(relativeTime);

const LibraryCardItem = ({ item }: { item: Desk }) => {
  const [isDisplayThumbnail, setIsDisplayThumbnail] = useState(true);
  const [deleteDeskMutationtrigger, deleteDeskMutationResult] =
    useDeleteDeskMutation();

  const navigate = useNavigate();

  const { status, page } = useParams<URLParameterType>();

  const { deskLimit } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );

  const getUserDesks = useGetUserDesksQuery({
    limit: deskLimit,
    skip: (Number(page!) - 1) * deskLimit,
    filter: {
      status: getDeskQueryStatus(status),
    },
    sort: {
      field: DeskSortField.CreatedAt,
      order: SortOrder.Desc,
    },
  });

  useEffect(() => {
    if (deleteDeskMutationResult.isSuccess) getUserDesks.refetch();
  }, [deleteDeskMutationResult]);

  return (
    <Card
      onPress={(e) => navigate(routeProto.DESK(item.id))}
      isPressable
      className=" w-full rounded-sm flex flex-row justify-start items-center p-2 md:h-36">
      {isDisplayThumbnail && item?.thumbnail && (
        <Image
          className=" h-full aspect-square rounded-sm"
          removeWrapper
          onError={() => {
            setIsDisplayThumbnail(false);
            console.log('err');
          }}
          onLoad={() => {
            console.log('load');
          }}
          fallbackSrc
          src={item?.thumbnail}></Image>
      )}

      <CardBody className=" flex h-full gap-2 mx-2">
        <div className=" flex justify-start items-center gap-4">
          <h1 className=" truncate text-xl font-semibold">{item?.name}</h1>
          <Chip size="sm">flashcards</Chip>
        </div>
        <div className=" flex gap-8 ">
          <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
            <TbVocabulary></TbVocabulary>
            {`${0} vocabularies`}
          </div>
          <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
            <RxIdCard></RxIdCard>
            {`${item?.flashcardQuantity} flashcards`}
          </div>
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
                onPress={() => {
                  deleteDeskMutationtrigger(item.id);
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
        <div className=" flex justify-end items-center gap-4">
          <Button
            className=" rounded-sm bg-color-4 text-white text-md"
            variant="flat"
            size="sm"
            startContent={<MdPlayArrow size={20} />}>
            review
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ListBar = () => {
  const { libraryList } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );

  return (
    <>
      {libraryList?.map((item, index) => {
        if (!item) return;
        return <LibraryCardItem item={item} key={index} />;
      })}
    </>
  );
};

export default ListBar;
