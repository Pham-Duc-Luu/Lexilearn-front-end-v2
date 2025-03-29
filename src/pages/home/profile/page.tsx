import { useUploadImageMutation } from '@/api';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/api/user service';
import {
  AvatarFullConfig,
  genConfig,
  getAvatarInputFromConfig,
  getConfigFromAvatarInput,
} from '@/components/avatar-generator/utils';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardBody, CardHeader, Divider, Skeleton } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AvatarPicker from './AvatarPicker';
export default function ProfilePage() {
  const getUserProfileQuery = useGetUserProfileQuery();

  const [uploadImageMutationTrigger, uplodaImageMutationResult] =
    useUploadImageMutation();

  const [UpdateUserProfileMutationTrigger, UpdateUserProfileMutationResult] =
    useUpdateUserProfileMutation();
  const navigate = useNavigate();

  const [config, setConfig] = useState<AvatarFullConfig>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getUserProfileQuery.data?.getUserProfile?.avatarProperty)
      setConfig(
        getConfigFromAvatarInput(
          getUserProfileQuery.data.getUserProfile.avatarProperty
        )
      );
  }, [getUserProfileQuery.data]);

  // useEffect(() => {
  //   if (uplodaImageMutationResult.isSuccess && uplodaImageMutationResult.data) {
  //     UpdateUserProfileMutationTrigger({
  //       input: {
  //         ...getAvatarInputFromConfig(genConfig(config)),
  //         name: data?.getUserProfile?.name,
  //         avatar: uplodaImageMutationResult.data.public_url,
  //       },
  //     });
  //   }
  // }, [uplodaImageMutationResult]);

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

            {getUserProfileQuery.isLoading ? (
              <Skeleton className="h-20 w-1/4 rounded-sm"></Skeleton>
            ) : (
              <div className=" grid grid-cols-12">
                {getUserProfileQuery?.data?.getUserProfile?.avatarProperty && (
                  <AvatarPicker
                    config={config}
                    isLoading={isLoading}
                    onExport={(e) => {
                      setIsLoading(true);

                      uploadImageMutationTrigger({
                        body: e,
                      })
                        .unwrap()
                        .then((e) => {
                          UpdateUserProfileMutationTrigger({
                            input: {
                              ...getAvatarInputFromConfig(genConfig(config)),
                              name: getUserProfileQuery?.data?.getUserProfile
                                ?.name,
                              avatar: e.public_url,
                            },
                          })
                            .unwrap()
                            .then(() => {
                              setIsLoading(false);
                              getUserProfileQuery?.refetch();
                            });
                        });
                    }}
                    setConfig={setConfig}></AvatarPicker>
                )}
              </div>
            )}
            <Divider></Divider>
            <div className=" m-4">
              <h1 className=" text-lg font-semibold">Username</h1>

              <div className=" flex justify-between items-center">
                {getUserProfileQuery.isLoading ? (
                  <Skeleton className=" h-10 w-1/4 rounded-sm"> </Skeleton>
                ) : (
                  <>
                    {getUserProfileQuery?.data?.getUserProfile?.name}
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
                {getUserProfileQuery.isLoading ? (
                  <Skeleton className=" h-10 w-1/4 rounded-sm"></Skeleton>
                ) : (
                  getUserProfileQuery?.data?.getUserProfile?.email
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
