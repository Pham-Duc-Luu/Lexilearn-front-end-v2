import Header from "@/pages/review/flashcard/Header.tsx";
import {Button, Card} from "@heroui/react";
import {useState} from "react";

export default function QuestionPage() {
    const [questions, setQuestions] = useState<{
        questionId: number;
        question: string;
        answer: string[];
    }[]>([
        {
            question: "a question",
            questionId: 123,
            answer: ["answer 1", "answer 2", "answer 3", "answer 3"]
        }
    ]);
    return <>
        <Header
        ></Header>
        <Card className={" h-full m-6 bg-color-4/20 rounded-sm grid grid-rows-2"}>
            <div className={" content-center text-center text-4xl"}>{questions[0].question}</div>
            <div className={" grid grid-cols-2 grid-rows-2 gap-4"}>
                {questions[0].answer.map((answer, index) => (

                    <Button className={" text-xl rounded-sm border-2  border-color-3 bg-color-3/50 h-full"}
                            key={index}>{answer}</Button>

                ))}


            </div>
        </Card>
    </>
}

