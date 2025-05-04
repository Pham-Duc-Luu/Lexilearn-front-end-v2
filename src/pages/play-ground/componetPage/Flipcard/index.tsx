import EditFlashcard from '@/components/EditCard/Editflashcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@heroui/react';
import { FlipCard } from './flipcard';
const FlipCardPage = () => {
  return (
    <Tabs defaultValue="preview" className=" w-full">
      <TabsList className="grid w-80 m-4 gap-4 grid-cols-2">
        <TabsTrigger value="preview">preview</TabsTrigger>
        <TabsTrigger value="code">code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className=" p-4">
        <Card className=" h-[600px] flex justify-center items-center">
          {/* <EditFlashcard
            isEditable={false}
            type="front"
            id="123"
            className=" w-[800px]"
            cardContent={{
              text: 'Amazing',
              image:
                'https://as1.ftcdn.net/v2/jpg/02/09/20/30/1000_F_209203088_dUNW9sjX1SwPtLoIVRI6N4qXK8s8X2V0.jpg',
              sound:
                'https://dictionary.cambridge.org/media/english/us_pron/a/ama/amazi/amazing.mp3',
            }}></EditFlashcard> */}

          <FlipCard
            frontCard={
              <EditFlashcard
                isEditable={false}
                type="front"
                id="123"
                className=" w-[800px]"
                cardContent={{
                  text: 'Amazing',
                  sound:
                    'https://dictionary.cambridge.org/media/english/us_pron/a/ama/amazi/amazing.mp3',
                }}></EditFlashcard>
            }
            backCard={
              <EditFlashcard
                isEditable={false}
                type="back"
                id="123"
                className=" w-[800px]"
                cardContent={{
                  text: 'Amazin asdg',
                  image:
                    'https://as1.ftcdn.net/v2/jpg/02/09/20/30/1000_F_209203088_dUNW9sjX1SwPtLoIVRI6N4qXK8s8X2V0.jpg',
                  sound:
                    'https://dictionary.cambridge.org/media/english/us_pron/a/ama/amazi/amazing.mp3',
                }}></EditFlashcard>
            }></FlipCard>
        </Card>
      </TabsContent>
      <TabsContent value="code"></TabsContent>
    </Tabs>
  );
};

export default FlipCardPage;
