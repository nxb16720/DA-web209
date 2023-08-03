import React from "react";

type ButtonProps = {
    type?: "primary" | "danger";
    icon?: React.ReactNode;
    primary?: boolean;
    danger?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
};

const Button = ({ type, icon, children, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`inline-block rounded  px-4 py-2 text-xs font-medium  text-white
                        ${type == "primary" && "bg-indigo-600 hover:bg-indigo-700"}
                        ${type == "danger" && "bg-red-500 hover:bg-red-600 "}
        `}
        >
            {icon && icon}
            {children}
        </button>
    );
};

export default Button;