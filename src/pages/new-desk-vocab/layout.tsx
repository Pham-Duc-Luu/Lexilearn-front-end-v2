import { Outlet } from 'react-router';
import Header from './_header/Header';

export default function NewDeskVocabLayout() {
  return (
    <div className=" h-screen overflow-hidden min-w-full bg-background-deemphasized flex flex-col">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}
