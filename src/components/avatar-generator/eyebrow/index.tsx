import Up from './up';
import UpWoman from './upWoman';

export default function eyebrow(props: { style: string }) {
  const { style } = props;
  switch (style) {
    case 'upWoman':
      return <UpWoman />;
    case 'up':
    default:
      return <Up />;
  }
}
