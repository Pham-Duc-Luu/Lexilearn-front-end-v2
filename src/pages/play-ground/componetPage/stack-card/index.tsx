import EditFlashcard from '@/components/EditCard/Editflashcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { faker } from '@faker-js/faker';
import { Button, Card } from '@heroui/react';
import { useRef } from 'react';
import StackCard from './stackCard';
const StackCardPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Tabs defaultValue="preview" className=" w-full">
      <TabsList className="grid w-80 m-4 gap-4 grid-cols-2">
        <TabsTrigger value="preview">preview</TabsTrigger>
        <TabsTrigger value="code">code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className=" p-4">
        <Card className=" h-[800px] flex justify-center items-center">
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
          <StackCard
            traversalCenterButton={buttonRef}
            onTraversalStart={(e) => console.log(e)}
            cards={Array.from({ length: 10 }, () => (
              <EditFlashcard
                isEditable={false}
                type="front"
                id="123"
                className=" w-[600px]"
                cardContent={{
                  text: faker.book.author(),
                }}></EditFlashcard>
            ))}></StackCard>

          <Button
            onPress={() => {
              buttonRef.current?.click();
            }}></Button>
        </Card>
      </TabsContent>
      <TabsContent value="code"></TabsContent>
    </Tabs>
  );
};

export default StackCardPage;
