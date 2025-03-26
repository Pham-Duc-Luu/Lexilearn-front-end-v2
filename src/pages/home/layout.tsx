import NavBarProtoV1 from '@/components/Navbar.Proto.v1';
import { Outlet } from 'react-router';
import { SidebarDemo } from './SideBarDemo';

export default function HomeLayout() {
  return (
    <div className=" h-screen min-w-full bg-background-deemphasized flex flex-col">
      <NavBarProtoV1></NavBarProtoV1>
      <SidebarDemo>
        <Outlet></Outlet>
      </SidebarDemo>
    </div>
  );
}
