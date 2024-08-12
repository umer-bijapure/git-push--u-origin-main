import { CommonFormSelect, CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { FC } from 'react';


interface AddCourseProps {
  onClose: () => void;
   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showError: boolean;
  errorText: string;
}

const AddCourse: FC<AddCourseProps> = ({ onClose, handleSubmit, loading, showError, errorText }) => {
  return (
    <CommonCreateEditSlideover
      title="Create New Course"
      description="Create a new course in the system."
      handleSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="col-span-6">
        <CommonFormTextInput id="course_name" title="Course Name" required={true} />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput id="course_description" title="Course Description" required={true} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormSelect id="course_category" title="Course Category" required={true}>
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>


        </CommonFormSelect>
      </div>
      {/* Add other form fields as necessary */}
    </CommonCreateEditSlideover>
  );
};

export default AddCourse;
