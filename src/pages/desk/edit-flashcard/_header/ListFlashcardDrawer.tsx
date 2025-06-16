import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from '@heroui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaList } from 'react-icons/fa';
import SideCard from '../_component/SideCard';

const ListFlashcardDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation('edit');
  // const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddVocabulary = () => {
    // dispatch(initNewFlashcard());
    // Scroll to the bottom of the container
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className=" rounded-sm bg-color-4 text-white"
        startContent={<FaList />}>
        {t('header.flashcard list.Title')}
      </Button>
      <Drawer
        radius="sm"
        backdrop="blur"
        // isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {t('header.flashcard list.Title')}
              </DrawerHeader>
              <DrawerBody>
                <SideCard></SideCard>
              </DrawerBody>
              <DrawerFooter>
                {/* <Button
                  className="rounded-sm flex-1 w-full bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4 "
                  startContent={<MdAdd />}
                  onPress={() => handleAddVocabulary()}>
                  {t('header.flashcard list.add card')}
                </Button> */}
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ListFlashcardDrawer;
