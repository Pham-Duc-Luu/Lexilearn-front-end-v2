import Circle from './circle';
import Oval from './oval';
import Smile from './smile';

export default function eyes(props: { style?: string }) {
  const { style } = props;
  switch (style) {
    case 'circle':
      return <Circle />;
    case 'smile':
      return <Smile />;
    case 'oval':
    default:
      return <Oval />;
  }
}
