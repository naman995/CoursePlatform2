import React from "react";
import { Field, useFormik, FormikProvider } from "formik";

import CoustomSelect from "./CoustomSelect";

const skill = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const categories = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "it-and-software", label: "IT & Software" },
  { value: "personal-development", label: "Personal Development" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
  { value: "business", label: "Business" },
];

function RegisterForm({ setMainDetails, values, typeEditable = true }) {
  const validate = (values) => {
    const errors = {};

    if (!values.category) {
      errors.category = "Required";
    }

    if (!values.skill) {
      errors.skill = "Required";
    }

    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    } else if (values.description.split(" ").length > 300) {
      errors.description = "Maximum of 300 words allowed";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      category: values?.category || "",
      skill: values?.skill || "",
      title: values?.title || "",
      description: values?.description?.short || "",
      type: values?.type || "",
    },
    validate,
    onSubmit: setMainDetails,
  });

  return (
    <FormikProvider value={formik}>
      <div className=" lg:px-4 w-full ">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2">
              <div className="flex flex-col mb-4 lg:mb-0 space-y-2 w-full lg:w-1/2 ">
                {/* <Field
                  as={CoustomSelect}
                  name="category"
                  options={categories}
                  placeholder="Select Course Category"
                /> */}
                <CoustomSelect
                  name="category"
                  options={categories}
                  placeholder="Select Course Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                />
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.category}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col  lg:space-y-2 w-full lg:w-1/2">
                <CoustomSelect
                  name="skill"
                  options={skill}
                  placeholder="Select Skill Level"
                  value={formik.values.skill}
                  onChange={formik.handleChange}
                />
                {formik.touched.skill && formik.errors.skill ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.skill}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="border-2 border-gray-300 bg-white rounded-lg p-2 py-3 shadow-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter the main title of course"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col space-y-2">
              <textarea
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="resize-none border-2 border-gray-300 bg-white rounded-lg p-2 py-3 shadow-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter description for course"
                rows="6"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              ) : null}
              <div>
                {typeEditable ? (
                  <CoustomSelect
                    name="type"
                    options={[
                      { value: "ONLINE_TRAINING", label: "Video Based" },
                      { value: "LIVE_TRAINING", label: "Live Classes" },
                    ]}
                    placeholder="Select Course Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  />
                ) : (
                  <div
                    className="flex flex-col space-y-2 border border-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
                    title="Course type cannot be changed once created"
                  >
                    <p>
                      {formik.values.type === "ONLINE_TRAINING" ? (
                        <span>Video Based</span>
                      ) : (
                        <span>Live Classes</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}

export default RegisterForm;
