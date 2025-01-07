import { ButtonProps } from 'src/interfaces/userInterfaces/userInterfaces'



const Button = ({
    children,
    size = "default",
    className = "",
    onClick,
    type = "button"
}: ButtonProps) => {
    const sizeClasses = {
        default: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors 
      ${sizeClasses[size]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button