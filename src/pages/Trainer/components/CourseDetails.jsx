import React, { useState, useRef } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import up from "../assets/upload.png";
import RegisterForm from "./RegisterForm";
import { toast } from "react-toastify";

const {
  VITE_AWS_REGION: region,
  VITE_AWS_ACCESS_KEY_ID: accessKeyId,
  VITE_AWS_SECRET_ACCESS_KEY: secretAccessKey,
  VITE_AWS_BUCKET_NAME: bucketName,
  VITE_AWS_THUMBNAILS: thumbnail_dir,
} = import.meta.env;

function CourseDetails({ setMainDetails, values, typeEditable = true }) {
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  const fileRef = useRef();

  const openFileSelector = () => {
    fileRef.current.click();
  };

  const handleChooseFile = (event) => {
    setSelectedThumbnail(event.target.files[0]);
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
      Key: `${thumbnail_dir}/thmb-${Date.now()}-${selectedThumbnail.name}`,
      Body: selectedThumbnail,
    };

    const upload = new Upload({
      client: s3,
      params,
    });

    const { Location } = await upload.done();
    return Location;
  };

  const newSetMainDetails = async (data) => {
    try {
      if (!selectedThumbnail && !values.image)
        return alert("Please select a thumbnail");

      if (!values && selectedThumbnail) {
        const thumbnail = await handleUpload();
        setMainDetails({ ...data, image: thumbnail });
      } else {
        setMainDetails({ ...data, image: values.image });
      }

      toast.success("Course details saved successfully");
    } catch (er) {
      toast.error("Something went wrong while saving course details");
    }
  };

  return (
    <div className="bg-white rounded-2xl mb-4 p-2 lg:p-4 px-4 lg:px-12 ">
      <h1 className="text-4xl font-semibold">Course Details</h1>
      <div className="w-full flex flex-col lg:flex-row my-10">
        <div className=" h-full flex flex-col justify-center items-center space-y-4 lg:space-y-2 mb-10">
          <img
            src={
              selectedThumbnail
                ? URL.createObjectURL(selectedThumbnail)
                : values && values.image
                ? values.image
                : up
            }
            alt="upload"
            className="bg-[#E4E4E4] rounded-xl w-full h-full"
          />
          <div className="">
            <button
              onClick={openFileSelector}
              className="bg-[#C6FFB8] rounded-full  lg:mt-0 py-2 px-4 text-sm font-semibold cursor-pointer hover:bg-[#8CF772]"
            >
              Browse Thumbnails
            </button>
            <input
              type="file"
              onChange={handleChooseFile}
              ref={fileRef}
              className="hidden"
            />
          </div>
        </div>
        <div className="ml-0 lg:ml-6 w-full flex flex-col justify-start">
          <RegisterForm
            setMainDetails={newSetMainDetails}
            values={values}
            typeEditable={typeEditable}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
