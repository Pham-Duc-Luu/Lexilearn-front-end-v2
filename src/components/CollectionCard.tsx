import { useRouter } from '@/i18n/routing';
import { useAppDispatch } from '@/redux/store/hooks';
import { useDeleteCollectionMutation } from '@/store/RTK-query/collectionApi';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@heroui/react';
import { Tooltip } from '@heroui/tooltip';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline, MdOutlineNavigateNext } from 'react-icons/md';

export interface ICollectionCard {
  avatar: string;
  title: string;
  _id: string | number;
  description: string;
  className?: string;
}

export interface CollectionCardProps
  extends CardProps,
    Partial<ICollectionCard> {
  onDelete?: () => void;
}

export default function CollectionCard({
  avatar,
  title,
  description,
  onDelete = () => {},
  _id,
  ...props
}: CollectionCardProps) {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter();
  const t_utils = useTranslations('utils');
  const [deleteCollectionTrigger, data] = useDeleteCollectionMutation();

  useEffect(() => {
    if (data.isSuccess) {
      onDelete();
    }
  }, [data]);

  return (
    <>
      <Card className="group/collectionCard cursor-pointer" {...props}>
        <CardBody
          onClick={() => {
            // dispatch(
            //   setCollection({ id: _id, name: title, description: description })
            // );
            navigate(`/collection/${_id}`);
          }}
          className="  p-4  w-full  flex items-center  flex-row gap-4">
          <div>
            <Avatar
              isBordered
              color="default"
              radius="full"
              fallback={<FaUser size={40} />}
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </div>
          <CardBody>
            <h4 className="font-bold text-large">{title}</h4>
            <small className="text-default-500 truncate">{description}</small>
          </CardBody>
          <div className="flex gap-4 group-hover/collectionCard:visible invisible">
            {/* <Tooltip content={t_utils("add")} color="secondary" size="lg">
              <Button isIconOnly variant="light">
                <IoIosAddCircleOutline size={24} />
              </Button>
            </Tooltip> */}
            <Tooltip content={t_utils('edit')} color="secondary" size="lg">
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  navigate(`/edit/collection/${_id}`);
                }}>
                <IoShareOutline size={24} />
              </Button>
            </Tooltip>
            <Tooltip content={t_utils('delete')} color="danger" size="lg">
              <Button
                isIconOnly
                variant="light"
                color="danger"
                onClick={onOpen}>
                <MdOutlineDeleteOutline size={24} />
              </Button>
            </Tooltip>
          </div>
          <Button
            isIconOnly
            variant="light"
            onClick={() => {
              navigate(`/collection/${_id}`);
            }}>
            <MdOutlineNavigateNext size={24} />
          </Button>
        </CardBody>

        {/* </Button> */}
        {/* <Divider className="my-4" /> */}

        <CardFooter className="h-1 m-0 p-0 bg-[hsl(var(--primary))] group-hover/collectionCard:visible invisible"></CardFooter>
      </Card>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        className={data.isLoading ? ' cursor-progress' : ''}
        onOpenChange={onOpenChange}
        isDismissable={!data.isLoading}
        isKeyboardDismissDisabled={!data.isLoading}>
        <ModalContent className={data.isLoading ? ' cursor-progress' : ''}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Confirmation
              </ModalHeader>
              <ModalBody>
                <>
                  Are you sure to delete collection :{' '}
                  <p className=" font-bold">{title}</p>
                </>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} color="primary">
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    deleteCollectionTrigger({ id: _id });
                  }}>
                  {data.isLoading ? <Spinner></Spinner> : 'Delete'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
