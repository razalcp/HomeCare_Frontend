import { CardProps, CardContentProps } from 'src/interfaces/userInterfaces/userInterfaces'

const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`bg-customCardBlue rounded-lg shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    )
}

const CardContent = ({ children, className = "" }: CardContentProps) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    )
}
export { Card, CardContent }