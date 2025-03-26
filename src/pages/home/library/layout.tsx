import { Outlet } from 'react-router';
import InforBar from './InforBar';

export default function LibraryLayout() {
  return (
    <>
      <div className=" grid grid-cols-12 h-full bg-background-deemphasized gap-4 w-full">
        <InforBar></InforBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
