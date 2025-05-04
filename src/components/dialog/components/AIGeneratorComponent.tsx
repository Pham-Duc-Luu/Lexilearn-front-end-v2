'use client';
import { VoiceOptions } from '@/api/dto/audio-generator.dto';
import {
  useGetAvailableVoicesQuery,
  useGetUserSubscriptionQuery,
  useLazyGenerateAudioQuery,
  useSubscribeMutation,
} from '@/api/generator service/audio-generator.service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Alert, Button, Card, Input, Skeleton, Spinner } from '@heroui/react';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { IoLanguage, IoSendSharp } from 'react-icons/io5';
import { MdOutlineRecordVoiceOver } from 'react-icons/md';
import { AudioVisualization } from './AudioVisulizationComponent';

export interface AIGeneratorProps {
  onClose?: () => void;
  language?: string;
  text?: Parameters<ReturnType<typeof useLazyGenerateAudioQuery>[0]>[0]['text'];
  // voiceOptions: VoiceOptions[];
  className?: string;
  isLoading?: boolean;
  onAudioFileSave?: (e: File) => void;
  total_character?: number;
  spent_character?: number;
}

export const AIGenerator = ({
  onClose,
  language,
  text,
  className,
  // voiceOptions,
  isLoading = false,
  onAudioFileSave,
}: AIGeneratorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    language ? language : ''
  );
  const GetUserSubscriptionQuery = useGetUserSubscriptionQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [SubscribeMutationTrigger, SubscribeMutationResult] =
    useSubscribeMutation();

  const getAvailableVoices = useGetAvailableVoicesQuery(null);

  const [inputValue, setInputValue] = useState(text);

  const [isOpenLanguagesDropDown, setIsOpenLanguagesDropDown] = useState(false);
  const [isOpenVoiceDropDown, setIsOpenVoiceDropDown] = useState(false);

  const [audioURL, setAudioURL] = useState<string | null>(null);

  const [selectedVoiceId, setselectedVoiceId] = useState<string>();

  const [LazyGenerateAudioQueryTrigger, LazyGenerateAudioQueryResult] =
    useLazyGenerateAudioQuery();

  const groupedVoice = getAvailableVoices.data
    ?.filter((item) => item.SupportedEngines.includes('standard'))
    .reduce((acc, item) => {
      if (!acc[item.LanguageName]) {
        acc[item.LanguageName] = [];
      }
      acc[item.LanguageName].push(item);
      return acc;
    }, {} as Record<string, VoiceOptions[]>);

  const groupedArray = Object.entries(groupedVoice ? groupedVoice : {}).map(
    ([language, items]) => ({
      LanguageName: language,
      voice_id: items,
    })
  );

  useEffect(() => {
    if (
      !LazyGenerateAudioQueryResult.isFetching &&
      LazyGenerateAudioQueryResult.data
    ) {
      const audioUrl = URL.createObjectURL(LazyGenerateAudioQueryResult.data);
      setAudioURL(audioUrl);
    }
  }, [LazyGenerateAudioQueryResult]);

  useEffect(() => {
    return () => {
      console.log(234);
    };
  }, []);

  if (GetUserSubscriptionQuery.isFetching)
    return <Skeleton className="w-2/3 h-20"></Skeleton>;

  if (GetUserSubscriptionQuery.isError) {
    if (GetUserSubscriptionQuery?.error?.status === 401) {
      return (
        <div className="flex items-center justify-center w-full ">
          <Alert
            className=" w-1/2"
            color={'warning'}
            title={`Look like you have not subscribed yet`}
            description="Please subscribe to use this service"
            endContent={
              <Button
                color="warning"
                size="sm"
                variant="flat"
                onPress={() =>
                  SubscribeMutationTrigger({
                    subscription_plan: 'basic',
                  })
                    .unwrap()
                    .then(() => {
                      GetUserSubscriptionQuery.refetch();
                    })
                }
                isLoading={SubscribeMutationResult.isLoading}>
                Subscribe to free plan
              </Button>
            }
          />
        </div>
      );
    } else {
      <div className="flex items-center justify-center w-full ">
        <Alert color={'danger'} title={`Oops, something went wrong!!`} />
      </div>;
    }
  }
  return (
    <Card
      isDisabled={isLoading}
      className={cn(
        ' w-full h-full flex justify-center items-center flex-col shadow-none',
        className
      )}>
      {audioURL && audioURL.length > 0 ? (
        <>
          <AudioVisualization
            onClose={onClose}
            className=" flex-1"
            isLoading={isLoading}
            onAudioFileSave={onAudioFileSave}
            setAudioURL={setAudioURL}
            audioURL={audioURL}></AudioVisualization>
        </>
      ) : (
        <div className=" w-2/3">
          <div className="">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className=" rounded-sm px-0"
              classNames={{
                inputWrapper: 'pr-0',
              }}
              variant="flat"
              radius="sm"
              endContent={
                LazyGenerateAudioQueryResult.isFetching ? (
                  <Spinner size="md" />
                ) : (
                  <Button
                    onPress={() => {
                      if (inputValue && selectedVoiceId) {
                        LazyGenerateAudioQueryTrigger({
                          text: inputValue,
                          voice_id: selectedVoiceId,
                        });
                      }
                    }}
                    className=" rounded-sm bg-color-4/40"
                    isIconOnly>
                    <IoSendSharp />
                  </Button>
                )
              }></Input>
          </div>
          <p className=" flex justify-end p-2">
            {`${GetUserSubscriptionQuery.data?.subscription_detail.spent_character} / ${GetUserSubscriptionQuery.data?.subscription_detail.total_character} character`}
          </p>
          <div className=" flex gap-4 mt-4">
            <DropdownMenu
              open={isOpenLanguagesDropDown}
              onOpenChange={setIsOpenLanguagesDropDown}>
              <DropdownMenuTrigger className=" flex justify-center items-center gap-2">
                <Button
                  onPress={() => setIsOpenLanguagesDropDown(true)}
                  startContent={<IoLanguage size={18}></IoLanguage>}
                  endContent={<FaAngleDown size={18} />}
                  variant="bordered"
                  radius="sm">
                  {selectedLanguage ? selectedLanguage : 'language'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" max-h-60 overflow-y-scroll">
                {groupedArray.map((item) => (
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedLanguage(item.LanguageName);
                      if (groupedVoice?.[selectedLanguage])
                        setselectedVoiceId(
                          groupedVoice[selectedLanguage][0].Id
                        );
                    }}>
                    {item.LanguageName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu
              open={isOpenVoiceDropDown}
              onOpenChange={setIsOpenVoiceDropDown}>
              <DropdownMenuTrigger className=" flex justify-center items-center gap-2">
                <Button
                  onPress={() => setIsOpenVoiceDropDown(true)}
                  startContent={
                    <MdOutlineRecordVoiceOver
                      size={18}></MdOutlineRecordVoiceOver>
                  }
                  endContent={<FaAngleDown size={18} />}
                  variant="bordered"
                  radius="sm">
                  {selectedVoiceId ? selectedVoiceId : 'voice'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                avoidCollisions={false}
                className=" max-h-60 overflow-y-scroll">
                {groupedVoice[selectedLanguage]?.map((item) => (
                  <DropdownMenuItem onClick={() => setselectedVoiceId(item.Id)}>
                    {item.Id}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </Card>
  );
};
