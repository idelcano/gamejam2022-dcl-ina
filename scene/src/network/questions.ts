//we could download it from network to update questions easyest
const question = [
    {
       "question":"How many lands does decentraland have?",
       "anwser1":"90601",
       "anwser2":"90612",
       "anwser3":"60910"
    },
    {
       "question":"What is the sice of a single land?",
       "anwser1":"16x16",
       "anwser2":"10x10",
       "anwser3":"20x20"
    },
    {
       "question":"What is the value of a land in VP in the decentraland dao?",
       "anwser1":"1000",
       "anwser2":"100",
       "anwser3":"2000"
    }
 ]
 
export function getQuestionA(key: number) : string{
    return question[key]["question"] +"\n" + "Answer: "+ question[key]["anwser1"]
}
export function getQuestionB(key: number){
    return question[key]["question"] +"\n" + "Answer: "+ question[key]["anwser2"]
}
export function getQuestionC(key: number){
    return question[key]["question"] +"\n" + "Answer: "+ question[key]["anwser3"]
}