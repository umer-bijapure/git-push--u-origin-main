import { CommonButton } from '@/app/components/common/buttons';
import { Collapsible, CollapsibleItem, EditCollapsible } from '@/app/components/common/collapsible';
import { CommonFormTextInput } from '@/app/components/common/inputs';
import { CommonCreateEditSlideover } from '@/app/components/common/slideovers';
import React, { FC, useState, useEffect } from 'react';

import { FaEdit, FaPen, FaPenAlt, FaTrash } from 'react-icons/fa';

export interface Categories {
  id: number;
  name: string;
  description: string;
  subcourses?: Categories[]; // Assuming categories can have subcourses
}

interface AddCourseCategoryProps {
  onClose: () => void;
  loading: boolean;
  showError: boolean;
  errorText: string;
}


const AddCourseCategory: FC<AddCourseCategoryProps> = ({ onClose, loading, showError, errorText }) => {
  const [formData, setFormData] = useState({ Name: '', Description: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [viewCategories, setViewCategories] = useState(false);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('http://localhost:5116/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data]);
        setFormData({ Name: '', Description: '' });
      } else {
        setErrorMessage('Failed to create category');
      }
    } catch (error) {
      setErrorMessage('Error creating category');
    } finally {
      setShowLoader(false);
    }
  };

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
      } catch (error) {
        setErrorMessage('Error fetching categories');
      } finally {
        setShowLoader(false);
      }
    };
    fetchCategories();
  }, []);

  const handleEditCategory = (id: number) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5116/api/category/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleSaveCategory = async (id: number) => {
    const updatedCategory = categories.find((cat) => cat.id === id);
    if (!updatedCategory) return;

    try {
      const response = await fetch(`http://localhost:5116/api/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response.ok) {
        setEditMode((prev) => ({ ...prev, [id]: false }));
      } else {
        console.error('Failed to save category');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  return (
    <CommonCreateEditSlideover
      title="Create New Course Category"
      description="Create a new course category in the system."
      handleSubmit={formSubmitHandler}
      onClose={onClose}
      loading={loading}
      showError={showError}
      errorText={errorText}
    >
      <div className="flex justify-end col-span-6">
        <CommonButton text="See All Categories" onClick={() => setViewCategories(true)} />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput
          id="Name"
          title="Category Name"
          required={true}
          value={formData.Name}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-6">
        <CommonFormTextInput
          id="Description"
          title="Category Description"
          required={true}
          value={formData.Description}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-6">
        { viewCategories &&
      <h1 className='text-[color:var(--primaryColor)] text-lg font-medium p-2'>All Categories</h1>}
        {viewCategories && categories.map((category) => (
          
          <div key={category.id} className="category-item w-full mb-4">
            
            <div className="hover:shadow-md rounded-xl border border-2 border-[color:var(--primaryLight)]">
              <div className="flex justify-between items-center">
                <div className='p-2'>
                  {editMode[category.id] ? (
                    <>
                      <CommonFormTextInput
                        id="editName"
                        title="Edit Category Name"
                        value={category.name}
                        onChange={(e) =>
                          setCategories(categories.map((cat) =>
                            cat.id === category.id ? { ...cat, name: e.target.value } : cat
                          ))
                        }
                      />
                      <CommonFormTextInput
                        id="editDescription"
                        title="Edit Category Description"
                        value={category.description}
                        onChange={(e) =>
                          setCategories(categories.map((cat) =>
                            cat.id === category.id ? { ...cat, description: e.target.value } : cat
                          ))
                        }
                      />
                    </>
                  ) : (
                    <>
                      <h1 className="text-lg font-medium text-[color:var(--mainTitleLightColor)]">{category.name}</h1>
                      <p className="text-[color:var(--textColor)]">{category.description}</p>
                    </>
                  )}
                </div>
                <div className=' bg-[color:var(--primaryLight)] rounded-tr-md rounded-br-md p-4'>
                  {editMode[category.id] ? (
                    <>
                    <CommonButton text="Save" onClick={() => handleSaveCategory(category.id)} />
                    <CommonButton text="Cancel" onClick={() => setEditMode((prev) => ({ ...prev, [category.id]: false }))} />
                    </>
                  ) : (
                    <>
                    <div className='p-2 m-2 rounded-lg shadow-2 text-[color:var(--mainTitleLightColor)] hover:bg-white hover:shadow-mg'>
                      <FaPen onClick={() => handleEditCategory(category.id)} className="cursor-pointer" />
                    </div>
                    <div className='p-2 m-2 rounded-lg shadow-2 text-[color:var(--primaryPink)] hover:bg-white hover:shadow-mg'>
                      <FaTrash onClick={() => handleDeleteCategory(category.id)} className="cursor-pointer" />
                    </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CommonCreateEditSlideover>
  );
};

export default AddCourseCategory;


