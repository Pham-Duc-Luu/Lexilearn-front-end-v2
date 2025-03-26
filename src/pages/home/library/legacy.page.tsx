import InforBar from './InforBar';
import ListBar from './ListBar';

const page = () => {
  return (
    <div className=" grid grid-cols-12 h-full bg-background-deemphasized gap-4 w-full">
      <InforBar></InforBar>
      <ListBar></ListBar>
    </div>
  );
};

export default page;
