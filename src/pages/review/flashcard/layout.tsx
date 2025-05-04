import { Outlet } from 'react-router';

export default function ReviewFlashcardLayout() {
  return (
    <div className=" h-screen min-w-full bg-background-deemphasized flex flex-col">
      <Outlet></Outlet>
    </div>
  );
}
