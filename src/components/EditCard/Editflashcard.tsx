'use client';
import DropDrowRecommend from '@/components/DropDrowRecommend';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';
import { CardContent, CardType, languages } from '@/redux/store/newDesk.slice';
import {
  searchChineseWords,
  searchEnglishWords,
  searchJapaneseWords,
} from '@/utils/wordService';
import { faker } from '@faker-js/faker';
import {
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@heroui/react';

import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDebounce } from '@uidotdev/usehooks';
import { convert } from 'html-to-text';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdOutlinePause, MdOutlinePlayArrow } from 'react-icons/md';
import { AudioRecordDialog } from '../dialog/AudioRecord.dialog';
import { ImageSearchDialog } from '../dialog/ImageSearch.dialog';
export interface EditFlashcardProps extends CardProps {
  cardContent?: CardContent;
  id: string;
  type: CardType;
  onCardContentChange?: (cardContent: CardContent) => void;
  isEditable?: boolean;
  isDisplayHeader?: boolean;
  endContent?: ReactNode;
}

export const PlayAudioButton = ({
  audioUrl,
  className,
  ...props
}: { audioUrl?: string } & ButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current?.remove();
      audioRef.current = null;
    };
  }, [audioUrl]);

  const onPlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Button
        className={cn(' bg-color-4/20 right-5 z-10 rounded-sm ', className)}
        variant="flat"
        size="sm"
        onPress={onPlayPause}
        isIconOnly
        {...props}>
        {isPlaying ? (
          <MdOutlinePause size={20} />
        ) : (
          <MdOutlinePlayArrow size={20} />
        )}
      </Button>
    </>
  );
};

