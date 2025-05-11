import React from "react";
import { useFormik } from "formik";

function EditRegister({ selected, onEdit, isUploaded }) {
  const validate = (values) => {
    const errors = {};

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

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      id: selected.id,
    };
    onEdit(newValues);
  };

  const [initialValues, setInitialValues] = React.useState({
    title: (selected?.title?.length > 0 && selected?.title) || "",
    description:
      (selected?.description?.length > 0 && selected?.description) || "",
  });

  React.useEffect(() => {
    console.log(selected);
    setInitialValues({
      title: (selected?.title?.length > 0 && selected?.title) || "",
      description:
        (selected?.description?.length > 0 && selected?.description) || "",
    });
  }, [selected]);

  const formik = useFormik({
    initialValues,
    validate,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  // console.log(selected);

  return (
    <div className="lg:mt-[53px] ml-0 lg:ml-4">
      <form onSubmit={formik.handleSubmit} className="lg:w-[560px]">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the main title of the Course"
              className="appearance-none font-semibold block w-full text-black  border-gray-300 border-2 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-[8px] -my-3">
                {formik.errors.title}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 -mt-3">
          <div className="w-full px-3">
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Course Description (maximum of 300 words)"
              maxLength={300}
              rows={5}
              className="resize-none appearance-none block font-semibold w-full text-black  border-gray-300 border-2 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            {formik.errors.description ? (
              <div className="text-red-500 text-[8px] -my-3">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
        </div>
        {!isUploaded && (
          <div className="">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditRegister;
