import Header from './Header';
import ReviewFlashcard from './page';

export default function ReviewFlashcardLayout() {
  return (
    <div className=" h-screen min-w-full bg-background-deemphasized flex flex-col">
      <Header></Header>
      <ReviewFlashcard></ReviewFlashcard>
    </div>
  );
}
