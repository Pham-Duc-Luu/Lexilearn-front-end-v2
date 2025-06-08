import ImageEditorComponent from '@/components/ImageCard/Image.editor.component';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  initNewFlashcard,
  setCurrFlashcardPositionId,
  setDeskInformation,
} from '@/redux/store/editDesk.slice';

import { useUpdateDeskInformationMutation } from '@/api';
import { ImageSearchDialog } from '@/components/dialog/ImageSearch.dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Navbar,
  NavbarContent,
  useDisclosure,
} from '@heroui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoAdd, IoCaretBack } from 'react-icons/io5';
import { MdOutlineQueuePlayNext } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import DescriptionEditor from './DescriptionEditor';
import './Header.css';
import ListFlashcardDrawer from './ListFlashcardDrawer';
import TitleEditor from './TitleEditor';
const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation('edit');
  const [scrollBehavior] =
    React.useState<ModalProps['scrollBehavior']>('inside');

  const [
    UpdateDeskInformationMutationTrigger,
    UpdateDeskInformationMutationResult,
  ] = useUpdateDeskInformationMutation();

  // const navigate = useNavigate();

  const { deskInformation, flashcards } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  // * open the title description drawer when open the create new desk page
  useEffect(() => {
    onOpen();
  }, []);

  // * catch the create new desk mutation result

  const handleUpsertFlashcard = () => {
    /**
     * * check if are there any flashcard that not fullfill
     *
     */

    for (let index = 0; index < flashcards.length; index++) {
      const flashcard = flashcards[index];
      if (
        !flashcard.front_text ||
        flashcard.front_text.length === 0 ||
        !flashcard.back_text ||
        flashcard.back_text.length === 0
      ) {
        toast.warn("You haven't finish your card!!");
        dispatch(setCurrFlashcardPositionId(flashcard.orderId));
        return;
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 bg-color-4/25n">
        <Navbar maxWidth="full">
          <NavbarContent className=" flex-1 grid gap-4 grid-cols-3">
            <div className="col-span-1 flex items-center   gap-4  justify-start ">
              <Button
                isIconOnly
                variant="bordered"
                radius="sm"
                size="sm"
                onPress={() => navigate(-1)}>
                <IoCaretBack size={22} />
              </Button>
            </div>
            <div className="col-span-1  flex items-center   gap-4  justify-center">
              <Button
                variant="bordered"
                className="rounded-sm border-x-2 border-t-2 border-b-4 border-color-4 bg-color-4/20"
                onPress={onOpen}
                startContent={<FiEdit />}>
                {t('header.edit desk information.Tilte')}
              </Button>
              {/* Open the desk's information box */}
              <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="sm"
                hideCloseButton={true}
                isDismissable={false}
                scrollBehavior={scrollBehavior}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                        {t('header.Give your desk a title.Title')}
                      </ModalHeader>
                      <Divider></Divider>
                      <Select defaultValue="0">
                        <SelectTrigger className="w-[140px] m-3">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">
                            <div className="flex justify-center items-center gap-2">
                              <FaLock />
                              <p>{t('header.publish.public')}</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="0">
                            <div className="flex justify-center items-center gap-2">
                              <FaGlobeAfrica />
                              <p> {t('header.publish.private')}</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <ModalBody
                        className="[&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className="editor-container">
                          <TitleEditor
                            onChange={(e) => {
                              if (deskInformation)
                                dispatch(
                                  setDeskInformation({
                                    ...deskInformation,
                                    name: e,
                                  })
                                );
                            }}
                            value={deskInformation?.name?.toString()}
                          />

                          <DescriptionEditor
                            onChange={(e) => {
                              if (deskInformation) {
                                dispatch(
                                  setDeskInformation({
                                    ...deskInformation,
                                    description: e,
                                  })
                                );
                              }
                            }}
                            value={deskInformation?.description?.toString()}
                          />
                          {deskInformation?.thumbnail && (
                            <ImageEditorComponent
                              imageProps={{
                                className: ' w-full',
                                src: deskInformation?.thumbnail,
                              }}
                              deleteButtonProps={{
                                onPress() {
                                  dispatch(
                                    setDeskInformation({
                                      ...deskInformation,
                                      thumbnail: undefined,
                                    })
                                  );
                                },
                              }}></ImageEditorComponent>
                          )}

                          {/* <ImageEditor></ImageEditor> */}
                        </div>

                        <Card
                          radius="sm"
                          className=" shadow-md border-default border-1 mt-6  ">
                          <CardBody className=" flex justify-between items-center flex-row ">
                            <p>{t('header.Add to your desk.Title')}</p>
                            <div>
                              <ImageSearchDialog
                                onSave={(url) => {
                                  if (deskInformation && url) {
                                    dispatch(
                                      setDeskInformation({
                                        ...deskInformation,
                                        thumbnail: url,
                                      })
                                    );
                                  }
                                }}></ImageSearchDialog>
                              {/* <Button isIconOnly radius="full" variant="light">
                              <MdOutlineImage size={20} />
                            </Button> */}
                            </div>
                          </CardBody>
                        </Card>
                      </ModalBody>

                      <ModalFooter>
                        {
                          // * when first rendering, desk's id is not exist, so display a button to create a new desk
                          deskInformation?.id ? (
                            <Button
                              // isDisabled={CreateNewDeskMutationResult.isLoading}
                              onPress={() => {
                                onClose();
                              }}
                              className=" bg-color-4 text-medium w-full text-white "
                              radius="sm">
                              {t('header.Keep editing.Title')}
                            </Button>
                          ) : (
                            <Button
                              // isDisabled={CreateNewDeskMutationResult.isLoading}
                              onPress={() => {}}
                              className=" bg-color-4 tex`t-medium w-full text-white "
                              radius="sm">
                              Create your desk
                            </Button>
                          )
                        }
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <div className=" col-span-1 flex items-center justify-end gap-4">
              {/* // * display create new desk button */}
              <Button
                startContent={<IoAdd />}
                variant="bordered"
                onPress={() => {
                  dispatch(initNewFlashcard());
                }}
                className=" bg-color-4/50 rounded-sm border-color-4 border-x-2 border-t-2 border-b-4">
                add card
              </Button>
              {/* // * display the button that expose the list of flashcards */}
              <ListFlashcardDrawer></ListFlashcardDrawer>
              {/* When create or edit, make sure that card is fullfill with both front and back text */}
              <Button
                aria-description="this is for create a new desk with its flashcard"
                variant="solid"
                color="success"
                className=" rounded-sm"
                radius="sm"
                endContent={<MdOutlineQueuePlayNext size={22} />}
                onPress={() => {
                  handleUpsertFlashcard();
                }}
                size="md">
                finish
              </Button>
            </div>
          </NavbarContent>
        </Navbar>
        <Divider></Divider>
      </div>
    </>
  );
};

export default Header;
