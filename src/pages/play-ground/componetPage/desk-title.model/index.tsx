import { ImageSearchDialog } from '@/components/dialog/ImageSearch.dialog';
import ImageEditorComponent from '@/components/ImageCard/Image.editor.component';
import TipTapEditor from '@/components/Tiptap.editor';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setDeskInformation } from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button, Card, CardBody, Divider } from '@heroui/react';
import { Editor } from '@tiptap/react';
import { useClickAway } from '@uidotdev/usehooks';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';

const DeskTitleModel = () => {
  const { deskInformation, flashcards } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );
  const { t } = useTranslation('edit');
  const dispatch = useAppDispatch();
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const ref = useClickAway(() => {
    setIsOpenEmojiPicker(false);
  });

  const [editor, setEditor] = useState<Editor>(null);

  return (
    <Tabs defaultValue="preview" className=" w-full">
      <TabsList className="grid w-80 m-4 gap-4 grid-cols-2">
        <TabsTrigger value="preview">preview</TabsTrigger>
        <TabsTrigger value="code">code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className=" p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
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

                      const rest = otherLines
                        .filter((item) => item)
                        .map((item) => `<p>${item}</p>`)
                        .join('');

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
                        className: ' w-full',
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
                      onClick={() => setIsOpenEmojiPicker(!isOpenEmojiPicker)}>
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

                {/* <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      radius="full"
                      className="">
                      <Smile />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">
                      <EmojiPicker />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}

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
                        // isDisabled={CreateNewDeskMutationResult.isLoading}
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
      </TabsContent>
      <TabsContent value="code"></TabsContent>
    </Tabs>
  );
};

export default DeskTitleModel;
