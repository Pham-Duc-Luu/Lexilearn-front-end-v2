import { cn } from '@/lib/utils';
import { LibraryRouteStatusType, routeProto } from '@/redux/store/route.slice';
import { Button } from '@heroui/react';
import { BsCollection } from 'react-icons/bs';
import { IoTrashBinOutline } from 'react-icons/io5';
import { MdChecklist, MdOutlineEditNote } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
const FilterBlock = () => {
  const navigate = useNavigate();
  const param = useParams<{ status: LibraryRouteStatusType }>();
  // const [] = use
  return (
    <>
      <div className=" flex justify-between items-center py-4">
        <div>
          <Button
            onPress={() => navigate(routeProto.LIBRARY('all', 1))}
            startContent={<BsCollection />}
            variant={param.status === 'all' ? 'flat' : 'light'}
            className={cn(
              ' rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ',
              param.status === 'all' && 'border-color-4 bg-color-4/20 '
            )}>
            Desk
          </Button>
          <Button
            onPress={() => navigate(routeProto.LIBRARY('published', 1))}
            startContent={<MdChecklist />}
            variant={param.status === 'published' ? 'flat' : 'light'}
            className={cn(
              ' rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ',
              param.status === 'published' && 'border-color-4 bg-color-4/20 '
            )}>
            Published
          </Button>

          <Button
            onPress={() => navigate(routeProto.LIBRARY('drafted', 1))}
            variant={param.status === 'drafted' ? 'flat' : 'light'}
            className={cn(
              ' rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ',
              param.status === 'drafted' && 'border-color-4 bg-color-4/20 '
            )}
            startContent={<MdOutlineEditNote />}>
            Drafted
          </Button>

          <Button
            onPress={() => navigate(routeProto.LIBRARY('bin', 1))}
            variant={param.status === 'bin' ? 'flat' : 'light'}
            className={cn(
              ' rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ',
              param.status === 'bin' && 'border-color-4 bg-color-4/20 '
            )}
            startContent={<IoTrashBinOutline />}>
            Bin
          </Button>
        </div>

        {/* <div className=" flex justify-center items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<CiFilter />}>
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<TbMenuOrder />}>
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div> */}
      </div>
    </>
  );
};

export default FilterBlock;
