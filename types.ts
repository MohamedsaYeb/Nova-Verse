
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed answer
  explanation?: string;
}
