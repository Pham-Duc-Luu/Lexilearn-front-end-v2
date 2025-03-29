'use client';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  Button,
  Divider,
  Navbar,
  NavbarContent,
  Progress,
} from '@heroui/react';
import { IoCaretBack } from 'react-icons/io5';

const Header = () => {
  const { flashcards, currentFlashcardIndex } = useAppSelector(
    (state) => state.persistedReducer.ReviewFlashCard
  );
  return (
    <div className="grid grid-cols-1 ">
      <Navbar maxWidth="full">
        <NavbarContent className=" flex-1 grid gap-4 grid-cols-3">
          <div className="col-span-1 flex items-center   gap-4  justify-start ">
            <Button isIconOnly variant="bordered" radius="sm" size="sm">
              <IoCaretBack size={22} />
            </Button>
            <span>Flashcard</span>
          </div>
          <div className=" col-span-1 flex justify-center items-center">
            <div className=" border-t-3 border-b-[6px] rounded-sm border-x-3 text-xl border-color-4 border-2 py-2 px-5 ">
              {currentFlashcardIndex} /{flashcards.length}
            </div>
          </div>
        </NavbarContent>
      </Navbar>
      <Divider></Divider>
      <Progress
        classNames={{
          base: 'max-w-full',
          track: ' border border-default h-2',
          indicator: 'bg-gradient-to-r from-color-1 to-color-4',
          label: 'tracking-wider font-medium text-default-600',
          value: 'text-foreground/60',
        }}
        // label="Lose weight"
        radius="sm"
        // showValueLabel={true}

        value={(currentFlashcardIndex / flashcards.length) * 100}
      />
    </div>
  );
};

export default Header;
