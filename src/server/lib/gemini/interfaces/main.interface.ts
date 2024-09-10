export type TQuestionShemaFromRaw = {
    title: string;
    options: string[];
}
export type TQuestionShemaWithCategory = TQuestionShemaFromRaw & {
    categoryId: string;
}