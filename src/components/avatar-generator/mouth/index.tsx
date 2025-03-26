import Laugh from './laugh';
import Peace from './peace';
import Smile from './smile';

export default function mouth(props: { style?: string }) {
  const { style } = props;
  switch (style) {
    case 'laugh':
      return <Laugh />;
    case 'smile':
      return <Smile />;
    case 'peace':
    default:
      return <Peace />;
  }
}
