// Import required hooks and UI components
import { useUploadImageMutation } from '@/api';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
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

// Main component for image search dialog
export function ImageSearchDialog(props: {
  Button?: typeof Button;
  onSave?: (localUrl: string) => void;
  modalProps?: Partial<ModalProps>;
  tabProps?: Partial<TabsProps>;
  tab?: ReactNode;
  onImageFileChange?: (e: File) => void;
  searchImageParams?: Parameters<
    typeof SearchImageComponentTabs
  >[0]['searchParams'];
  onImageFileSave?: (e: File) => void;
}) {
  const [imageFile, setImageFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [tabKey, settabkey] = useState('upload');

  // Upload API mutation hook
  const [UploadImageMutationTrigger, UploadImageMutationResult] =
    useUploadImageMutation();

  /**
   * Upload image to the server via API
   * Called when user confirms image upload
   */
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

  /**
   * Inform parent when image file changes (e.g. drag-and-drop)
   */
  useEffect(() => {
    if (props.onImageFileChange && imageFile)
      props.onImageFileChange(imageFile);
  }, [imageFile]);

  /**
   * Handle successful upload result: pass image URL to parent and close modal
   */
  useEffect(() => {
    if (
      UploadImageMutationResult.isSuccess &&
      UploadImageMutationResult.data.url
    ) {
      props?.onSave?.(UploadImageMutationResult.data.url);
      setIsOpen(false);
    }
  }, [UploadImageMutationResult, props]);

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      {/* Dialog open trigger */}
      {props.Button ? (
        <props.Button
          onPress={() => setIsOpen(true)}
          isIconOnly
          size="sm"
          className="rounded-md"
        />
      ) : (
        <Button
          onPress={() => setIsOpen(true)}
          isIconOnly
          size="sm"
          className="rounded-md">
          <MdOutlineImage size={18} />
        </Button>
      )}

      {/* Modal content */}
      <DialogContent className="lg:h-[800px] lg:w-[1200px] max-w-full flex justify-center items-center flex-col">
        {/* Modal header */}
        <DialogHeader className="flex w-full justify-start items-center gap-4 flex-row">
          <div className="p-3 rounded-full bg-color-4/20">
            <MdOutlineImage size={26} />
          </div>
          <DialogTitle>Drop your image here</DialogTitle>
        </DialogHeader>

        {/* Tabs for upload or search */}
        <Tabs
          defaultValue={tabKey}
          onValueChange={(e) => settabkey(e)}
          aria-label="Options"
          className="flex-1 w-full h-full flex flex-col justify-center items-center">
          <TabsList className="grid w-full grid-cols-2">
            {/* Upload Tab */}
            <TabsTrigger value="upload">
              <div className="flex justify-center gap-1 items-center">
                <AiOutlineUpload size={20} />
                <span>upload</span>
              </div>
            </TabsTrigger>

            {/* Search Tab */}
            <TabsTrigger value="search">
              <div className="flex justify-center gap-1 items-center">
                <AiOutlineSearch size={20} />
                <span>search</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Upload tab content */}
          {tabKey === 'upload' && (
            <TabsContent value="upload" className="flex-1 w-full flex">
              <CropImageComponentTabs
                className="w-full h-full flex flex-col gap-4"
                onFileChange={(e) => {
                  setImageFile(e);
                }}
                isLoading={UploadImageMutationResult.isLoading}
                onImageFileSave={handleImageFileSave}
              />
            </TabsContent>
          )}

          {/* Search tab content */}
          {tabKey === 'search' && (
            <TabsContent value="search" className="flex-1 w-full flex">
              <SearchImageComponentTabs
                searchParams={props.searchImageParams}
                className="h-full flex flex-col justify-center items-center w-full"
                onSelect={(url) => {
                  if (props.onSave) props.onSave(url);
                  setIsOpen(false);
                }}
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
