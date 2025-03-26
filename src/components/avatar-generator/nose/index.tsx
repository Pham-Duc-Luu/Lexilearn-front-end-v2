import Long from './long';
import Round from './round';
import Short from './short';

export default function nose(props: { style?: string }) {
  const { style } = props;
  switch (style) {
    case 'long':
      return <Long />;
    case 'round':
      return <Round />;
    case 'short':
    default:
      return <Short />;
  }
}
