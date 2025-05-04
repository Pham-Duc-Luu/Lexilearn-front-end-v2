import { Button } from '@heroui/react';
import { useRef, useState } from 'react';
import { MdOutlineKeyboardVoice, MdOutlineStopCircle } from 'react-icons/md';
import { AudioVisualization } from './AudioVisulizationComponent';

export const RecordTabs = ({
  onClose = () => {},
  onAudioFileSave,
  isLoading = false,
}: {
  onClose?: () => void;
  onAudioFileSave?: (e: File) => void;
  isLoading?: boolean;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  //   const onReady = (ws) => {
  //     setWavesurfer(ws);
  //     setIsPlaying(false);
  //   };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className=" w-full flex-1 flex flex-col justify-center items-center">
        {!audioURL ? (
          <>
            {!isRecording ? (
              <Button
                className=" rounded-sm bg-color-4 text-white"
                size="lg"
                onClick={startRecording}
                startContent={<MdOutlineKeyboardVoice />}>
                start recording
              </Button>
            ) : (
              <Button
                className=" rounded-sm bg-color-4 text-white"
                size="lg"
                onClick={stopRecording}
                startContent={<MdOutlineStopCircle />}>
                stop recording
              </Button>
            )}
          </>
        ) : (
          <>
            {audioURL && audioURL.length > 0 && (
              <>
                <AudioVisualization
                  setAudioURL={setAudioURL}
                  audioURL={audioURL}
                  onClose={onClose}
                  className=" flex-1"
                  isLoading={isLoading}
                  onAudioFileSave={onAudioFileSave}></AudioVisualization>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
