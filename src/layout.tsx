import { Outlet } from 'react-router';
import { SettingBox } from './components/SettingBox';

export default function MainLayout() {
  return (
    <>
      <div className=" relative">
        <Outlet></Outlet>
        <SettingBox></SettingBox>
      </div>
    </>
  );
}
