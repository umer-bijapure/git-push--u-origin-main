import { FC, FormEvent, ReactNode } from 'react';
import { CommonButtonSolidBlue, CommonButtonText } from './buttons';
import { CommonAlert, SuccessNotification } from './notifications';


interface CommonCreateEditSlideoverProps {
  title: string;
  description?: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  showError?: boolean;
  errorText?: string;
  width?: string;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  showSuccess?:boolean;
  successtext?:string;
}

export const CommonCreateEditSlideover: FC<CommonCreateEditSlideoverProps> = ({
  title,
  description,
  handleSubmit,
  onClose,
  showError,
  errorText,
  width,
  children,
  loading,
  disabled,
  showSuccess,
  successtext
}) => {
  return (
    <CommonSlideover
      title={title}
      description={description}
      handleSubmit={handleSubmit}
      onClose={onClose}
      showError={showError}
      errorText={errorText}
      showSuccess={showSuccess}
      successText={successtext}
      width={width || 'w-3/4'}
    >
      <CommonSlideoverContentContainer>{children}</CommonSlideoverContentContainer>
      <CommonSlideoverButtonContainer>
        <CommonButtonSolidBlue type="submit" loading={loading} text="Save" hidden={disabled} />
        <CommonButtonText type="button" onClick={onClose} text="Close" hidden={loading} />
      </CommonSlideoverButtonContainer>
    </CommonSlideover>
  );
};




interface CommonSlideoverContentContainerProps {
    children: ReactNode;
  }
  
  const CommonSlideoverContentContainer: FC<CommonSlideoverContentContainerProps> = ({ children }) => {
    return (
      <div className="grid flex-1 grid-cols-6 content-start gap-x-4 gap-y-2 overflow-y-auto px-6 py-4">
        {children}
      </div>
    );
  };

  interface CommonSlideoverButtonContainerProps {
    children: ReactNode;
  }
  
  const CommonSlideoverButtonContainer: FC<CommonSlideoverButtonContainerProps> = ({ children }) => {
    return (
      <div className="flex flex-row-reverse justify-start space-x-2 rounded-b-xl border-t border-gray-200 py-4 px-6">
        {children}
      </div>
    );
  };
  

  
  interface CommonSlideoverProps {
    onClose: () => void;
    width?: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    title: string;
    description?: string;
    showError?: boolean;
    errorText?: string;
    showSuccess?:boolean;
    successText?:string;
    children: ReactNode;
  }
  
export  const CommonSlideover: FC<CommonSlideoverProps> = ({
    onClose,
    width = 'w-3/4',
    handleSubmit,
    title,
    description,
    errorText,
    showError,
    showSuccess,
    successText,
    children,
  }) => {
    return (
      <div className="fixed left-0 top-0 z-10 flex h-screen w-screen overflow-hidden">
        <button
          className="z-0 h-screen flex-1 bg-gray-900 opacity-60"
          onClick={onClose}
          aria-label="Close Slideover"
        ></button>
        <form
          className={`z-10 flex flex-col overflow-hidden bg-white ${width}`}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start justify-center space-y-1 border-b border-gray-200 px-6 py-3">
            <h2 className="select-none text-center text-lg font-semibold text-[color:var(--mainTitleLightColor)]">{title}</h2>
            {description && (
              <div className="select-none text-sm text-[color:var(--textColor)]">{description}</div>
            )}
          </div>
          <div className="flex w-full">
            
            {/* <LoginBannerRed show={showError}>{errorText}</LoginBannerRed> */}
            {   (showError && errorText )?
              (
                <div>
                  <CommonAlert message={errorText} type="error" />
                </div>
              )
              : (showSuccess && successText)?
              (
                <div>
                  <SuccessNotification message={successText} />
                </div>
              )
              :''
            }
          </div>
          {children}
        </form>
      </div>
    );
  };
  

  
