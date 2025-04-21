export interface ButtonProps {
    title: string;
    textSize?: string;
    boxSize?: string;
    onClick?: () => void;
}

export interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    id: string;
    className: string;
    placeholder: string;
    
}