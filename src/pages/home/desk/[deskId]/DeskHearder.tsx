import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IDeskInformation } from '@/redux/store/Desk.proto.slice';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@heroui/react';
import { useState } from 'react';
import { BsSave2 } from 'react-icons/bs';
import { CiLink } from 'react-icons/ci';
import { GoLinkExternal } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineModeEdit, MdPlayArrow } from 'react-icons/md';
import { Link } from 'react-router';
const DeskHearder = ({ deskInfo }: { deskInfo: IDeskInformation }) => {
  const [isOpenShareDropdownButton, setIsOpenShareDropdownButton] =
    useState(false);
  return (
    <div className=" p-4 ">
      <Card className="  rounded-sm lg:mx-28 ">
        <div className="flex justify-center gap-4  m-6 items-center flex-row">
          <Image
            src={deskInfo.thumbnail}
            removeWrapper
            className=" h-32 rounded-sm aspect-square"
          />
          <CardBody className=" flex-1 gap-4 h-full flex flex-col justify-center items-start">
            <div className=" flex-1 flex justify-start items-start flex-col gap-4">
              <div className=" text-lg font-bold">{deskInfo.name}</div>
              <span>{deskInfo.description}</span>
              <Link
                to={'/home'}
                className=" flex justify-center items-center gap-2">
                <Avatar
                  className="w-5 h-5"
                  isBordered
                  src={deskInfo.author?.avatarUrl}
                />
                <div>{deskInfo.author?.name}</div>
              </Link>
            </div>
          </CardBody>
        </div>
        <CardFooter className=" flex w-full items-center justify-between">
          <div className=" flex gap-4">
            <Button
              className=" rounded-sm"
              variant="bordered"
              startContent={<MdOutlineModeEdit />}>
              Edit
            </Button>
            <Button
              className=" rounded-sm"
              variant="bordered"
              startContent={<BsSave2 />}>
              Save
            </Button>

            <DropdownMenu
              onOpenChange={(open) => setIsOpenShareDropdownButton(open)}
              open={isOpenShareDropdownButton}>
              <DropdownMenuTrigger asChild>
                <Button
                  as={'button'}
                  className=" rounded-sm"
                  variant="bordered"
                  endContent={<IoIosArrowDown />}
                  onPress={() =>
                    setIsOpenShareDropdownButton(!isOpenShareDropdownButton)
                  }
                  startContent={<GoLinkExternal />}>
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <CiLink /> Copy link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button
              className=" rounded-sm bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4"
              startContent={<MdPlayArrow />}>
              Start reivew
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeskHearder;
