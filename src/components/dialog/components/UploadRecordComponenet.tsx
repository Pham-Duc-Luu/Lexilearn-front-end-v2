import { cn } from '@/lib/utils';
import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { type DragEvent, useEffect, useRef, useState } from 'react';
import { AudioVisualization } from './AudioVisulizationComponent';

interface FileWithPreview extends File {
  preview: string;
}

export const UploadrecordTab = ({
  onClose = () => {},
  className,
  isLoading = false,
  onAudioFileSave,
}: {
  onClose?: () => void;
  className?: string;
  isLoading?: boolean;
  onAudioFileSave?: (e: File) => void;
}) => {
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
    if (files && files.length > 0 && files[0].preview)
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
      <div className={cn(' flex-1 w-full', className)}>
        {audioUrl ? (
          <div className="  relative rounded-sm h-full flex justify-center items-center flex-col  col-span-1 w-full ">
            <AudioVisualization
              audioURL={audioUrl}
              className=" flex-1"
              isLoading={isLoading}
              onAudioFileSave={onAudioFileSave}
              setAudioURL={setAudioURL}></AudioVisualization>
            <div className=" w-full flex items-center justify-end">
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
            </div>
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
