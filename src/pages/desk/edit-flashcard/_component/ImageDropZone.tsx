'use client';
import { useUploadImageMutation } from '@/api/image service/user-image.api';
import { useToast } from '@/hooks/use-toast';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { File, Upload } from 'lucide-react';
import type React from 'react';
import { type DragEvent, useEffect, useRef, useState } from 'react';
interface FileWithPreview extends File {
  preview: string;
}

export function ImageDropZone() {
  const { toast } = useToast();

  const [useUploadImageMutationTrigger, useUploadImageMutationResult] =
    useUploadImageMutation();

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image, Dropcursor],
    onUpdate: ({ editor }) => {
      // Truncate content to a single line

      const content = editor.getHTML();

      if (!content.startsWith('<img src=')) {
        setFiles([]);
      }
    },
  });

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
          toast({
            variant: 'destructive',
            title: 'Wrong file type',
          });
          return;
        }
      }

      handleFiles(files);
    }
  };

  useEffect(() => {
    if (files && files.length > 0) {
      editor?.chain().focus().setImage({ src: files[0].preview }).run();
    }
  }, [files, editor]);

  return (
    <div className="h-60 w-96 ">
      {files.length > 0 ? (
        <EditorContent editor={editor} />
      ) : (
        <div className=" p-1">
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
        </div>
      )}
    </div>
  );
}

export default ImageDropZone;
