import { routeProto } from '@/redux/store/route.slice';
import { Link } from 'react-router';

const LoginAgain = () => {
  return (
    <div className=" flex justify-between items-center ">
      <p>
        something went wrong, please{' '}
        <Link to={routeProto.AUTH()}>Login again</Link>
      </p>
    </div>
  );
};

export default LoginAgain;
