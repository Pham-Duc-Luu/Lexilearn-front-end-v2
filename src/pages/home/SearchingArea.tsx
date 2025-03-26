import { setSearchOption } from '@/redux/store/HomePage.proto.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Card, CardBody, Input } from '@heroui/react';
import { MdNavigateNext, MdSearch } from 'react-icons/md';

const SearchingArea = () => {
  const { searchDesk } = useAppSelector(
    (state) => state.persistedReducer.HomePage
  );
  const dispatch = useAppDispatch();
  return (
    <div className=" h-52 bg-color-4/25 flex justify-center items-center">
      <div className=" grid w-full grid-cols-12">
        <div className=" col-span-8 col-start-3 relative">
          <div className=" p-5 content-center">
            <span className="  text-2xl w-full font-bold content-center">
              What do you want to learn
            </span>
          </div>
          <Input
            endContent={<MdNavigateNext size={24} />}
            startContent={<MdSearch size={24} />}
            size="lg"
            onChange={(e) => {
              setTimeout(() => {
                dispatch(
                  setSearchOption({
                    searchArg: {
                      isRandom: false,
                      q: e.target.value,
                    },
                  })
                );
              }, searchDesk.searchDelay);
            }}
            className=" mb-2"></Input>
          <Card
            radius="sm"
            className=" absolute bottom-0 w-full hidden"
            style={{
              transform: 'translateY(100%)',
            }}>
            <CardBody className=" hover:bg-color-4/40 cursor-pointer">
              asdasd
            </CardBody>
            <CardBody>asdasd</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchingArea;
