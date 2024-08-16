import { CommonFormDateTimeSelect, CommonFormSelect, CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import { FC, useEffect, useState } from 'react';
import { Categories } from './category/creatCategory';


interface AddCourseProps {
  onClose: () => void;

  loading: boolean;
  showError: boolean;
  errorText: string;
}

const AddCourse: React.FC<AddCourseProps> = ({ onClose, loading, showError, errorText }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    CourseCategoryId: '',
    StartDate: '',
    EndDate: '',
    ProfilePicture: null as File | null,
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
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: files ? files[0] : null, // Handle file selection
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'StartDate' | 'EndDate') => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: e.target.value,
    }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrorMessage('');
      setShowLoader(true);

      let requestBody: FormData | string;
      let headers: { 'Content-Type'?: string } = {};

      if (formData.ProfilePicture) {
        const formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formDataObject.append(key, value as string | Blob);
          }
        });
        requestBody = formDataObject;
      } else {
        requestBody = JSON.stringify({
          ...formData,
          StartDate: new Date(formData.StartDate).toISOString(),
          EndDate: new Date(formData.EndDate).toISOString(),
        });
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch('http://localhost:5116/api/Course', {
        method: 'POST',
        headers: headers,
        body: requestBody,
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
          required={true}
        />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput
          id="description"
          title="Course Description"
          required={true}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormSelect
          id="CourseCategoryId"
          title="Course Category"
          value={formData.CourseCategoryId}
          onChange={handleChange}
          required={true}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </CommonFormSelect>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="ProfilePicture" className="block text-sm font-medium text-[color:var(--mainTitleLightColor)]">
          Profile Picture
        </label>
        <input
          type="file"
          id="ProfilePicture"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-[color:var(--textColor)]
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border file:border-gray-300
          file:bg-gray-50 file:text-sm
          hover:file:bg-gray-100"
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormDateTimeSelect
          id="StartDate"
          title="Start Date"
          defaultValue={formData.StartDate}
          onChange={(e) => handleDateChange(e, 'StartDate')}
          required={true}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <CommonFormDateTimeSelect
          id="EndDate"
          title="End Date"
          defaultValue={formData.EndDate}
          onChange={(e) => handleDateChange(e, 'EndDate')}
          required={true}
        />
      </div>

    </CommonCreateEditSlideover>
  );
};



export default AddCourse;
