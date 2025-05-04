import { Outlet } from 'react-router';
import { SettingBox } from './components/SettingBox';
import { Providers } from './Providers';

export default function MainLayout() {
  return (
    <>
      <Providers>
        <div className="relative">
          <Outlet></Outlet>
          <SettingBox></SettingBox>
        </div>
      </Providers>
    </>
  );
}
