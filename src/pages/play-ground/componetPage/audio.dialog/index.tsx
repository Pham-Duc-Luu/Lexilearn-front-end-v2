import { AudioRecordDialog } from '@/components/dialog/AudioRecord.dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@heroui/react';

const AudioDialog = () => {
  return (
    <Tabs defaultValue="preview" className=" w-full">
      <TabsList className="grid w-80 m-4 gap-4 grid-cols-2">
        <TabsTrigger value="preview">preview</TabsTrigger>
        <TabsTrigger value="code">code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className=" p-4">
        <Card className=" h-[600px] flex justify-center items-center">
          <AudioRecordDialog></AudioRecordDialog>
        </Card>
      </TabsContent>
      <TabsContent value="code"></TabsContent>
    </Tabs>
  );
};

export default AudioDialog;
