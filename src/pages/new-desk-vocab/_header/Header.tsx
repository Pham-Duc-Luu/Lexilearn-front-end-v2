'use client';
import { useCreateFlashcardsMutation, useCreateNewDeskMutation } from '@/api';
import ImageEditorComponent from '@/components/ImageCard/Image.editor.component';
import DropImageModalButton from '@/components/ImageSeachModalButton';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  addReorderVocabCard,
  setNewDeskInformation,
} from '@/redux/store/newDesk.slice';
import { routeProto } from '@/redux/store/route.slice';
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps['scrollBehavior']>('inside');

  const navigate = useNavigate();
  const [CreateNewDeskMutationTrigger, CreateNewDeskMutationResult] =
    useCreateNewDeskMutation({});

  const [CreateFlashcardsMutationTrigger, CreateFlashcardsMutationResult] =
    useCreateFlashcardsMutation({});

  const { deskInformation, reoderCards, currentReoderCardIndex } =
    useAppSelector((state) => state.persistedReducer.NewDesk);

  const dispatch = useAppDispatch();
  // * open the title description drawer when open the create new desk page
  useEffect(() => {
    onOpen();
  }, []);

  // * catch the create new desk mutation result
  useEffect(() => {
    // * wait until the new desk is created
    if (
      CreateNewDeskMutationResult.isSuccess &&
      CreateNewDeskMutationResult.data.metadata?.deskId
    ) {
      dispatch(
        setNewDeskInformation({
          ...deskInformation,
          deskId: CreateNewDeskMutationResult.data.metadata?.deskId.toString(),
          deskName: CreateNewDeskMutationResult.data.metadata?.deskName,
        })
      );
      onClose();
    }
  }, [CreateNewDeskMutationResult]);

  useEffect(() => {
    if (CreateFlashcardsMutationResult.isSuccess) {
      navigate(routeProto.LIBRARY('all'));
    }
  }, [CreateFlashcardsMutationResult]);

  return (
    <>
      <div className="grid grid-cols-1 bg-color-4/25n">
        <Navbar maxWidth="full">
          <NavbarContent className=" flex-1 grid gap-4 grid-cols-3">
            <div className="col-span-1 flex items-center   gap-4  justify-start ">
              <Button isIconOnly variant="bordered" radius="sm" size="sm">
                <IoCaretBack size={22} />
              </Button>
              <span>Create new desk</span>
            </div>
            <div className="col-span-1  flex items-center   gap-4  justify-center">
              <Button
                variant="bordered"
                className="rounded-sm border-x-2 border-t-2 border-b-4 border-color-4 bg-color-4/20"
                onPress={onOpen}
                startContent={<FiEdit />}>
                Edit desk information
              </Button>
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
                        Give your desk a title
                      </ModalHeader>
                      <Divider></Divider>
                      <ModalBody
                        className="[&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className="editor-container">
                          <TitleEditor
                            onChange={(e) => {
                              dispatch(
                                setNewDeskInformation({
                                  ...deskInformation,
                                  deskName: e,
                                })
                              );
                            }}
                            value={deskInformation?.deskName}
                          />
                          <DescriptionEditor
                            onChange={(e) => {
                              dispatch(
                                setNewDeskInformation({
                                  ...deskInformation,
                                  deskDescription: e,
                                })
                              );
                            }}
                            value={deskInformation?.deskDescription}
                          />
                          {deskInformation?.deskThumbnail && (
                            <ImageEditorComponent
                              imageProps={{
                                className: ' w-full',
                                src: deskInformation?.deskThumbnail,
                              }}
                              deleteButtonProps={{
                                onPress(e) {
                                  dispatch(
                                    setNewDeskInformation({
                                      ...deskInformation,
                                      deskThumbnail: undefined,
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
                            <p>Add to your desk</p>
                            <div>
                              <DropImageModalButton
                                onSave={(url) => {
                                  dispatch(
                                    setNewDeskInformation({
                                      ...deskInformation,
                                      deskThumbnail: url,
                                    })
                                  );
                                }}></DropImageModalButton>
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
                          deskInformation.deskId ? (
                            <Button
                              isDisabled={CreateNewDeskMutationResult.isLoading}
                              onPress={() => {
                                onClose();
                              }}
                              className=" bg-color-4 text-medium w-full text-white "
                              radius="sm">
                              keep editing vocabulary
                            </Button>
                          ) : (
                            <Button
                              isDisabled={CreateNewDeskMutationResult.isLoading}
                              onPress={() => {
                                // * create a base desk's information when press "keep editing vocabulary"
                                toast.promise(
                                  CreateNewDeskMutationTrigger({
                                    deskName: deskInformation.deskName
                                      ? deskInformation?.deskName
                                      : 'Untitled',
                                    deskDescription:
                                      deskInformation.deskDescription!,
                                    deskIcon: deskInformation.deskIcon,
                                    deskIsPublic: deskInformation.deskIsPublic,
                                    deskThumbnail:
                                      deskInformation.deskThumbnail,
                                  }).unwrap(),
                                  {
                                    pending: 'Desk are initializing...',
                                    success: 'Desk initialized successfully',
                                    error: 'Failed to initialize desk',
                                  }
                                );
                              }}
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
                  dispatch(addReorderVocabCard());
                }}
                className=" bg-color-4/50 rounded-sm border-color-4 border-x-2 border-t-2 border-b-4">
                add card
              </Button>
              {/* // * display the button that expose the list of flashcards */}
              <ListFlashcardDrawer></ListFlashcardDrawer>
              <Button
                aria-description="this is for create a new desk with its flashcard"
                variant="bordered"
                color="warning"
                className=" rounded-sm"
                radius="sm"
                endContent={<MdOutlineQueuePlayNext size={22} />}
                onPress={() => {
                  if (deskInformation.deskId) {
                    toast.promise(
                      CreateFlashcardsMutationTrigger({
                        inputs: reoderCards
                          .filter((card) => {
                            return card?.word?.text && card?.mean?.text;
                          })
                          .map((card) => ({
                            desk_id: deskInformation.deskId!,
                            front_image: card.word?.image,
                            front_sound: card.word?.sound,
                            front_text: card.word?.text,
                            back_image: card.mean?.image,
                            back_sound: card.mean?.sound,
                            back_text: card.mean?.text,
                          })),
                      }),
                      {
                        pending: 'Flashcards are initializing...',
                        success: 'Flashcards initialized successfully',
                        error: 'Failed to initialize flashcards',
                      }
                    );
                  }
                }}
                size="md">
                Create
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
