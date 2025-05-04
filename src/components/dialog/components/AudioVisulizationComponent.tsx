import { cn } from '@/lib/utils';
import { Button, Card } from '@heroui/react';
import { useWavesurfer } from '@wavesurfer/react';
import type React from 'react';
import { useMemo, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdDownload } from 'react-icons/io';
import { MdOutlinePause, MdOutlinePlayArrow } from 'react-icons/md';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(':');

export interface AudioVisualizationProps {
  audioURL: string;
  setAudioURL: React.Dispatch<React.SetStateAction<string | null>>;
  className?: string;
  onClose?: () => void;
  isLoading?: boolean;
  onAudioFileSave?: (e: File) => void;
}

export const AudioVisualization = ({
  audioURL,
  setAudioURL,
  className,
  onClose,
  isLoading = false,
  onAudioFileSave,
}: AudioVisualizationProps) => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioURL!,
    plugins: useMemo(() => [Timeline.create()], []),
    height: 200,
    waveColor: 'purple',

    // Set a bar width
    barWidth: 2,
    // Optionally, specify the spacing between bars
    barGap: 1,
    // And the bar radius
    barRadius: 2,
  });

  const onPlayPause = () => {
    if (wavesurfer) wavesurfer.playPause();
  };

  const getBlobFromBlobUrl = async (blobUrl: string): Promise<Blob> => {
    const res = await fetch(blobUrl);
    return await res.blob();
  };

  return (
    <Card
      isDisabled={isLoading}
      className={cn(
        ' w-full  flex flex-col justify-center items-center shadow-none',
        className
      )}>
      <div className=" w-full flex items-center justify-end gap-2">
        {isPlaying ? (
          <Button
            className=" bg-color-4/20 top-4 right-4 z-10 rounded-sm"
            variant="flat"
            size="sm"
            onPress={onPlayPause}
            isIconOnly>
            <MdOutlinePause size={20} />
          </Button>
        ) : (
          <Button
            className=" bg-color-4/20 top-4 right-4 z-10 rounded-sm"
            variant="flat"
            size="sm"
            onPress={onPlayPause}
            isIconOnly>
            <MdOutlinePlayArrow size={20} />
          </Button>
        )}

        <Button
          className=" bg-color-4/20 top-4 right-4 z-10 rounded-sm"
          variant="flat"
          size="sm"
          onPress={() => {
            if (!audioURL) return;
            const link = document.createElement('a');
            link.href = audioURL;
            link.download = 'audio.mp3'; // You can change the file name or infer from the URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          isIconOnly>
          <IoMdDownload size={20} />
        </Button>
        <Button
          className="  top-4 right-4 z-10 rounded-sm"
          color="danger"
          variant="flat"
          size="sm"
          onPress={() => {
            setAudioURL(null);
          }}
          isIconOnly>
          <AiOutlineDelete size={20} />
        </Button>
      </div>
      <div className=" flex-1 flex justify-center flex-col items-center w-full">
        <div
          className=" w-full max-h-60"
          id="waveform"
          ref={containerRef}></div>
        <div>
          {formatTime(currentTime)} /{' '}
          {wavesurfer?.getDuration() && formatTime(wavesurfer?.getDuration())}
        </div>
      </div>
      <div className=" w-full flex items-center justify-end">
        <Button
          variant="light"
          onPress={onClose}
          className=" rounded-sm bg-color-4/20 text-color-4">
          cancel
        </Button>
        <Button
          isLoading={isLoading}
          className=" rounded-sm bg-color-4 text-white"
          onPress={async () => {
            const blob = await getBlobFromBlobUrl(audioURL);
            const file = new File([blob], 'audio.wav', {
              type: 'audio/wav',
            });
            Object.assign(file, {
              preview: audioURL,
            });
            onAudioFileSave?.(file);
          }}>
          Save
        </Button>
      </div>
    </Card>
  );
};
