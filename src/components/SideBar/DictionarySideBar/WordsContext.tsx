import React, { createContext, useContext, useState, ReactNode } from "react";

interface WordsContextType {
  words: { word: string; description: string }[];
  setWords: React.Dispatch<React.SetStateAction<{ word: string; description: string }[]>>;
}

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export const useWords = () => {
  const context = useContext(WordsContext);
  if (context === undefined) {
    throw new Error("wordProvider를 찾을 수 없습니다.");
  }
  return context;
};

interface WordsProviderProps {
  children: ReactNode;
}

export const WordsProvider = ({ children }: WordsProviderProps) => {
  const [words, setWords] = useState<{ word: string; description: string }[]>([]);

  return <WordsContext.Provider value={{ words, setWords }}>{children}</WordsContext.Provider>;
};
