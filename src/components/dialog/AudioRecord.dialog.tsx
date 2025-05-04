import { useUploadAudioMutation } from '@/api';
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
import { AiOutlineUpload } from 'react-icons/ai';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
import { RiVoiceAiFill } from 'react-icons/ri';
import { Bounce, toast } from 'react-toastify';
import {
  AIGenerator,
  AIGeneratorProps,
} from './components/AIGeneratorComponent';
import { RecordTabs } from './components/RecordComponenet';
import { UploadrecordTab } from './components/UploadRecordComponenet';

export interface AudioRecordDialogProps {
  Button?: typeof Button;
  onSave?: (localUrl: string) => void;
  modalProps?: Partial<ModalProps>;
  tabProps?: Partial<TabsProps>;
  tab?: ReactNode;
  onAudioFileChange?: (e: File) => void;
  onAudioFileSave?: (e: File) => void;
  language?: AIGeneratorProps['language'];
  text?: AIGeneratorProps['text'];
  voice?: AIGeneratorProps['voice'];
}

export function AudioRecordDialog(props: AudioRecordDialogProps) {
  // * use the upload api to upload image
  const [UploadAudioMutationTrigger, UploadAudioMutationResult] =
    useUploadAudioMutation();
  const [isOpen, setIsOpen] = useState(false);

  // * handle image file save when upload using api
  const handleAudioFileSave = (e: File) => {
    const formData = new FormData();
    formData.append('audio', e);
    toast.promise(
      UploadAudioMutationTrigger({
        body: formData,
      }).unwrap(),
      {
        pending: 'Uploading audio...',
        // * notify when image file can not upload to cloud
        error: {
          render: "Oops, cann't upload the audio",
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

  useEffect(() => {
    if (UploadAudioMutationResult.data) {
      props?.onSave?.(UploadAudioMutationResult.data.public_url);
      setIsOpen(false);
    }
  }, [UploadAudioMutationResult]);

  const [tabKey, settabkey] = useState('record');

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
              <MdOutlineKeyboardVoice size={18} />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className=" lg:h-[800px] lg:w-[1200px] max-w-full flex justify-center items-center flex-col">
          <DialogHeader className="flex w-full justify-start items-center gap-4 flex-row">
            <div className=" p-3 rounded-full bg-color-4/20">
              <MdOutlineKeyboardVoice size={26} />
            </div>
            <DialogTitle>Audio</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue={tabKey}
            onValueChange={(e) => settabkey(e)}
            aria-label="Options"
            className=" flex-1 w-full h-full flex flex-col justify-center items-center">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="record">
                <div className=" flex justify-center gap-1 items-center">
                  <MdOutlineKeyboardVoice size={20} />
                  <span>record</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="upload">
                <div className=" flex justify-center gap-1 items-center">
                  <AiOutlineUpload size={20} />
                  <span>upload</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="generate">
                <div className=" flex justify-center gap-1 items-center">
                  <RiVoiceAiFill size={20} />
                  <span>generate</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {tabKey === 'record' && (
              <TabsContent value="record" className=" flex-1  w-full flex ">
                <RecordTabs
                  onClose={() => setIsOpen(false)}
                  isLoading={UploadAudioMutationResult.isLoading}
                  onAudioFileSave={(e) => {
                    handleAudioFileSave(e);
                  }}></RecordTabs>
              </TabsContent>
            )}
            {tabKey === 'upload' && (
              <TabsContent value="upload" className=" flex-1  w-full flex ">
                <UploadrecordTab
                  onClose={() => setIsOpen(false)}
                  isLoading={UploadAudioMutationResult.isLoading}
                  onAudioFileSave={(e) => {
                    handleAudioFileSave(e);
                  }}></UploadrecordTab>
              </TabsContent>
            )}

            {tabKey === 'generate' && (
              <TabsContent value="generate" className=" flex-1  w-full flex ">
                <AIGenerator
                  onClose={() => setIsOpen(false)}
                  language={props.language}
                  text={props.text}
                  isLoading={UploadAudioMutationResult.isLoading}
                  onAudioFileSave={(e) => {
                    handleAudioFileSave(e);
                  }}></AIGenerator>
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
