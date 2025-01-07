import { ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    size?: 'default' | 'lg'
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}



interface CardProps {
    children: ReactNode
    className?: string
}



interface CardContentProps {
    children: ReactNode
    className?: string
}



interface Feature {
    icon: ReactNode
    title: string
    description: string
}


interface Service {
    icon: ReactNode
    title: string
    description: string
}


interface FeatureProps {
    icon: React.ReactNode
    title: string
    description: string
    bgColor: string
}

export {
    Service, Feature, CardContentProps, CardProps, ButtonProps, FeatureProps
}