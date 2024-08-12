import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, ReactNode, useState } from 'react';
import { CommonButtonSolidBlue } from './buttons';

interface CommonTextInputProps {
  id: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CommonTextInput: React.FC<CommonTextInputProps> = ({
  id,
  required,
  value,
  placeholder,
  disabled,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={id}
      defaultValue={value}
      placeholder={placeholder}
      type="text"
      disabled={disabled}
      required={required}
      className="mt-1 block w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
      tabIndex={tabIndex}
    />
  );
};

interface CommonLabelProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
}

const CommonLabel: React.FC<CommonLabelProps> = ({ id, title, required = false, tooltip }) => {
  return (
    <label htmlFor={id} className="flex text-sm font-semibold text-gray-700">
      {title}
      {required ? <div className="text-red-500">*</div> : null}
      {tooltip ? (
        <div className="px-2 text-blue-600">
          <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
        </div>
      ) : null}
    </label>
  );
};

interface CommonPasswordInputProps {
  id: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CommonPasswordInput: React.FC<CommonPasswordInputProps> = ({
  id,
  required = false,
  disabled = false,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <input
        id={id}
        name={id}
        type={passwordVisible ? 'text' : 'password'}
        required={required}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
        maxLength={maxLength}
        autoComplete={autoComplete}
        tabIndex={tabIndex}
      />
      <div
        className="relative float-right -mt-9 mr-1 py-1 px-3 text-gray-500"
        onClick={togglePasswordVisibility}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} fixedWidth />
      </div>
    </div>
  );
};



interface CommonFormTextInputProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  labelSide?: boolean;
}



export const CommonFormTextInput: React.FC<CommonFormTextInputProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  placeholder,
  disabled = false,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  labelSide = false,
}) => {
  return (
    <div className={`flex flex-1 ${labelSide ? 'flex-row items-center space-x-2' : 'flex-col'}`}>
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonTextInput
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        tabIndex={tabIndex}
      />
    </div>
  );
};


interface CommonFormPasswordInputProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  labelSide?: boolean;
}

export const CommonFormPasswordInput: React.FC<CommonFormPasswordInputProps> = ({
  id,
  title,
  required = false,
  tooltip,
  disabled = false,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  labelSide = false,
}) => {
  return (
    <div className={`flex flex-1 ${labelSide ? 'flex-row items-center space-x-2' : 'flex-col'}`}>
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonPasswordInput
        id={id}
        required={required}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled}
        tabIndex={tabIndex}
        autoComplete={autoComplete}
      />
    </div>
  );
};


interface CommonFormSelectProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  value?: string;
  disabled?: boolean;
  autoComplete?: string;
  children: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  labelSide?: boolean;
  defaultValue?: string;
}

export const CommonFormSelect: React.FC<CommonFormSelectProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  disabled,
  autoComplete,
  children,
  onChange,
  labelSide,
  defaultValue,
}) => {
  return (
    <div className={"flex flex-1 " + (labelSide ? "flex-row items-center space-x-2" : "flex-col")}>
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonSelect
        id={id}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete={autoComplete}
      >
        {children}
      </CommonSelect>
    </div>
  );
};

interface CommonSelectProps {
  id: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  defaultValue?: string;
}

export const CommonSelect: React.FC<CommonSelectProps> = ({
  id,
  value,
  disabled,
  onChange,
  children,
  defaultValue,
}) => {
  return (
    <select
      aria-label="select"
      name={id}
      id={id}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
    >
      {children}
    </select>
  );
};



interface CommonFormTextNoInputProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  value: string;
  tabIndex?: number;
}

export const CommonFormTextNoInput: React.FC<CommonFormTextNoInputProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  tabIndex,
}) => {
  return (
    <div className="flex flex-1 select-none flex-col">
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonTextNoInput id={id} value={value} tabIndex={tabIndex} />
    </div>
  );
};

interface CommonFormSecretProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  value: string;
  tabIndex?: number;
  labelSide?: boolean;
}

export const CommonFormSecret: React.FC<CommonFormSecretProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  tabIndex,
  labelSide,
}) => {
  function CopyToClipboard(event: any) {
    event.preventDefault();
    navigator.clipboard.writeText(value);
  }

  return (
    <div className={"flex grid flex-1 grid-cols-6 content-start items-end gap-x-4 gap-y-2" + (labelSide ? " flex-row items-center space-x-2" : " col-6 flex-col")}>
      <div className="col-span-5 flex flex-col">
        <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
        <CommonSecret id={id} value={value} tabIndex={tabIndex} />
      </div>
      <div className="col-span-1 flex flex-col">
        <CommonButtonSolidBlue id={`copy-${id}`} text="Copy" onClick={CopyToClipboard} />
      </div>
    </div>
  );
};

interface CommonFormDateTimeSelectProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
  labelSide?: boolean;
  defaultValue?: string;
}

export const CommonFormDateTimeSelect: React.FC<CommonFormDateTimeSelectProps> = ({
  id,
  title,
  required = false,
  tooltip,
  disabled,
  labelSide,
  defaultValue,
}) => {
  return (
    <div className={"flex flex-1 " + (labelSide ? "flex-row items-center space-x-2" : "flex-col")}>
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonDateTimeSelect id={id} defaultValue={defaultValue} disabled={disabled} />
    </div>
  );
};
interface CommonFormDateSelectProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
  value?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelSide?: boolean;
  defaultValue?: string;
  maxValue?: string;
  minValue?: string;
}

export const CommonFormDateSelect: React.FC<CommonFormDateSelectProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  disabled,
  onChange,
  labelSide,
  defaultValue,
  maxValue,
  minValue,
}) => {
  return (
    <div className={"flex flex-1 " + (labelSide ? "flex-row items-center space-x-2" : "flex-col")}>
      <CommonLabel id={id} title={title} required={required} tooltip={tooltip} />
      <CommonDateSelect
        id={id}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
        disabled={disabled}
      />
    </div>
  );
};

interface CommonDateTimeSelectProps {
  id: string;
  disabled?: boolean;
  tabIndex?: number;
  defaultValue?: string;
}

export const CommonDateTimeSelect: React.FC<CommonDateTimeSelectProps> = ({
  id,
  disabled,
  tabIndex,
  defaultValue,
}) => {
  return (
    <input
      type="datetime-local"
      name={id}
      id={id}
      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
      defaultValue={defaultValue}
      tabIndex={tabIndex}
      disabled={disabled}
    />
  );
};
interface CommonDateSelectProps {
  id: string;
  value?: string;
  disabled?: boolean;
  tabIndex?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  maxValue?: string;
  minValue?: string;
}

export const CommonDateSelect: React.FC<CommonDateSelectProps> = ({
  id,
  value,
  disabled,
  tabIndex,
  onChange,
  defaultValue,
  maxValue,
  minValue,
}) => {
  return (
    <input
      type="date"
      name={id}
      id={id}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 sm:text-sm"
      defaultValue={defaultValue}
      value={value}
      min={minValue}
      max={maxValue}
      tabIndex={tabIndex}
      disabled={disabled}
    />
  );
};

