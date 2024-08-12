'use client';
import Advertisements from "@/app/components/advertisments";
import Announcements from "@/app/components/announcement/annoucements";
import RecentlyAccessedCourses from "@/app/components/RecentlyAccessedCourses";
import UsersOnline from "@/app/components/usersOnline";


export default function Home() {
  return (
    <div className="bg-white container mx-auto top-20 pt-20 text-[color:var(--mainTitleLightColor)]">
      
        <div className="flex flex-col w-full justify-start items-start gap-y-2">
        <div className=" w-full col-span-1 md:col-span-2 lg:col-span-1">
          <Announcements />
        </div>
        <div className="w-full">


      </div>
      </div>
      <div className="grid grid-cols-5 justify-between items-center gap-y-2">
      <div className="w-full md:col-span-4 ">
          <RecentlyAccessedCourses />
        </div>
        <div className="col-span-1 md:col-span-1 ">
          <UsersOnline />
        </div>

        </div>
        

      
      <div className="">
          <Advertisements />
        </div>
      
    </div>
  );
}
