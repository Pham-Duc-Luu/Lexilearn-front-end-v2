'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@heroui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
import { RiVoiceAiFill } from 'react-icons/ri';
import { AIGenerator } from './components/AIGeneratorComponent';

const DropRadioRecordModal = ({
  onSave,
}: {
  onSave?: (localUrl: string) => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} isIconOnly size="sm" className=" rounded-md">
        <MdOutlineKeyboardVoice size={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        radius="sm"
        className=" lg:h-[600px] lg:w-[800px] max-w-full">
        <ModalContent className=" h-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center gap-4">
                <div className=" p-3 rounded-full bg-color-4/20">
                  <MdOutlineKeyboardVoice size={26} />
                </div>
                <div>Drop your mp3 file here</div>
              </ModalHeader>
              <ModalBody className=" h-full w-full">
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{
                    tabList:
                      ' w-full h-full relative rounded-none  p-0 group-data-[selected=true]:border-color-4 border-b border-divider',
                    cursor: 'w-full bg-color-4',
                    tab: 'max-w-fit px-0 h-12',
                    tabContent: 'group-data-[selected=true]:text-color-4 p-2',
                  }}>
                  <Tab
                    key="record"
                    className="h-full"
                    title={
                      <div className=" flex justify-center gap-1 items-center">
                        <MdOutlineKeyboardVoice size={20} />
                        <span>record</span>
                      </div>
                    }>
                    <RecordTabs onClose={onClose}></RecordTabs>
                  </Tab>
                  <Tab
                    key="upload"
                    className=" h-full flex justify-center flex-col items-center"
                    title={
                      <div className=" flex justify-center gap-1 items-center">
                        <AiOutlineUpload size={20} />
                        <span>upload</span>
                      </div>
                    }>
                    <UploadrecordTab onClose={onClose}></UploadrecordTab>
                  </Tab>
                  <Tab
                    key="generate"
                    className=" h-full flex justify-center flex-col items-center"
                    title={
                      <div className=" flex justify-center gap-1 items-center">
                        <RiVoiceAiFill size={20} />
                        <span>generate</span>
                      </div>
                    }>
                    <AIGenerator onClose={onClose}></AIGenerator>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DropRadioRecordModal;
