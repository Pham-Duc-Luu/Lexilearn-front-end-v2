import DeskCardLayoutV2 from './DeskCardLayout.v2';
import SearchingArea from './SearchingArea';

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-scroll">
      <SearchingArea></SearchingArea>
      <DeskCardLayoutV2></DeskCardLayoutV2>
    </div>
  );
}
