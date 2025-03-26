'use client';
import { useSearchDesksInfiniteInfiniteQuery } from '@/api';
import { useGetDesksQuery } from '@/api/user service/graphql/types.generated';
import useInView from '@/hooks/use-in-view';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Spinner } from '@heroui/react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { LayoutGrid } from './LayoutGrid';
const DeskCardLayoutV2 = () => {
  // const [cards, setCard] = useState<CardType[]>([]);
  const getDesksQuery = useGetDesksQuery({});
  const { searchDesk } = useAppSelector(
    (state) => state.persistedReducer.HomePage
  );

  const layoutRef = useRef<HTMLDivElement>(null);
  const isBottomInView = useInView(layoutRef);
  const searchDesks = useSearchDesksInfiniteInfiniteQuery({
    ...searchDesk.searchOptions,
  });
  // const searchDesks = useSearchDesksQuery({
  //   ...searchDesk.searchOptions,
  // });

  // useEffect(() => {
  //   if (searchDesks.isSuccess && searchDesks.data) {
  //     setCard(
  //       searchDesks.data.pages.flatMap(
  //         (item) =>
  //           item.searchDesk?.desks
  //             ?.filter(
  //               (desk): desk is NonNullable<typeof desk> => desk !== null
  //             )
  //             .map((desk) => ({
  //               id: Number(desk.id),
  //               title: desk.name || 'Untitled',
  //               description: desk.description || 'No description',
  //               thumbnail: desk.thumbnail || '', // Provide a default value
  //             })) ?? [] // Default to an empty array if desks is null/undefined
  //       )
  //     );
  //   }
  // }, [searchDesks]);

  useEffect(() => {
    if (isBottomInView) {
      searchDesks.fetchNextPage();
    }
  }, [isBottomInView]);

  useEffect(() => {
    if (getDesksQuery.isError) {
      toast('something went wrong', {
        type: 'error',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [getDesksQuery, getDesksQuery.isError]);

  return (
    <div className="flex-1 w-full ">
      {searchDesks?.data?.pages && (
        <LayoutGrid
          cards={searchDesks?.data?.pages.flatMap(
            (item) =>
              item.searchDesk?.desks
                ?.filter(
                  (desk): desk is NonNullable<typeof desk> => desk !== null
                )
                .map((desk) => ({
                  id: Number(desk.id),
                  title: desk.name || 'Untitled',
                  description: desk.description || 'No description',
                  thumbnail: desk.thumbnail || '', // Provide a default value
                })) ?? [] // Default to an empty array if desks is null/undefined
          )}
        />
      )}
      <div className=" flex justify-center items-center w-full" ref={layoutRef}>
        <Spinner />
      </div>
    </div>
  );
};

export default DeskCardLayoutV2;
