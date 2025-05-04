'use client';
import { useDeleteDeskMutation } from '@/api';
import {
  DeskSortField,
  DeskStatus,
  SortOrder,
} from '@/api/user service/graphql/types.generated';
import { useGetUserDesksQuery } from '@/api/user service/graphql/user.graphql.api';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  LibraryRouteStatusType,
  URLParameterType,
} from '@/redux/store/route.slice';
import { Card, Skeleton } from '@heroui/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useParams } from 'react-router';
import FilterBlock from './FilterBlock.component';
import PaginationBlock from './PaginationBlock.component';
import SearchInput from './SearchInput.component';
import LibraryCardItem from './page';

export const getDeskQueryStatus = (
  status: LibraryRouteStatusType
): DeskStatus | null => {
  switch (status) {
    case 'bin':
      return DeskStatus.Bin;
    case 'drafted':
      return DeskStatus.Drafted;
    case 'published':
      return DeskStatus.Published;
    default:
      return null;
  }
};

export default function LibraryStatusLayout() {
  const { status, page } = useParams<URLParameterType>();
  const [searchText, setSearchText] = useState('');
  const searchTextDebounce = useDebounce(searchText, 800);
  const { deskLimit } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );

  const [DeleteDeskMutationTrigger, DeleteDeskMutationResult] =
    useDeleteDeskMutation();

  const getUserDesks = useGetUserDesksQuery({
    limit: deskLimit,
    skip: (Number(page!) - 1) * deskLimit,
    filter: {
      status: getDeskQueryStatus(status ? status : 'all'),
    },
    searchArg:
      searchTextDebounce && searchTextDebounce.length > 0
        ? {
            isRandom: false,
            q: searchTextDebounce,
          }
        : null,
    sort: {
      field: DeskSortField.CreatedAt,
      order: SortOrder.Desc,
    },
  });

  return (
    <>
      <div className=" col-span-9 p-4 flex flex-col">
        <SearchInput
          onChange={(e) => setSearchText(e.target.value)}></SearchInput>
        <FilterBlock></FilterBlock>
        <div className=" overflow-y-scroll flex-1 relative">
          <div className=" absolute w-full gap-2 flex flex-col p-2 justify-center items-center">
            {/* <Outlet></Outlet> */}

            {getUserDesks.isFetching ? (
              <Card
                className=" w-full rounded-sm  p-2 md:h-36 cursor-wait"
                radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
              </Card>
            ) : (
              getUserDesks?.data?.getUserDesks?.desks?.map((item) => {
                return (
                  <LibraryCardItem
                    item={item}
                    onDeleteSync={() =>
                      DeleteDeskMutationTrigger(item?.id ? item?.id : '')
                        .unwrap()
                        .then(() => {
                          getUserDesks.refetch();
                        })
                    }></LibraryCardItem>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full m-2 flex justify-center items-center">
          <PaginationBlock
            page={Number(page!)}
            total={
              getUserDesks.data?.getUserDesks?.total
                ? Math.ceil(getUserDesks.data?.getUserDesks?.total / deskLimit)
                : 1
            }></PaginationBlock>
        </div>
      </div>
    </>
  );
}
