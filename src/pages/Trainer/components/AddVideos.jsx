import React, { useReducer, useRef, useState } from "react";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { useFormik, FormikProvider } from "formik";

import EditRegister from "./EditRegister";
import Video from "./Video";

import { RiVideoUploadFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";

const {
  VITE_AWS_REGION: region,
  VITE_AWS_ACCESS_KEY_ID: accessKeyId,
  VITE_AWS_SECRET_ACCESS_KEY: secretAccessKey,
  VITE_AWS_BUCKET_NAME: bucketName,
} = import.meta.env;

function reducer(state, action) {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };
    case "SET_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_INDEXED_LOCATIONS":
      return { ...state, indexedLocations: action.payload };
    case "SET_IS_UPLOADED":
      return { ...state, isUploaded: action.payload };
    case "SET_UPLOAD_PERCENTAGE":
      return { ...state, uploadPercentage: action.payload };
    default:
      return state;
  }
}

function addIndexing(videos) {
  return videos.map((video, index) => ({ ...video, id: index + 1 }));
}

function AddVideos({ setVideos, courseType, values }) {
  const formik = useFormik({
    initialValues: {
      liveLink: values?.liveLink || "",
      liveTime: values?.liveTime || "",
    },
    onSubmit: setVideos,
  });

  const [defaultLength, setDefaultLength] = useState(
    window.location.href.split("/").at(-1) === "add"
      ? null
      : values?.content?.length
  );

  const [state, dispatch] = useReducer(reducer, {
    videos: (values && addIndexing(values?.content)) || [
      {
        id: 1,
        title: "",
        description: "",
        thumbnail: "",
      },
    ],
    selected: { id: 1, ...values?.content?.[0] } || {
      id: 1,
      title: "",
      description: "",
      thumbnail: "",
    },
    isUploaded: false,
    uploadPercentage: 0,
  });

  const videosToUpload = defaultLength
    ? state.videos.slice(defaultLength)
    : state.videos;

  const fileRef = useRef();

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  if (courseType === "ONLINE_TRAINING") {
    const openFileSelector = () => {
      fileRef.current.click();
    };

    const handleChooseFile = (event) => {
      dispatch({
        type: "SET_VIDEOS",
        payload: state.videos.map((video) =>
          video.id === state.selected.id
            ? {
                ...video,
                thumbnail: URL.createObjectURL(event.target.files[0]),
                file: event.target.files[0],
              }
            : video
        ),
      });

      dispatch({
        type: "SET_SELECTED",
        payload: {
          ...state.selected,
          thumbnail: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0],
        },
      });
    };

    const handleAddMore = () => {
      dispatch({
        type: "SET_VIDEOS",
        payload: [
          ...state.videos,
          {
            id: state.videos.length + 1,
            title: "",
            description: "",
            thumbnail: "",
          },
        ],
      });

      dispatch({
        type: "SET_SELECTED",
        payload: state.videos[state.videos.length - 1],
      });
    };

    const handleEdit = (id) => {
      dispatch({
        type: "SET_SELECTED",
        payload: state.videos.find((video) => video.id === id),
      });
    };

    const onEdit = ({ id, title, description }) => {
      const updatedVideos = state.videos.map((video) =>
        video.id === id ? { ...video, title, description } : video
      );

      dispatch({
        type: "SET_VIDEOS",
        payload: updatedVideos,
      });

      if (window.location.href.split("/").at(-1) === "edit") {
        setVideos(
          updatedVideos.map(({ id, title, description, videoUrl }) => ({
            id,
            title,
            description,
            videoUrl,
          }))
        );
      }

      toast.success("Video updated");
    };

    const handleUpload = async () => {
      const promises = videosToUpload.map(async ({ file }, index) => {
        // const numFiles = state.videos.length;
        const params = {
          Bucket: bucketName,
          Key: `${Date.now()}.${file?.name}`,
          Body: file,
          //mime type
          ContentType: "video/mp4",
          mimeType: "video/mp4",
        };

        const upload = new Upload({
          client: s3,
          params,
        });

        upload.on("httpUploadProgress", (progress) => {
          const percentage = Math.round(
            (progress.loaded / progress.total) * 100
          );
          dispatch({
            type: "SET_UPLOAD_PERCENTAGE",
            payload: percentage,
          });
        });

        const { Location } = await upload.done();
        return Location;
      });

      const uploadedLocations = await Promise.all(promises);

      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        }),
        {
          pending: `Uploading videos`,
          success: `Videos uploaded`,
          error: `Upload failed`,
        }
      );

      dispatch({
        type: "SET_IS_UPLOADED",
        payload: true,
      });

      console.log(
        uploadedLocations.length === videosToUpload.length,
        window.location.href.split("/").at(-1) === "edit"
      );

      if (
        uploadedLocations.length === videosToUpload.length ||
        window.location.href.split("/").at(-1) === "edit"
      ) {
        prepareDataToSubmit(uploadedLocations);
      }
    };

    const prepareDataToSubmit = async (uploadedLocations) => {
      const data = videosToUpload.map(async (video, index) => ({
        title: video.title,
        description: video.description,
        duration: await getVideoDuration(index),
        videoUrl: uploadedLocations[index],
      }));
      const finalData = await Promise.all(data);

      if (window.location.href.split("/").at(-1) === "edit") {
        setVideos([...values?.content, ...finalData]);
      } else {
        console.log("finalData", finalData);
        setVideos(finalData);
      }
    };

    const getVideoDuration = async (index) => {
      const video = document.createElement("video");
      video.src = videosToUpload[index].thumbnail;

      await new Promise((resolve) => {
        video.addEventListener("loadedmetadata", resolve);
      });

      const duration = video.duration;
      video.remove();

      return duration;
    };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this video?")) {
        dispatch({
          type: "SET_VIDEOS",
          payload: state.videos.filter((video) => video.id !== id),
        });

        if (state.selected.id === id) {
          dispatch({
            type: "SET_SELECTED",
            payload: state.videos[id - 1],
          });
        }
      }
    };

    return (
      <div className="bg-white rounded-2xl mb-4 pb-4">
        <div className="p-6 lg:pl-8 flex flex-col lg:flex-row lg:space-x-10">
          <div>
            <h1 className="font-semibold text-black text-3xl pb-5 mb-5 ">
              Add Videos
            </h1>
            {state.videos.length > 0 && (
              <div className="h-48  mb-2 lg:w-[360px] rounded-2xl   max-w-screen-lg flex flex-col justify-center items-center">
                {state.selected &&
                (state.selected.thumbnail || state.selected.videoUrl) ? (
                  <>
                    {/* <p>{JSON.stringify(state.selected.thumbnail)}</p> */}
                    <video
                      class="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                      controls
                    >
                      <source
                        src={
                          state.selected.thumbnail
                            ? state.selected.thumbnail
                            : state.selected.videoUrl
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </>
                ) : (
                  <RiVideoUploadFill className="text-4xl text-white" />
                )}
                <button
                  onClick={openFileSelector}
                  className="bg-gray-100 rounded p-2"
                >
                  Choose a video to upload
                </button>
                <input
                  type="file"
                  onChange={handleChooseFile}
                  ref={fileRef}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <EditRegister
            selected={state.selected}
            onEdit={onEdit}
            isUploaded={state.isUploaded}
          />
        </div>
        <div className="flex space-x-3 ml-10">
          {state.videos.length > 0 &&
            state.videos.map((_, index) => (
              <Video
                serial={index + 1}
                onEdit={handleEdit}
                onDelete={handleDelete}
                key={index}
                isSelected={
                  state.selected && state.selected.id === state.videos[index].id
                }
                isUploaded={state.isUploaded}
                thumbnail={
                  state.videos[index].thumbnail || state.videos[index].videoUrl
                }
              />
            ))}
          {!state.isUploaded && (
            <div className="flex flex-col justify-center items-center space-y-2 hover:bg-gray-100 rounded-xl">
              <button
                onClick={handleAddMore}
                className="rounded-full py-2 px-4 text-sm font-semibold cursor-pointer flex flex-col items-center"
              >
                <MdAddBox className="text-4xl text-[#42AB60]" />
                Add More
              </button>
            </div>
          )}
        </div>
        <div className="w-full px-12 flex flex-row-reverse">
          <button
            className="bg-[#4D5EDC] text-white rounded p-2 px-4 hover:bg-[#3B4BB8] flex flex-row items-center space-x-2"
            onClick={handleUpload}
            disabled={state.uploadPercentage > 0 || state.isUploaded}
          >
            {!state.isUploaded && state.uploadPercentage > 0 ? (
              <span>Uploading {state.uploadPercentage}%</span>
            ) : (
              <>
                {state.isUploaded ? <span>Uploaded</span> : <span>Upload</span>}
              </>
            )}

            {state.isUploaded && (
              <span>
                <AiOutlineCheck />
              </span>
            )}
          </button>
        </div>
      </div>
    );
  } else if (courseType === "LIVE_TRAINING") {
    return (
      <FormikProvider value={formik}>
        <div className="bg-white rounded-2xl mb-4 pb-4">
          <div className="p-6 lg:pl-8 flex flex-col">
            <div>
              <h1 className="font-semibold text-black text-3xl pb-5 mb-5 ">
                Live Class
              </h1>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-[400px]">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-2">
                  <p>Live class link</p>
                  <input
                    type="text"
                    name="liveLink"
                    id="liveLink"
                    placeholder="Enter live link"
                    className="border border-gray-200 rounded-lg p-2"
                    onChange={formik.handleChange}
                    value={formik.values.liveLink}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 hover:bg-blue-700 w-40"
                  >
                    Save
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <p>Date and Time</p>
                  <input
                    type="datetime-local"
                    name="liveTime"
                    id="liveTime"
                    placeholder="Enter live time"
                    className="border border-gray-200 rounded-lg p-2"
                    onChange={formik.handleChange}
                    value={formik.values.liveTime}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
    );
  }
}

export default AddVideos;