const EditFlashcard = ({
  cardContent: initialContent,
  onCardContentChange,
  type,

  isDisplayHeader = true,
  className,
  isEditable = true,
  ...props
}: EditFlashcardProps) => {
  // const { cardContent } = props;
  const [cardContent, setCardContent] = useState(initialContent);
  const text = useEditor({
    extensions: [
      StarterKit,
      Text,
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: () => {
          return 'Type any thing';
        },
      }),
    ],
    content: cardContent?.text,
    editorProps: {
      attributes: {
        class: 'text-2xl w-full text-center text recommendation',
      },
    },
    editable: isEditable,
    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getHTML();

      const truncatedContent = content;

      setCardContent({ ...cardContent, text: truncatedContent.trim() });
    },
  });

  const debouncedSearchTerm = useDebounce(cardContent?.text, 0);

  const [filters, setFilters] = useState<string[]>();

  // // * catch debounced search term
  useEffect(() => {
    if (cardContent?.lanuage === 'English') {
      if (debouncedSearchTerm)
        setFilters(searchEnglishWords(debouncedSearchTerm));
    }
    if (cardContent?.lanuage === 'Japanese') {
      if (debouncedSearchTerm)
        setFilters(
          searchJapaneseWords(debouncedSearchTerm).map((item) =>
            faker.helpers.arrayElement([item.jp.kj, item.jp.wd])
          )
        );
    }
    if (cardContent?.lanuage === 'Chinese') {
      if (debouncedSearchTerm)
        setFilters(
          searchChineseWords(debouncedSearchTerm).map((item) =>
            faker.helpers.arrayElement([item.simplified, item.pinyinRead])
          )
        );
    }
    if (!debouncedSearchTerm || debouncedSearchTerm?.length < 0) {
      setIsDropdownVisible(false);
    } else {
      setIsDropdownVisible(true);
    }
  }, [debouncedSearchTerm, cardContent?.lanuage]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setIsDropdownVisible(false);
  });

  useEffect(() => {
    if (filters?.length === 1 && filters[0] === cardContent?.text) {
      setIsDropdownVisible(false);
    }
  }, [filters, cardContent?.text]);

  useEffect(() => {
    if (!isDropdownVisible) setFilters([]);
  }, [isDropdownVisible]);

  useEffect(() => {
    if (onCardContentChange && cardContent) onCardContentChange(cardContent);
  }, [cardContent]);

  console.log(cardContent);

  return (
    <Card
      className={cn(
        'w-full aspect-video rounded-sm overflow-visible  border-t-4 border-b-[8px] border-color-4 bg-color-4/20 border-x-4 ',
        'col-span-6 col-start-4 w-full flex justify-center items-center',
        className
      )}
      {...props}>
      {isDisplayHeader && (
        <CardHeader className=" bg-color-4 rounded-none flex justify-between items-center">
          <span className=" text-lg text-white"> {type}</span>
          <div className=" flex justify-center items-center gap-4">
            <Dropdown className=" rounded-sm">
              <DropdownTrigger>
                {cardContent?.lanuage && cardContent?.lanuage !== 'other' ? (
                  <Button size="sm" className=" text-md font-bold rounded-sm">
                    {cardContent?.lanuage}
                  </Button>
                ) : (
                  <Button isIconOnly size="sm" className=" rounded-md">
                    <IoLanguageOutline size={18} />
                  </Button>
                )}
              </DropdownTrigger>
              <DropdownMenu
                className=" p-0 rounded-sm"
                aria-label="Dynamic Actions"
                items={languages.map((language) => ({
                  key: language,
                  label: language,
                }))}>
                {(item) => (
                  <DropdownItem
                    onPress={() => {
                      setCardContent({
                        ...cardContent,
                        lanuage: item.key,
                      });
                    }}
                    className=" rounded-none hover:bg-color-4/20"
                    key={item.key}>
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            <ImageSearchDialog
              onSave={(url) => {
                setCardContent({
                  ...cardContent,
                  image: url,
                });
              }}
            />

            <AudioRecordDialog
              text={cardContent?.text && convert(cardContent?.text)}
              onSave={(url) => {
                setCardContent({
                  ...cardContent,
                  sound: url,
                });
              }}></AudioRecordDialog>
            {props?.endContent}
          </div>
        </CardHeader>
      )}

      <CardBody
        className={cn(
          ' grid  p-2 grid-rows-1 grid-cols-2  relative aspect-video'
        )}>
        {cardContent?.image && (
          <div className="  relative rounded-sm h-full  col-span-1  content-center">
            <Image
              alt="Card front"
              src={cardContent?.image}
              className=" object-contain h-full aspect-square relative max-h-80"
              radius="sm"></Image>
            {isEditable && (
              <Button
                className=" absolute top-4 right-4 z-10 rounded-sm"
                color="danger"
                variant="flat"
                size="sm"
                onPress={() => {
                  setCardContent({
                    ...cardContent,
                    image: undefined,
                  });
                }}
                isIconOnly>
                <AiOutlineDelete size={20} />
              </Button>
            )}
          </div>
        )}

        <div
          className={cn(
            'editor-container relative flex justify-center items-center',
            cardContent?.image ? 'col-span-1 ' : 'col-span-2'
          )}>
          <EditorContent
            ref={ref}
            className="  flex justify-center items-center relative origin-bottom p-4"
            editor={text}
            onChange={() => {
              if (cardContent?.text && cardContent?.text.length > 0)
                setIsDropdownVisible(true);
            }}>
            {isDropdownVisible && (
              <DropDrowRecommend
                onSelect={(e) => {
                  setCardContent({
                    ...cardContent,
                    text: e.toString(),
                  });

                  text?.commands?.setContent(`<p>${e} </p>`);

                  setIsDropdownVisible(false);
                }}
                filters={filters?.slice(0, 9)}
                className=" w-56"></DropDrowRecommend>
            )}
          </EditorContent>
        </div>
        {cardContent?.sound && (
          <PlayAudioButton
            audioUrl={cardContent.sound}
            className=" absolute top-4  right-4"></PlayAudioButton>
        )}
      </CardBody>
    </Card>
  );
};

export default EditFlashcard;
