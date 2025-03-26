'use client';
import DropDrowRecommend from '@/components/DropDrowRecommend';
import DropImageModalButton from '@/components/ImageSeachModalButton';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';
import {
  CardContent,
  CardType,
  languages,
  updateReoderCarditem,
} from '@/redux/store/newDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  searchChineseWords,
  searchEnglishWords,
  searchJapaneseWords,
} from '@/utils/wordService';
import { faker } from '@faker-js/faker';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoLanguageOutline } from 'react-icons/io5';
import DropRadioRecordModal from '../_component/DropRadioRecordModal';
import './Header.css';

export interface EditFlashcardProps {
  cardContent?: CardContent;
  id: string;
  type: CardType;
}

const EditFlashcard = (props: EditFlashcardProps) => {
  const { cardContent, id, type } = props;
  const dispatch = useAppDispatch();
  const text = useEditor({
    extensions: [
      StarterKit,
      Text,
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return 'Enter the vocabulary here...';
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'text-2xl w-full text-center text recommendation',
      },
    },

    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();

      const truncatedContent = content.split('\n')[0]; // Only take the first line
      if (!content) {
        editor.commands.setContent(`<p></p>`);
      }
      if (content !== truncatedContent) {
        editor.commands.setContent(`<p>${truncatedContent} </p>`);
      }

      dispatch(
        updateReoderCarditem({
          id,
          type,
          data: { ...cardContent, text: truncatedContent },
        })
      );

      if (content !== truncatedContent) {
        editor.commands.setContent(
          `<p class="text-2xl">${truncatedContent}</p>`
        );
      }
    },
  });

  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.persistedReducer.NewDesk
  );

  useEffect(() => {
    if (cardContent?.text) {
      text?.commands.setContent(`<p> ${cardContent?.text} </p>`);
    } else {
      text?.commands.setContent(`<p></p>`);
    }
  }, [text]);

  const debouncedSearchTerm = useDebounce(cardContent?.text, 0);

  const [filters, setFilters] = useState<string[]>();

  // // * catch debounced search term
  useEffect(() => {
    if (cardContent?.lanuage === 'English') {
      debouncedSearchTerm &&
        setFilters(searchEnglishWords(debouncedSearchTerm));
    }
    if (cardContent?.lanuage === 'Japanese') {
      debouncedSearchTerm &&
        setFilters(
          searchJapaneseWords(debouncedSearchTerm).map((item) =>
            faker.helpers.arrayElement([item.jp.kj, item.jp.wd])
          )
        );
    }
    if (cardContent?.lanuage === 'Chinese') {
      debouncedSearchTerm &&
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
    !isDropdownVisible && setFilters([]);
  }, [isDropdownVisible]);

  return (
    <div className="col-span-6 col-start-4 w-full flex justify-center items-center">
      <Card
        className={cn(
          'w-full aspect-video rounded-sm overflow-visible  border-t-6 border-b-[8px] border-color-4 bg-color-4/20 border-x-4 '
        )}>
        <CardHeader className=" bg-color-4 rounded-none flex justify-between items-center">
          <span className=" text-lg text-white"> {props.type}</span>
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
                      dispatch(
                        updateReoderCarditem({
                          id,
                          type,
                          data: {
                            ...cardContent,
                            lanuage: item.key,
                          },
                        })
                      );
                    }}
                    className=" rounded-none hover:bg-color-4/20"
                    key={item.key}>
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
            <DropImageModalButton
              onSave={(url) => {
                dispatch(
                  updateReoderCarditem({
                    id,
                    type,
                    data: {
                      ...cardContent,
                      image: url,
                    },
                  })
                );
              }}
            />
            <DropRadioRecordModal {...props}></DropRadioRecordModal>
          </div>
        </CardHeader>
        <CardBody
          className={cn(
            ' grid overflow-visible p-0 m-2 grid-rows-1 grid-cols-2 '
          )}>
          {cardContent?.image && (
            <div className="  relative rounded-sm h-full  col-span-1 ">
              <Image
                alt="Card front"
                src={cardContent?.image}
                className=" object-cover h-full"
                radius="sm"
              />
              <Button
                className=" absolute top-4 right-4 z-10 rounded-sm"
                color="danger"
                variant="flat"
                size="sm"
                onPress={() => {
                  dispatch(
                    updateReoderCarditem({
                      id,
                      type,
                      data: {
                        ...cardContent,
                        image: undefined,
                      },
                    })
                  );
                }}
                isIconOnly>
                <AiOutlineDelete size={20} />
              </Button>
            </div>
          )}

          <div
            className={cn(
              'editor-container relative flex justify-center items-center',
              cardContent?.image ? 'col-span-1 ' : 'col-span-2'
            )}>
            <EditorContent
              ref={ref}
              className="  flex justify-center items-center relative origin-bottom"
              editor={text}
              onChange={() => {
                cardContent?.text &&
                  cardContent?.text.length > 0 &&
                  setIsDropdownVisible(true);
              }}>
              {isDropdownVisible && (
                <DropDrowRecommend
                  onSelect={(e) => {
                    dispatch(
                      updateReoderCarditem({
                        id,
                        type,
                        data: {
                          ...cardContent,
                          text: e.toString(),
                        },
                      })
                    );

                    text?.commands?.setContent(`<p>${e} </p>`);

                    setIsDropdownVisible(false);
                  }}
                  filters={filters?.slice(0, 9)}
                  className=" w-56"></DropDrowRecommend>
              )}
            </EditorContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditFlashcard;
