"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Word {
  text: string
  className?: string
}

interface TypewriterEffectSmoothProps {
  words: Word[]
  className?: string
  cursorClassName?: string
}

export function TypewriterEffectSmooth({ words, className, cursorClassName }: TypewriterEffectSmoothProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentWord = words[currentWordIndex]
  const fullText = currentWord.text

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < fullText.length) {
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [currentCharIndex, isDeleting, currentWordIndex, fullText, words.length])

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="inline-block">
        {words.map((word, wordIdx) => {
          const isCurrent = wordIdx === currentWordIndex
          const displayText = isCurrent
            ? word.text.slice(0, currentCharIndex)
            : currentWordIndex > wordIdx
              ? word.text
              : ""
          return (
            <span
              key={wordIdx}
              className={cn(
                "transition-colors duration-200",
                isCurrent ? word.className : "text-slate-400",
                !isCurrent && currentWordIndex > wordIdx && "opacity-30"
              )}
              style={{ display: wordIdx < currentWordIndex ? "inline" : "inline" }}
            >
              {wordIdx < currentWordIndex ? word.text : displayText}
              {isCurrent && wordIdx === currentWordIndex && (
                <span className={cn("inline-block w-[3px] ml-0.5 h-[1em] bg-teal-400 animate-pulse", cursorClassName)} />
              )}
            </span>
          )
        })}
      </span>
    </span>
  )
}
