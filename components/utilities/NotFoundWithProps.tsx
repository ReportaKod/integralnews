"use client"
import React from 'react'
import { MyButton, SimpleLink } from '../buttons/Button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type TextMessage = {text: string, text2: string, color?: string}
interface NotFoundComponentProps {
  classNames?: string
  error?: Partial<TextMessage>
  message: Partial<TextMessage>
  subject?: Partial<TextMessage>
  isTextColumn?: boolean
  locale: string | undefined
  website?: string
  github?: string
  isError?: boolean
}

const NotFoundWithProps: React.FC<NotFoundComponentProps > = ({
  classNames = "min-h-[100vh] p-[40px] flex gap-4 flex-col items-center",
  website = "",
  github = "",
  isError = true,
  error= {text: "", color: ""},
  message ={text: "", color: ""},
  subject = {text: "", color: ""},
  locale,
  isTextColumn = false,
  ...props
}) => {
  
  const t = useTranslations('')  
  const tp = useTranslations('projectPage')  
 
  return (
    <div className={classNames} {...props}>
      <div className={`min-w-[360px] border border-2 border-secondary rounded-lg`}>
          <div className="my-[20px] px-4 py-2">
            {isError ? <h1 className={`font-bold text-4xl text-center text-${error.color || "primary"}`}>{error.text || "404"}</h1> : null}
            <p className={`${isTextColumn && "flex flex-col gap-2"} my-5 text-2xl text-center text-${message.color}`}>
              <span>{message.text}</span>
              {message.text2 ? <span>{message.text2}</span> : null}
              <span className={`${subject.text ? "inline" : "hidden"} font-bold text-${subject.color}`}>{subject.text}</span>
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 items-center bg-background-secondary px-4 py-2 rounded-b-lg">
          {website ? (<SimpleLink url={website} className="" rounded variant={"primary"} size='medium'>
              <span className="before:z-lg">{t('Voir le site web')}</span>
            </SimpleLink>):null}
            {github ? (<SimpleLink url={github} className="group flex items-center gap-2" rounded variant={"secondary"} size='medium'>
              <Image src='/github/github-mark.svg' className="group-hover:hidden" width={24} height={24} alt="github" />
              <Image src='/github/github-mark-white.svg' className="hidden group-hover:block" width={24} height={24} alt="github" />
              <span className="before:z-lg">{t('Voir le repository')}</span>
            </SimpleLink>):null}
            <a className="" href={`/${locale}/#projects`}>
              <MyButton className="" rounded variant={"secondary"} size='medium'>
                <span className="before:z-lg">{t('Retour')}</span>
              </MyButton>
            </a>
          </div>
        
      </div>

    </div>
  )
}

export default NotFoundWithProps
