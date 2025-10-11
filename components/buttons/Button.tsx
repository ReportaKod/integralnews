"use client"
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'light' | 'lightSwipe'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
}

interface LinkProps extends React.LinkHTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'light' | 'lightSwipe'
  size?: 'small' | 'medium' | 'large'
  target?: '_blank' | ''
  rounded?: boolean
  url: string | URL
}

const sizeStyles = {
  small: 'px-2 py-2 text-sm',
  medium: 'px-4 py-2 text-base font-semibold',
  large: 'px-6 py-3 text-lg font-semibold'
}

const baseStyles = `rounded focus:outline-none focus:shadow-outline`
const variantStyles = {
  primary: `button-primary`,
  secondary: `button-secondary btn-swipe`,
  light: `button-light`,
  lightSwipe: "button-light-swipe"
}

export const MyButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className = "",
  ...props
}) => {

  const buttonStyles = `${baseStyles} ${rounded ? 'rounded-full' : ''} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`
  
  return (
    <button className={buttonStyles} {...props} >
      {children}
    </button>
  )
}

export const SimpleLink: React.FC<LinkProps> = ({
  children, 
  url="#",
  title="",
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className = "",
  target="_blank",
  ...props

}) => {

  const LinkStyles = `${baseStyles} ${rounded? 'rounded-full' : ''} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  return (
    <a target={target} title={title} href={`${url}`} className={LinkStyles} {...props}>{children}</a>
  )
}
