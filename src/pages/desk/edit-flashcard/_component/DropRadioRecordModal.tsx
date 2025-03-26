'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@heroui/react';
import { useWavesurfer } from '@wavesurfer/react';
import { AnimatePresence, motion } from 'framer-motion';
import { File, Upload } from 'lucide-react';
import type React from 'react';
import { type DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineUpload } from 'react-icons/ai';
import {
  MdOutlineKeyboardVoice,
  MdOutlinePause,
  MdOutlinePlayArrow,
  MdOutlineStopCircle,
} from 'react-icons/md';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { EditFlashcardProps } from '../_header/Editflashcard';
import './customWaveSurfer.css';
interface FileWithPreview extends File {
  preview: string;
}
const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(':');

const RecordTabs = ({
  onClose,
}: { onClose: () => void } & EditFlashcardProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  //   const onReady = (ws) => {
  //     setWavesurfer(ws);
  //     setIsPlaying(false);
  //   };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className=" w-full flex-1 flex flex-col justify-center items-center">
        {!audioURL ? (
          <>
            {!isRecording ? (
              <Button
                className=" rounded-sm bg-color-4 text-white"
                size="lg"
                onClick={startRecording}
                startContent={<MdOutlineKeyboardVoice />}>
                start recording
              </Button>
            ) : (
              <Button
                className=" rounded-sm bg-color-4 text-white"
                size="lg"
                onClick={stopRecording}
                startContent={<MdOutlineStopCircle />}>
                stop recording
              </Button>
            )}
          </>
        ) : (
          <>
            {audioURL && audioURL.length > 0 && (
              <>
                <AudioVisualization
                  setAudioURL={setAudioURL}
                  audioURL={audioURL}></AudioVisualization>
                <ModalFooter className=" w-full flex items-center justify-end">
                  <Button
                    variant="light"
                    onPress={onClose}
                    className=" rounded-sm bg-color-4/20 text-color-4">
                    cancel
                  </Button>
                  <Button
                    className=" rounded-sm bg-color-4 text-white"
                    onPress={() => {
                      onClose();
                    }}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const UploadrecordTab = ({
  onClose,
}: { onClose: () => void } & EditFlashcardProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioURL] = useState<string | null>(null);

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

  useEffect(() => {
    files &&
      files.length > 0 &&
      files[0].preview &&
      setAudioURL(files[0].preview);
  }, [files]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };
  return (
    <>
      <div className=" flex-1 w-full">
        {audioUrl ? (
          <div className="  relative rounded-sm h-full  col-span-1 w-full ">
            <AudioVisualization
              audioURL={audioUrl}
              setAudioURL={setAudioURL}></AudioVisualization>
            <ModalFooter className=" w-full flex items-center justify-end">
              <Button
                variant="light"
                onPress={onClose}
                className=" rounded-sm bg-color-4/20 text-color-4">
                cancel
              </Button>
              <Button
                className=" rounded-sm bg-color-4 text-white"
                onPress={() => {
                  onClose();
                }}>
                Save
              </Button>
            </ModalFooter>
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
              accept="audio/*"
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
    </>
  );
};

const AudioVisualization = ({
  audioURL,
  setAudioURL,
}: {
  audioURL: string;
  setAudioURL: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const containerRef = useRef(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioURL!,
    plugins: useMemo(() => [Timeline.create()], []),
    height: 200,
    waveColor: 'purple',

    // Set a bar width
    barWidth: 2,
    // Optionally, specify the spacing between bars
    barGap: 1,
    // And the bar radius
    barRadius: 2,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <div className=" w-full flex items-center justify-end gap-2">
        {isPlaying ? (
          <Button
            className=" bg-color-4/20 top-4 right-4 z-10 rounded-sm"
            variant="flat"
            size="sm"
            onPress={onPlayPause}
            isIconOnly>
            <MdOutlinePause size={20} />
          </Button>
        ) : (
          <Button
            className=" bg-color-4/20 top-4 right-4 z-10 rounded-sm"
            variant="flat"
            size="sm"
            onPress={onPlayPause}
            isIconOnly>
            <MdOutlinePlayArrow size={20} />
          </Button>
        )}

        <Button
          className="  top-4 right-4 z-10 rounded-sm"
          color="danger"
          variant="flat"
          size="sm"
          onPress={() => {
            setAudioURL(null);
          }}
          isIconOnly>
          <AiOutlineDelete size={20} />
        </Button>
      </div>
      <div className=" flex-1 flex justify-center flex-col items-center w-full">
        <div
          className=" w-full max-h-60"
          id="waveform"
          ref={containerRef}></div>
        <div>
          {formatTime(currentTime)} /{' '}
          {wavesurfer?.getDuration() && formatTime(wavesurfer?.getDuration())}
        </div>
      </div>
    </div>
  );
};

const DropRadioRecordModal = (props: EditFlashcardProps) => {
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
                    <RecordTabs {...props} onClose={onClose}></RecordTabs>
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
                    <UploadrecordTab
                      onClose={onClose}
                      {...props}></UploadrecordTab>
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
