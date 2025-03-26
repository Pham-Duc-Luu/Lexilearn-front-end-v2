'use client';
import {
  DeskSortField,
  DeskStatus,
  SortOrder,
} from '@/api/user service/graphql/types.generated';
import { useGetUserDesksQuery } from '@/api/user service/graphql/user.graphql.api';
import { setLibraryList } from '@/redux/store/LibraryStore.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  LibraryRouteStatusType,
  URLParameterType,
} from '@/redux/store/route.slice';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import FilterBlock from './FilterBlock.component';
import PaginationBlock from './PaginationBlock.component';
import SearchInput from './SearchInput.component';
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

  const getUserDesks = useGetUserDesksQuery({
    limit: deskLimit,
    skip: (Number(page!) - 1) * deskLimit,
    filter: {
      status: getDeskQueryStatus(status),
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getUserDesks.isSuccess) {
      if (getUserDesks.data.getUserDesks?.desks)
        dispatch(setLibraryList(getUserDesks.data.getUserDesks?.desks));
    }
  }, [getUserDesks, searchTextDebounce]);

  return (
    <>
      <div className=" col-span-9 p-4 flex flex-col">
        <SearchInput
          onChange={(e) => setSearchText(e.target.value)}></SearchInput>
        <FilterBlock></FilterBlock>
        <div className=" overflow-y-scroll flex-1 relative">
          <div className=" absolute w-full gap-2 flex flex-col p-2 justify-center items-center">
            <Outlet></Outlet>
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
