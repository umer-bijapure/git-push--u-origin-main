// app/layout.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import VerticalNavBar from '../components/verticalNavigationbar';


interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [userRole, setUserRole] = useState<'student' | 'teacher' | 'manager' | 'admin' | null>(null);
  
    useEffect(() => {
      // Fetch user permissions from backend and set user role
      // For now, use dummy data
      const fetchUserRole = async () => {
        // Replace with your actual API call
        const data = { role: 'admin' }; // Dummy data
        setUserRole(data.role as 'student' | 'teacher' | 'manager' | 'admin');
      };
  
      fetchUserRole();
    }, []);
  
    return (
      <div className="flex">
        {userRole && <VerticalNavBar userRole={userRole} />}
        <main className={`flex-1 ${userRole ? 'ml-[120px] ' : ''} `}>
          {children}
        </main>
      </div>
    );
  };
  
  export default Layout;