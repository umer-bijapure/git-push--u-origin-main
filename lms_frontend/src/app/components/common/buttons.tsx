import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface CommonButtonProps {
  hidden?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
  form?: string;
  text: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  hidden,
  loading,
  className = '',
  id,
  type = 'button',
  onClick,
  disabled,
  title,
  form,
  text
}) => {
  if (hidden) {
    return null;
  }

  return loading ? (
    <button
      disabled={true}
      className="flex min-w-20 items-center justify-center rounded-md border bg-blue-400 py-2 px-4 text-xl font-semibold text-white"
    >
      <FontAwesomeIcon icon={faSpinner} className="fa-spin px-6" fixedWidth />
    </button>
  ) : (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={
        "flex min-w-20 items-center justify-center rounded-md border bg-opacity-100 py-2 px-2 text-sm font-semibold disabled:cursor-default disabled:bg-opacity-50 lg:min-w-28 lg:px-4 " +
        className
      }
      disabled={disabled}
      title={title}
      form={form}
    >
      {text}
    </button>
  );
};
  

interface CommonButtonSolidBlueProps extends CommonButtonProps {
    // Additional props specific to CommonButtonSolidBlue (if any)
  }
  
  export const CommonButtonSolidBlue: React.FC<CommonButtonSolidBlueProps> = ({
    hidden,
    loading,
    id,
    type,
    onClick,
    disabled,
    title,
    form,
    text,
    className,
  }) => {
    return (
      <CommonButton
        id={id}
        type={type}
        className="border-transparent bg-blue-500 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-blue-500"
        
        onClick={onClick}
        disabled={disabled}
        hidden={hidden}
        title={title}
        form={form}
        text={text}
      />
        
      
    );
  };
  export const CommonButtonGreen: React.FC<CommonButtonSolidBlueProps> = ({
    hidden,
    loading,
    id,
    type,
    onClick,
    disabled,
    title,
    form,
    text,
    className,
  }) => {
    return (
      <CommonButton
        id={id}
        type={type}
        className="border-transparent bg-[color:var(--primaryColor)] text-[color:var(--lightBackgroundColor)] hover:bg-white hover:border-2 hover:border-[color:var(--mainTitleLightColor)] hover:text-[color:var(--mainTitleLightColor)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-blue-500"
        onClick={onClick}
        disabled={disabled}
        hidden={hidden}
        title={title}
        form={form}
        text={text}
      />
        
      
    );
  };

  interface CircularButtonProps {
    icon?: string; // Icon image URL
    href?: string; // Link to navigate when button is clicked
    color?: string; // Background color of the button
    title: string; // Title of the button
    width?:number;
    height?:number;
    onClick?: () => void;
  }
  
  export const CircularButton: React.FC<CircularButtonProps> = ({
    icon,
    href,
    color,
    title,
    width,
    height,
  }) => {
    // bg-${color}-500
    return (
      <a href={href} className={`flex flex-col items-center text-center p-2`}>
        <div
          className={`w-full h-full rounded-full  flex justify-center items-center vvvsm:mt-[-8px] p-2`}
        >
          <img src={icon} alt="Button Icon" className='rounded-full shadow-md border-2 border-white w-[80px] h-[80px] md:w-[60px] md:h-[60px] sm:w-[38px] vvvsm:w-[40px] vvvsm:h-[40px]' />
        </div>
        <span className={`vvvsm:text-[12px]  bsm:text-[14px] bsm:ml-[-2px] vvvsm:mt-[-16px] p-2 '${color}'`} >{title}</span>
      </a>
    );
  };

  interface CommonButtonTextProps {
  hidden?: boolean;
  loading?: boolean;
  id?: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  text: string;
}

export const CommonButtonText: React.FC<CommonButtonTextProps> = ({
  hidden,
  loading,
  id,
  type,
  onClick,
  disabled,
  title,
  text
}) => {
  return (
    <CommonButton
      id={id}
      type={type}
      className="border-transparent text-gray-600 hover:text-black focus:outline-none "
      text={text}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
      title={title}
    />
  );
};

  interface CommonAddButtonProps {
    icon: string;
    href?: string;
    title: string;
    color?: string;
    width?: number;
    height?: number;
    className?:string;
    onClick?: () => void;
  }
  
  // Create the reusable CommonIconButton component
  export const CommonAddButton: React.FC<CommonAddButtonProps> = ({
    icon,
    href,
    title,
    color,
    width,
    height,
    className,
    onClick,
  }) => {
    return (
      <div className={`flex flex-col justify-center items-center font-bold text-20 ${className}`}>
        
        <div className="">
          <CircularButton
            icon={icon}
            href={href}
            color={color}
            title={title}
            width={width}
            height={height}
          />
        </div>
        <div className="text-[color:var(--mainTitleColor)] font-extrabold text-xl mt-[-40px] ml-10">+</div>
      </div>
    );
  };