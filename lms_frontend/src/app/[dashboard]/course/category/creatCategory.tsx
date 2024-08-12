import { CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { FC } from 'react';


interface AddCourseCategoryProps {
  onClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showError: boolean;
  errorText: string;
}

const AddCourseCategory: FC<AddCourseCategoryProps> = ({ onClose, handleSubmit, loading, showError, errorText }) => {
  return (
    <CommonCreateEditSlideover
      title="Create New Course Category"
      description="Create a new course category in the system."
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="col-span-6">
        <CommonFormTextInput id="category_name" title="Category Name" required={true} />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput id="category_description" title="Category Description" required={true} />
      </div>
    </CommonCreateEditSlideover>
  );
};

export default AddCourseCategory;
