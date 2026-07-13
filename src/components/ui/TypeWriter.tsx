'use client';
import { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypeWriter({
  words, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2200
}: TypeWriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length + 1));
      if (currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setCurrentText(currentWord.substring(0, currentText.length - 1));
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [type, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className="inline-flex items-center min-h-[1.4em]">
      <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-semibold">
        {currentText}
      </span>
      <span className="ml-0.5 inline-block w-[3px] h-[1em] rounded-full bg-gradient-to-b from-yellow-400 to-amber-500 animate-blink" />
    </span>
  );
}
