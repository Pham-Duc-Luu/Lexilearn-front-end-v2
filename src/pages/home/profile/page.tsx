import { useProfileQuery } from '@/api/user service';
import { genConfig } from '@/components/avatar-generator';
import { Toaster } from '@/components/ui/toaster';
import { routeProto } from '@/redux/store/route.slice';
import {
  // Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@heroui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AvatarPicker from './AvatarPicker';
export default function ProfilePage() {
  const { data, isLoading, isFetching, error, isError } = useProfileQuery(null);
  const navigate = useNavigate();
  const config = genConfig({ sex: 'man', hairStyle: 'mohawk' });

  useEffect(() => {
    if (error && 'status' in error) {
      toast.error(
        <>
          Your working session is end, please
          <Button
            onPress={() => navigate(routeProto.AUTH())}
            className=" rounded-sm"
            variant="flat"
            size="sm">
            Sign in
          </Button>
        </>
      );
    }
  }, [error, isError]);

  return (
    <>
      <Toaster></Toaster>
      <div className=" w-full h-full">
        <Card className=" rounded-sm m-10">
          <CardHeader>
            <h1 className=" text-lg font-semibold">Personal information</h1>
          </CardHeader>
          <Divider></Divider>
          {/* <SectionWrapper
            className="w-8 h-8 rounded-full p-2 mx-2"
            tip="Face"
            switchConfig={() => {}}>
            <Face color={config.faceColor} />
          </SectionWrapper> */}
          <CardBody>
            <h1 className=" text-lg font-semibold">Avatar</h1>

            {isLoading ? (
              <Skeleton className="h-20 w-1/4 rounded-sm"></Skeleton>
            ) : (
              <div className=" grid grid-cols-12">
                <AvatarPicker></AvatarPicker>
              </div>
            )}
            <Divider></Divider>
            <div className=" m-4">
              <h1 className=" text-lg font-semibold">Username</h1>

              <div className=" flex justify-between items-center">
                {isLoading ? (
                  <Skeleton className=" h-10 w-1/4 rounded-sm"> </Skeleton>
                ) : (
                  <>
                    {data?.metadata?.name}
                    {/*<Button isIconOnly variant="flat">*/}
                    {/*    <MdOutlineEdit/>*/}
                    {/*</Button>*/}
                  </>
                )}
              </div>
            </div>
            <Divider></Divider>

            <div className=" m-4">
              <h1 className=" text-lg font-semibold">Email</h1>

              <div>
                {isLoading ? (
                  <Skeleton className=" h-10 w-1/4 rounded-sm"></Skeleton>
                ) : (
                  data?.metadata?.email
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
