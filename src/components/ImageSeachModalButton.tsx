'use client';
import React, {
  type DragEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useUploadImageMutation } from '@/api/image service/user-image.api';
import { useSearchPhotosMutation } from '@/api/search/search.photo.api';
import { arrangeColumns } from '@/utils/masonry.layout';
import {
  Button,
  CircularProgress,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Progress,
  Tab,
  Tabs,
  TabsProps,
  useDisclosure,
} from '@heroui/react';
import { useDebounce } from '@uidotdev/usehooks';
import FormData from 'form-data';
import { AnimatePresence, motion } from 'framer-motion';
import { File, Upload } from 'lucide-react';
import Cropper, { Area } from 'react-easy-crop';
import {
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BiDownload } from 'react-icons/bi';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { MdOutlineImage } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import { LayoutGrid } from './aceternity/layout-grid';
import ImageHoverCard from './ImageCard/ImageHoverCard';
interface FileWithPreview extends File {
  preview: string;
}

const DropImageModalButton = (props: {
  Button?: typeof Button;
  onSave?: (localUrl: string) => void;
  modalProps?: Partial<ModalProps>;
  tabProps?: Partial<TabsProps>;
  tab?: ReactNode;
  onImageFileChange?: (e: File) => void;
  onImageFileSave?: (e: File) => void;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState<File>();

  // * use the upload api to upload image
  const [UploadImageMutationTrigger, UploadImageMutationResult] =
    useUploadImageMutation();

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
      UploadImageMutationResult.data.photo_image_url &&
      props?.onSave
    ) {
      props?.onSave(UploadImageMutationResult.data.photo_image_url);
      onOpenChange();
    }
  }, [UploadImageMutationResult]);

  return (
    <>
      {props.Button ? (
        <props.Button
          onPress={onOpen}
          isIconOnly
          size="sm"
          className=" rounded-md"></props.Button>
      ) : (
        <Button onPress={onOpen} isIconOnly size="sm" className=" rounded-md">
          <MdOutlineImage size={18} />
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        radius="sm"
        className=" lg:h-[800px] lg:w-[1200px] max-w-full"
        {...props.modalProps}>
        <ModalContent className=" h-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center gap-4">
                <div className=" p-3 rounded-full bg-color-4/20">
                  <MdOutlineImage size={26} />
                </div>
                <div>Drop your image here</div>
              </ModalHeader>
              <ModalBody className=" h-full w-full">
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{
                    tabList:
                      'gap-6 w-full h-full relative rounded-none  p-0 group-data-[selected=true]:border-color-4 border-b border-divider',
                    cursor: 'w-full bg-color-4',
                    tab: 'max-w-fit px-0 h-12',
                    tabContent: 'group-data-[selected=true]:text-color-4',
                  }}
                  {...props?.tabProps}>
                  {props?.tab ? (
                    <>{props.tab}</>
                  ) : (
                    <>
                      <Tab
                        isDisabled={UploadImageMutationResult.isLoading}
                        key="upload"
                        className=" h-full flex justify-center flex-col items-center"
                        title={
                          <div className=" flex justify-center gap-1 items-center">
                            <AiOutlineUpload size={20} />
                            <span>upload</span>
                          </div>
                        }>
                        <CropImageComponentTabs
                          onFileChage={(e) => {
                            setImageFile(e);
                          }}
                          onClose={onClose}
                          isLoading={UploadImageMutationResult.isLoading}
                          onImageFileSave={
                            handleImageFileSave
                          }></CropImageComponentTabs>
                      </Tab>
                      <Tab
                        key="search"
                        className="h-full flex flex-col justify-center items-center"
                        title={
                          <div className=" flex justify-center gap-1 items-center">
                            <AiOutlineSearch size={20} />
                            <span>search</span>
                          </div>
                        }>
                        <SearchImageComponentTabs
                          onSelect={(url) => {
                            if (props.onSave) props.onSave(url);
                            onOpenChange();
                          }}></SearchImageComponentTabs>
                      </Tab>
                    </>
                  )}
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const CropImageComponentTabs = ({
  onClose,
  onFileChage,
  isCropActive = false,
  onImageFileSave,
  isLoading,
}: Partial<ReturnType<typeof useDisclosure>> & {
  isCropActive?: boolean;
  onFileChage?: (e: File) => void;
  onImageFileSave?: (e: File) => void;
  isLoading?: boolean;
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  // const { id, type, cardContent } = props;
  // const getCroppedImage = async () => {
  //   try {
  //     if (files && files.length > 0 && files[0].preview) {
  //       const croppedImage = (await getCroppedImg(
  //         files[0].preview,
  //         croppedAreaPixels,
  //         rotation
  //       )) as string;

  //       return croppedImage;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const dispatch = useAppDispatch();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...newFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // * catch the file change event
  useEffect(() => {
    if (onFileChage) onFileChage(files[0]);
  }, [files]);

  return (
    <>
      <div className=" flex-1 w-full">
        {files && files.length > 0 && files[0].preview ? (
          <div className="  relative rounded-sm h-full  col-span-1 w-full ">
            <div className="w-full h-full flex justify-center items-center">
              {isCropActive ? (
                <Cropper
                  image={files[0].preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : (
                <Image
                  className="  lg:h-[570px] "
                  src={files[0].preview}></Image>
              )}
            </div>
            <Button
              className=" absolute top-4 right-4 z-10 rounded-sm"
              color="danger"
              variant="flat"
              size="sm"
              isDisabled={isLoading}
              onPress={() => {
                setFiles([]);
              }}
              isIconOnly>
              <AiOutlineDelete size={20} />
            </Button>
          </div>
        ) : (
          <motion.div
            className={`relative size-full cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-500/5'
                : 'border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
            }`}
            onClick={handleButtonClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}>
            <input
              accept="image/*"
              className="hidden"
              multiple={true}
              onChange={handleFileInputChange}
              ref={fileInputRef}
              type="file"
            />
            <AnimatePresence>
              {isDragActive ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className=" pointer-events-none select-none"
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}>
                  <Upload className="pointer-events-none mx-auto size-8 select-none text-blue-500" />
                  <p className="pointer-events-none mt-2 select-none text-blue-500 text-sm">
                    Drop files here...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  initial={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}>
                  <Upload className="mx-auto size-8 text-neutral-400 dark:text-neutral-500" />
                  <p className="mt-2 text-balance font-medium text-neutral-400 text-sm tracking-tighter dark:text-neutral-500">
                    Drag and drop files here, or click to select
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ModalFooter className=" w-full flex items-center justify-end">
        <Button
          variant="light"
          onPress={onClose}
          isDisabled={isLoading}
          className=" rounded-sm bg-color-4/20 text-color-4">
          cancel
        </Button>
        <Button
          className=" rounded-sm bg-color-4 text-white"
          isDisabled={isLoading}
          startContent={
            isLoading ? (
              <CircularProgress aria-label="Loading..." size="sm" />
            ) : (
              <></>
            )
          }
          onPress={async () => {
            if (onImageFileSave) onImageFileSave(files[0]);
            // const croppedImage = await getCroppedImage();
            // croppedImage && props?.onSave && props.onSave(croppedImage);
          }}>
          Save
        </Button>
      </ModalFooter>
    </>
  );
};

const marsoryLayoutStyle: { rows: number; cols: number }[] = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export interface ISearchImageComponentTabsProps {
  onSelect?: (url: string) => void;
}
export const SearchImageComponentTabs = ({
  onSelect = () => {},
}: ISearchImageComponentTabsProps) => {
  // * define image per page
  const IMAGE_PER_PAGE = 16;

  const [searchTerm, setSearchTerm] = React.useState('image');
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchPhotosMutation, searchPhotosMutationResult] =
    useSearchPhotosMutation({});

  // * search new photo when the search term changes
  useEffect(() => {
    searchPhotosMutation({ limit: IMAGE_PER_PAGE, q: debouncedSearchTerm! });

    // * reset the page when the search term changes
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // * search new photo when the page changes
  useEffect(() => {
    searchPhotosMutation({
      limit: IMAGE_PER_PAGE,
      skip: (currentPage - 1) * IMAGE_PER_PAGE,
      q: debouncedSearchTerm!,
    });
  }, [currentPage]);

  return (
    <>
      <Input
        startContent={<AiOutlineSearch size={20} />}
        className=" w-full my-2 rounded-sm"
        placeholder="Search for ..."
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="bordered"></Input>

      {searchPhotosMutationResult.isLoading && (
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-full"
          size="sm"
        />
      )}

      <div className=" flex-1 overflow-y-scroll w-full relative">
        {!searchPhotosMutationResult.isLoading &&
          searchPhotosMutationResult.data?.metadata && (
            <div className="h-full w-full absolute">
              <div className="grid grid-cols-3 gap-4">
                {arrangeColumns(
                  searchPhotosMutationResult.data?.metadata
                    .filter((item) => item.photo_height !== undefined)
                    .map((item) => ({
                      ...item,
                      itemHeight: Number(
                        Number(item.photo_height) / Number(item.photo_width)
                      ),
                    }))
                ).map((itemArray, index) => {
                  return (
                    <div className=" col-span-1 flex flex-col gap-4">
                      {itemArray?.map((item, index) => {
                        return (
                          <ImageHoverCard
                            footer={
                              <div className=" w-full flex justify-end  items-center">
                                {/* <p cla>{item.photographer_username}</p> */}
                                <Button
                                  onPress={() => {
                                    onSelect(item.photo_image_url);
                                  }}
                                  className=" bg-color-4 rounded-md text-white  mx-2"
                                  startContent={<BiDownload />}>
                                  Use this image
                                </Button>
                              </div>
                            }
                            imageProps={{
                              removeWrapper: true,
                              className: ' object-cover rounded-sm',
                            }}
                            url={`${item.photo_image_url}`}></ImageHoverCard>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              {/* <LayoutGridDemo
                cards={searchPhotosMutationResult.data?.metadata.map(
                  (item, index) => ({
                    id: index,
                    content: (
                      <div>
                        <p className="font-bold md:text-4xl text-xl text-white">
                          {item.photographer_username}
                        </p>
                        <p className="font-normal text-base text-white"></p>
                        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                          {item.ai_description}
                        </p>
                      </div>
                    ),
                    className: 'col-span-1',
                    thumbnail: item.photo_image_url,
                  })
                )}
              /> */}
            </div>
          )}
      </div>

      <div className="flex gap-2">
        <Button
          color="secondary"
          isIconOnly
          onPress={() =>
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
          }>
          <GrFormPreviousLink size={28} />
        </Button>

        <Button
          color="secondary"
          isIconOnly
          onPress={() =>
            setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
          }>
          <GrFormNextLink size={28} />
        </Button>
      </div>
    </>
  );
};

export function LayoutGridDemo({ cards }: Parameters<typeof LayoutGrid>[0]) {
  const fourCards = [
    {
      id: 1,
      content: cards[0]?.content,
      className: 'md:col-span-2',
      thumbnail: cards[0]?.thumbnail,
    },
    {
      id: 2,
      content: cards[1]?.content,
      className: 'col-span-1',
      thumbnail: cards[1]?.thumbnail,
    },
    {
      id: 3,
      content: cards[2]?.content,
      className: 'col-span-1',
      thumbnail: cards[2]?.thumbnail,
    },
    {
      id: 4,
      content: cards[3]?.content,
      className: 'md:col-span-2',
      thumbnail: cards[4]?.thumbnail,
    },
  ];

  return (
    <>
      <LayoutGrid cards={fourCards} />
    </>
  );
}

export default DropImageModalButton;
