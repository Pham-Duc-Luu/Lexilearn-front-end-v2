import { Card, Image } from '@heroui/react';
import { useState } from 'react';
import backgroudImage from '@/assets/sign in backgroud.jpg?url';

import { AnimatePresence } from 'framer-motion';
import { LoginCard } from './LoginCard';
import { SignUpCard } from './SignUpCard';
import { ForgotPasswordcard } from './ForgotPasswordCard';

export type AuthDisplay = 'sign up' | 'log in' | 'forgot password';
export default function AuthPage({ children }: { children?: React.ReactNode }) {
  const [display, setDisplay] = useState<AuthDisplay>('log in');
  const [duration, setduration] = useState(0.04);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className=" lg:w-[800px] h-[600px] relative rounded-sm shadow-xl shadow-gray-600">
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover rounded-sm "
          src={backgroudImage}
        />
        <AnimatePresence>
          {display === 'log in' && (
            <LoginCard
              display={display}
              setDisplay={setDisplay}
              duration={duration}></LoginCard>
          )}
          {display === 'sign up' && (
            <SignUpCard
              display={display}
              setDisplay={setDisplay}
              duration={duration}></SignUpCard>
          )}
          {display === 'forgot password' && (
            <ForgotPasswordcard
              display={display}
              setDisplay={setDisplay}
              duration={duration}></ForgotPasswordcard>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
