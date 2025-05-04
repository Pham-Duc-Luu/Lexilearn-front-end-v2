'use client';
import { useCreateNewDeskMutation } from '@/api';
import ImageEditorComponent from '@/components/ImageCard/Image.editor.component';
import { cn } from '@/lib/utils';
import { IDeskInformation } from '@/redux/store/newDesk.slice';
import { routeProto } from '@/redux/store/route.slice';
import {
  Button,
  Card,
  CardBody,
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ImageSearchDialog } from '../dialog/ImageSearch.dialog';
import DescriptionEditor from './DescriptionEditor';
import './Header.css';
import TitleEditor from './TitleEditor';

export interface NewDeskFormProps {
  className?: string;
  onClose?: () => void;
  setCreateOption?: (e: string | undefined) => void;
}

const NewDeskForm = ({
  onClose,
  setCreateOption,
  className,
}: NewDeskFormProps) => {
  const [CreateNewDeskMutationTrigger, CreateNewDeskMutationResult] =
    useCreateNewDeskMutation({});

  const [deskInformation, setNewDeskInformation] = useState<IDeskInformation>();

  const navigate = useNavigate();

  // * catch the create new desk mutation result
  useEffect(() => {
    if (
      CreateNewDeskMutationResult.isSuccess &&
      CreateNewDeskMutationResult.data.metadata?.desk_id
    ) {
      navigate(
        routeProto.EDIT_DESK_PAGE(
          CreateNewDeskMutationResult.data.metadata?.desk_id.toString()
        )
      );
      onClose?.();
    }
  }, [CreateNewDeskMutationResult]);

  return (
    <>
      <div className={cn(' flex flex-col justify-center', className)}>
        <ModalHeader className="flex gap-1 items-center">
          <Button
            isIconOnly
            variant="light"
            className=" rounded-sm"
            onPress={() => setCreateOption?.(undefined)}>
            <IoCaretBack size={20} />
          </Button>
          <p>Give your desk a title</p>
        </ModalHeader>
        <Divider></Divider>
        <ModalBody
          className={cn(
            '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ',
            'flex flex-col justify-between'
          )}>
          <div className="editor-container space-y-6">
            <TitleEditor
              onChange={(e) => {
                setNewDeskInformation({
                  ...deskInformation,
                  deskName: e,
                });
              }}
              value={deskInformation?.deskName}
            />
            <DescriptionEditor
              onChange={(e) => {
                setNewDeskInformation({
                  ...deskInformation,
                  deskDescription: e,
                });
              }}
              value={deskInformation?.deskDescription}
            />
            {deskInformation?.deskThumbnail && (
              <ImageEditorComponent
                imageProps={{
                  className: 'max-h-[300px] ',

                  src: deskInformation?.deskThumbnail,
                }}
                wrapperProps={{
                  className: ' w-fit content-center ',
                }}
                deleteButtonProps={{
                  onPress() {
                    setNewDeskInformation({
                      ...deskInformation,
                      deskThumbnail: undefined,
                    });
                  },
                }}></ImageEditorComponent>
            )}

            {/* <ImageEditor></ImageEditor> */}
          </div>

          <Card
            radius="sm"
            className=" shadow-md border-default border-1 mt-6  ">
            <CardBody className=" flex justify-between items-center flex-row ">
              <p>Add to your desk</p>
              <div>
                <ImageSearchDialog
                  onSave={(url) => {
                    setNewDeskInformation({
                      ...deskInformation,
                      deskThumbnail: url,
                    });
                  }}></ImageSearchDialog>
                {/* <Button isIconOnly radius="full" variant="light">
                              <MdOutlineImage size={20} />
                            </Button> */}
              </div>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={CreateNewDeskMutationResult.isLoading}
            isDisabled={CreateNewDeskMutationResult.isLoading}
            onPress={() => {
              // * create a base desk's information when press "keep editing vocabulary"
              toast.promise(
                CreateNewDeskMutationTrigger({
                  deskName: deskInformation?.deskName
                    ? deskInformation?.deskName
                    : 'Untitled',
                  deskDescription: deskInformation?.deskDescription,
                  deskIcon: deskInformation?.deskIcon,
                  deskIsPublic: deskInformation?.deskIsPublic,
                  deskThumbnail: deskInformation?.deskThumbnail,
                }).unwrap(),
                {
                  pending: 'Desk are initializing...',
                  success: 'Desk initialized successfully',
                  error: 'Failed to initialize desk',
                }
              );
            }}
            className=" bg-color-4 tex`t-medium rounded-sm text-white ">
            Create your desk
          </Button>
          <Button
            color="warning"
            variant="bordered"
            className=" rounded-md"
            onPress={onClose}>
            cancel
          </Button>
        </ModalFooter>
      </div>
    </>
  );
};

export default NewDeskForm;
