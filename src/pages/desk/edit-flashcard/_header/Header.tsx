import ImageEditorComponent from '@/components/ImageCard/Image.editor.component';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  initNewFlashcard,
  setCurrFlashcardPositionId,
  setDeskInformation,
} from '@/redux/store/editDesk.slice';

import { useUpdateDeskInformationMutation } from '@/api';
import TipTapEditor from '@/components/Tiptap.editor';
import { ImageSearchDialog } from '@/components/dialog/ImageSearch.dialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Navbar,
  NavbarContent,
} from '@heroui/react';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoAdd, IoCaretBack } from 'react-icons/io5';
import { MdOutlineQueuePlayNext } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import './Header.css';
import ListFlashcardDrawer from './ListFlashcardDrawer';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Editor } from '@tiptap/react';
import { useClickAway } from '@uidotdev/usehooks';

const Header = () => {
  const { t } = useTranslation('edit');

  const [
    UpdateDeskInformationMutationTrigger,
    UpdateDeskInformationMutationResult,
  ] = useUpdateDeskInformationMutation();

  // const navigate = useNavigate();
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);

  const { deskInformation, flashcards } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
        dispatch(setCurrFlashcardPositionId(flashcard.id));
        return;
      }
    }
  };
  const [editor, setEditor] = useState<Editor>(null);
  const ref = useClickAway(() => {
    setIsOpenEmojiPicker(false);
  });

  const [openTitleModel, setOpenTitleModel] = useState(true);

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
              {/* Open the desk's information box */}
              <Dialog
                defaultOpen
                onOpenChange={setOpenTitleModel}
                open={openTitleModel}>
                <DialogTrigger asChild>
                  <Button
                    variant="bordered"
                    className="rounded-sm border-x-2 border-t-2 border-b-4 border-color-4 bg-color-4/20"
                    // onPress={onOpen}
                    startContent={<FiEdit />}>
                    {t('header.edit desk information.Tilte')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {
                    <>
                      <DialogHeader className="flex flex-col gap-1 justify-center items-center">
                        {t('header.Give your desk a title.Title')}
                      </DialogHeader>
                      <Divider></Divider>
                      <Select
                        onValueChange={(value) => {
                          if (deskInformation) {
                            dispatch(
                              setDeskInformation({
                                ...deskInformation,
                                isPublic: value === 'public',
                              })
                            );
                          }
                        }}
                        defaultValue={
                          deskInformation?.isPublic ? 'public' : 'private'
                        }>
                        <SelectTrigger className="w-[140px] m-3">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex justify-center items-center gap-2">
                              <FaLock />
                              <p>{t('header.publish.public')}</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex justify-center items-center gap-2">
                              <FaGlobeAfrica />
                              <p> {t('header.publish.private')}</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="editor-container mb-4  lg:min-h-52">
                        <TipTapEditor
                          className="m-2"
                          placeholder={t('header.Give your desk a title.Title')}
                          onChange={(e) => {
                            const [firstLine, ...otherLines] = e
                              .getText()
                              .split('\n');
                            console.log(otherLines);

                            const rest = otherLines
                              .filter((item) => item)
                              .map((item) => `<p>${item}</p>`)
                              .join('');
                            console.log(rest);

                            if (deskInformation)
                              dispatch(
                                setDeskInformation({
                                  ...deskInformation,
                                  name: firstLine,
                                  description: rest,
                                })
                              );
                          }}
                          setEditor={setEditor}
                          value={`<h1>${deskInformation?.name}</h1>${deskInformation?.description}`}
                        />

                        {deskInformation?.thumbnail && (
                          <ImageEditorComponent
                            imageProps={{
                              removeWrapper: true,
                              className: ' w-full max-h-52 object-cover',
                              src: deskInformation?.thumbnail,
                            }}
                            deleteButtonProps={{
                              onPress() {
                                dispatch(
                                  setDeskInformation({
                                    ...deskInformation,
                                    thumbnail: '',
                                  })
                                );
                              },
                            }}></ImageEditorComponent>
                        )}
                      </div>

                      <div className=" flex justify-end items-center">
                        <DropdownMenu open={isOpenEmojiPicker}>
                          <DropdownMenuTrigger
                            className=" cursor-pointer"
                            asChild
                            onClick={() =>
                              setIsOpenEmojiPicker(!isOpenEmojiPicker)
                            }>
                            <Smile />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className=" p-0 border-0">
                            <DropdownMenuItem className=" p-0 gap-0" ref={ref}>
                              <Picker
                                data={data}
                                locale="vi"
                                theme="light"
                                onEmojiSelect={(e) => {
                                  editor
                                    ?.chain()
                                    .focus()
                                    .insertContent(e.native)
                                    .run();
                                }}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

                      <DialogFooter>
                        {
                          // * when first rendering, desk's id is not exist, so display a button to create a new desk
                          deskInformation?.id ? (
                            <Button
                              isLoading={
                                UpdateDeskInformationMutationResult.isLoading
                              }
                              onPress={() => {
                                UpdateDeskInformationMutationTrigger({
                                  deskId: Number(deskInformation.id),
                                  data: {
                                    desk_name: deskInformation.name,
                                    desk_description:
                                      deskInformation.description,
                                    desk_thumbnail: deskInformation.thumbnail,
                                    desk_icon: deskInformation.icon,
                                    desk_is_public: deskInformation.isPublic,
                                  },
                                }).unwrap();
                              }}
                              className=" bg-color-4 text-medium w-full text-white "
                              radius="sm">
                              {t('header.Keep editing.Title')}
                            </Button>
                          ) : (
                            <Button
                              // isDisabled={CreateNewDeskMutationResult.isLoading}
                              className=" bg-color-4 tex`t-medium w-full text-white "
                              radius="sm">
                              Create your desk
                            </Button>
                          )
                        }
                      </DialogFooter>
                    </>
                  }
                </DialogContent>
              </Dialog>
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
                {t('header.flashcard list.add card')}
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
