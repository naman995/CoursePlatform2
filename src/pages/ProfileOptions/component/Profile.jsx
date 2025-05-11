import React, { useState, useRef } from "react";
import EditProfileButton from "./EditProfileButton";
import { AiFillCamera } from "react-icons/ai";
import PurchaseHistory from "./PurchaseHistory";
import ProfileModel from "./ProfileModel";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/apis/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../../../apis/user";
import useAccountType from "@/hooks/useAccountType";

const {
  VITE_AWS_REGION: region,
  VITE_AWS_ACCESS_KEY_ID: accessKeyId,
  VITE_AWS_SECRET_ACCESS_KEY: secretAccessKey,
  VITE_AWS_BUCKET_NAME: bucketName,
  VITE_AWS_PROFILE_PICTURES: pictures_dir,
} = import.meta.env;

const Profile = () => {
  const [displayProfileModel, setdisplayProfileModel] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState("");
  const { acType } = useAccountType();

  const fileRef = useRef();

  const openFileSelector = () => {
    fileRef.current.click();
  };

  const getCurrentUserID = () => {
    const { _id } = JSON.parse(localStorage.getItem("current-user"));
    return _id;
  };

  const getPictureExtension = () => {
    const extension = selectedPicture.name.split(".").pop();
    return extension;
  };

  const handleUpload = async () => {
    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const params = {
      Bucket: bucketName,
      Key: `${pictures_dir}/dp-${getCurrentUserID()}.${getPictureExtension()}`,
      Body: selectedPicture,
    };

    const upload = new Upload({
      client: s3,
      params,
    });

    const { Location } = await upload.done();
    return Location;
  };

  const handleChooseFile = async (event) => {
    setSelectedPicture(event.target.files[0]);
    // const location = await handleUpload();
    toast.success("Profile Picture Updated");
  };

  useEffect(() => {
    (async () => {
      if (selectedPicture) {
        const location = await handleUpload();
        await updateProfile({
          profile_picture: location,
        });

        //update the local storage current user
        const user = JSON.parse(localStorage.getItem("current-user"));
        user.profile_picture = location;
        localStorage.setItem("current-user", JSON.stringify(user));
      }
    })();
  }, [selectedPicture]);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
    })();
  }, []);

  return (
    <div>
      <div className="px-6 lg:px-20 mt-28 lg:mt-10  w-full  ">
        <h1 className="text-2xl font-[600] text-[#232323]">My Profile</h1>
        <div className="flex lg:flex-row flex-col justify-between mt-10 lg:mt-6 items-center">
          <div className="flex lg:flex-row flex-col">
            <button
              onClick={openFileSelector}
              className="flex lg:flex-row flex-col"
            >
              <img
                className=" lg:h-20 max-h-20 max-w-20 w-20 p-[2px] border rounded-full border-[#4D5EDC]"
                src={
                  selectedPicture
                    ? URL.createObjectURL(selectedPicture)
                    : JSON.parse(localStorage.getItem("current-user"))
                        .profile_picture
                }
                alt="Profile Picture"
                title="Change Profile Picture"
              />
              <AiFillCamera
                className="text-[#4D5EDC] bg-[#EFF1F6] rounded-full border border-[#4D5EDC] p-1 relative lg:-left-5 lg:top-12 -top-10 left-[80%]"
                size={24}
              />
            </button>
            <input
              type="file"
              onChange={handleChooseFile}
              ref={fileRef}
              className="hidden"
            />
            <div className="flex flex-col text-center lg:text-left">
              <h1 className="text-2xl font-[600]">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-[#9E9E9E] font-[500] lowercase">
                {user?.email}
              </p>
              {/* <p className="text-[#9E9E9E] font-[500]">{user?.phone}</p> */}
            </div>
          </div>
          {/* <div className="mt-4 lg:mt-0">
            <EditProfileButton onClick={handleModel} text={"Edit Profile"} />
          </div> */}
        </div>
        {/* Personal Informations */}
        <div className="mt-5 text-xl ">
          <p className="font-[600]">Personal Info </p>
          <div className="flex flex-row space-x-4">
            <div>
              <p className="text-[12px] text-[#4D5EDC]">First Name</p>
              <p className=" w-[270px] lg:w-[510px] h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 flex items-center  ">
                {" "}
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#4D5EDC]">Last Name</p>
              <p className=" w-[270px] lg:w-[510px] h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 flex items-center  ">
                {" "}
                {user?.lastName}
              </p>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col">
            <div className="">
              <p className="text-[12px] text-[#4D5EDC]">Email Address</p>
              <p className="w-[270px] lg:w-[250px] h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3  flex items-center lowercase">
                {" "}
                {user?.email}{" "}
              </p>
            </div>
            {/* <div className=" lg:ml-3">
              <p className="text-[12px] text-[#4D5EDC]">Phone Number</p>
              <p
                className=" w-[270px] lg:w-[250px] h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 flex items-center "
                placeholder="89392xx9173"
                type="number"
              >
                {" "}
                989764774{" "}
              </p>
            </div> */}
          </div>
        </div>
        <div>
          {/* <h1 className="text-2xl font-[600] mt-5">My Courses</h1> */}
          {/* <TrendingCoursePraticeSet
            courses={courses.trendingCourses}
            
          /> */}
        </div>
        {acType === "student" && (
          <div className="lg:w-auto overflow-x-auto">
            <PurchaseHistory />
          </div>
        )}
      </div>
      {displayProfileModel && (
        <div className="z-40 mx-auto flex items-center justify-center top-0 lg:w-auto w-[200px] ">
          <ProfileModel />
        </div>
      )}
    </div>
  );
};

export default Profile;
