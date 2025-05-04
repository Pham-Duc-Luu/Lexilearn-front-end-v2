import { useUploadImageMutation } from '@/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button, ModalProps, TabsProps } from '@heroui/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import FormData from 'form-data';
import { ReactNode, useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai';
import { MdOutlineImage } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import {
  CropImageComponentTabs,
  SearchImageComponentTabs,
} from './ImageSeachModalButton';

export function ImageSearchDialog(props: {
  Button?: typeof Button;
  onSave?: (localUrl: string) => void;
  modalProps?: Partial<ModalProps>;
  tabProps?: Partial<TabsProps>;
  tab?: ReactNode;
  onImageFileChange?: (e: File) => void;
  onImageFileSave?: (e: File) => void;
}) {
  const [imageFile, setImageFile] = useState<File>();
  // * use the upload api to upload image
  const [UploadImageMutationTrigger, UploadImageMutationResult] =
    useUploadImageMutation();

  const [isOpen, setIsOpen] = useState(false);

  // * handle image file save when upload using api
  const handleImageFileSave = (e: File) => {
    const formData = new FormData();
    formData.append('image', e);
    toast.promise(
      UploadImageMutationTrigger({
        image_size: 'FHD',
        body: formData,
      }).unwrap(),
      {
        pending: 'Uploading image...',
        // * notify when image file can not upload to cloud
        error: {
          render: "Oops, cann't upload the image",
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      }
    );
  };

  // * handle image file change when drag and drop
  useEffect(() => {
    if (props.onImageFileChange && imageFile)
      props.onImageFileChange(imageFile);
  }, [imageFile]);

  useEffect(() => {
    // * handle save the url of image
    if (
      UploadImageMutationResult.isSuccess &&
      UploadImageMutationResult.data.public_url &&
      props?.onSave
    ) {
      props?.onSave(UploadImageMutationResult.data.public_url);
      setIsOpen(false);
    }
  }, [UploadImageMutationResult]);

  const [tabKey, settabkey] = useState('upload');

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
        <DialogTrigger>
          {props.Button ? (
            <props.Button
              onPress={() => setIsOpen(true)}
              isIconOnly
              size="sm"
              className=" rounded-md"></props.Button>
          ) : (
            <Button
              onPress={() => setIsOpen(true)}
              isIconOnly
              size="sm"
              className=" rounded-md">
              <MdOutlineImage size={18} />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className=" lg:h-[800px] lg:w-[1200px] max-w-full flex justify-center items-center flex-col">
          <DialogHeader className="flex w-full justify-start items-center gap-4 flex-row">
            <div className=" p-3 rounded-full bg-color-4/20">
              <MdOutlineImage size={26} />
            </div>
            <DialogTitle>Drop your image here</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue={tabKey}
            onValueChange={(e) => settabkey(e)}
            aria-label="Options"
            className=" flex-1 w-full h-full flex flex-col justify-center items-center"
            //   variant="underlined"
            //   classNames={{
            //     tabList:
            //       'gap-6 w-full h-full relative rounded-none  p-0 group-data-[selected=true]:border-color-4 border-b border-divider',
            //     cursor: 'w-full bg-color-4',
            //     tab: 'max-w-fit px-0 h-12',
            //     tabContent: 'group-data-[selected=true]:text-color-4',
            //   }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <div className=" flex justify-center gap-1 items-center">
                  <AiOutlineUpload size={20} />
                  <span>upload</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="search">
                <div className=" flex justify-center gap-1 items-center">
                  <AiOutlineSearch size={20} />
                  <span>search</span>
                </div>
              </TabsTrigger>
            </TabsList>
            {tabKey === 'upload' && (
              <TabsContent value="upload" className=" flex-1  w-full flex ">
                <CropImageComponentTabs
                  className=" w-full h-full flex flex-col gap-4"
                  onFileChange={(e) => {
                    setImageFile(e);
                  }}
                  isLoading={UploadImageMutationResult.isLoading}
                  onImageFileSave={
                    handleImageFileSave
                  }></CropImageComponentTabs>
              </TabsContent>
            )}
            {tabKey === 'search' && (
              <TabsContent value="search" className=" flex-1  w-full flex ">
                <SearchImageComponentTabs
                  className="h-full flex flex-col justify-center items-center w-full"
                  onSelect={(url) => {
                    if (props.onSave) props.onSave(url);
                    setIsOpen(false);
                  }}></SearchImageComponentTabs>
              </TabsContent>
            )}
          </Tabs>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
