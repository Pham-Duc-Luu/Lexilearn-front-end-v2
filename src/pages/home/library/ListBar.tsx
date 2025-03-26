'use client';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  Avatar,
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
  Input,
} from '@heroui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsCollection } from 'react-icons/bs';
import { CiFilter } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { IoTrashBin, IoTrashBinOutline } from 'react-icons/io5';
import { MdPlayArrow, MdSearch } from 'react-icons/md';
import { RxIdCard } from 'react-icons/rx';
import { TbMenuOrder, TbVocabulary } from 'react-icons/tb';
dayjs.extend(relativeTime);
const ListBar = () => {
  const { libraryList } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );

  return (
    <div className=" col-span-9 p-4 h-full overflow-y-scroll">
      <Input
        startContent={<MdSearch />}
        placeholder="find in your library"
        className=" rounded-sm"
        variant="bordered"
        radius="sm"
      />
      <div className=" flex justify-between items-center py-4">
        <div>
          <Button
            startContent={<BsCollection />}
            variant="flat"
            className=" rounded-t-sm rounded-b-none border-b-2 border-color-4 bg-color-4/20 text-color-4 font-semibold ">
            Desk(1)
          </Button>
          <Button
            variant="light"
            className="rounded-sm  text-color-4 font-semibold "
            startContent={<IoTrashBinOutline />}>
            Bin(1)
          </Button>
        </div>
        <div className=" flex justify-center items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<CiFilter />}>
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<TbMenuOrder />}>
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center gap-4">
        {libraryList?.map((item, index) => {
          if (!item) return <></>;

          const dateCreated = dayjs(item.createdAt);
          const dateNow = dayjs();

          return (
            <Card
              key={index}
              isPressable
              className=" w-full rounded-sm flex flex-row justify-start items-center p-2 md:h-36">
              <Image
                className=" h-full aspect-square  rounded-sm"
                removeWrapper
                src={item.thumbnail}></Image>
              <CardBody className=" flex h-full gap-2 mx-2">
                <div className=" flex justify-start items-center gap-4">
                  <h1 className=" truncate text-xl font-semibold">
                    {item?.name}
                  </h1>
                  <Chip size="sm">flashcards</Chip>
                </div>
                <div className=" flex gap-8 ">
                  <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
                    <TbVocabulary></TbVocabulary>
                    {`${0} vocabularies`}
                  </div>
                  <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
                    <RxIdCard></RxIdCard>
                    {`${item.flashcardQuantity} flashcards`}
                  </div>
                </div>

                <div className=" flex justify-start gap-3 items-end flex-1 text-sm font-extralight text-gray-600">
                  <Avatar
                    isBordered
                    className="h-6 w-6"
                    src={item?.owner?.avatar!}></Avatar>
                  <p>{item?.owner?.name}</p>•<p>{dateCreated.to(dateNow)}</p>
                </div>
              </CardBody>
              <CardFooter className=" flex flex-col h-full justify-between items-end">
                <div>
                  <Button isIconOnly radius="full" variant="light">
                    <HiDotsVertical />
                  </Button>
                </div>
                <div className=" flex justify-end items-center gap-4">
                  <Button
                    size="sm"
                    isIconOnly
                    className=" rounded-sm"
                    variant="flat">
                    <IoTrashBin size={18} />
                  </Button>
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
        })}
      </div>
      {/* <div className=" w-full  flex justify-center p-4">
        <Pagination
          onChange={(e) => {
            route(routeProto.LIBRARY("all", e));
          }}
          showControls
          className="gap-2 "
          initialPage={1}
          classNames={{
            cursor: " bg-color-4",
            wrapper: "bg-color-4/20",
          }}
          isCompact
          total={10}
          variant="light"
        />
      </div> */}
    </div>
  );
};

export default ListBar;
