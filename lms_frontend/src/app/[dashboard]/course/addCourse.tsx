import { CommonFormSelect, CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { FC, useEffect, useState } from 'react';
import { Categories } from './category/creatCategory';


interface AddCourseProps {
  onClose: () => void;
   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showError: boolean;
  errorText: string;
}

const AddCourse: React.FC<AddCourseProps> = ({ onClose, handleSubmit, loading, showError, errorText }) => {
  const [formData, setFormData] = useState({

    CourseCategoryId: '' // Store selected category ID here
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setShowLoader(true);
      try {
        const response = await fetch('http://localhost:5116/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data: Categories[] = await response.json();
        setCategories(data);
      } catch (error: any) {
        setErrorMessage(error.message || 'Error fetching categories');
      } finally {
        setShowLoader(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrorMessage('');
      setShowLoader(true);

      const response = await fetch('http://localhost:5116/api/Courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful course creation
      } else {
        setErrorMessage('Failed to create course');
      }
    } catch (error) {
      setErrorMessage('Error creating course');
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <CommonCreateEditSlideover
      title="Create New Course"
      description="Create a new course in the system."
      handleSubmit={formSubmitHandler}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="col-span-6">
        <CommonFormTextInput 
        id="title" 
        title="Course Name" 
        onChange={handleChange}
        required={true} />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput id="description" title="Course Description" required={true} onChange={handleChange} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormSelect 
        id="CourseCategoryId" 
        title="Course Category"
        value={formData.CourseCategoryId} 
        onChange={handleChange}
        required={true}>
        <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}

        </CommonFormSelect>
      </div>
      {/* Add other form fields as necessary */}
    </CommonCreateEditSlideover>
  );
};

export default AddCourse;
