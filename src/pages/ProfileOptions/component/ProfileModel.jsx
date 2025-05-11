import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiFillCamera } from "react-icons/ai";
import profile from "@/assets/Home/profile.png";
import SaveModel from "./SaveModel";
import Button from "./Button";


const ProfileModel = () => {

    const [displaySaveModel, setdisplaySaveModel] = useState(false);

    const handleSaveModel = () => {
        setdisplaySaveModel(!displaySaveModel)
    }

    const validate = Yup.object({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name must be less than 50 characters')
            .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces')
            .required('First name is required'),
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, "Phone number must be a valid number")
            .min(6, "Phone number must be at least 6 digits")
            .max(15, "Phone number must be at most 15 digits")
            .required("Phone number is required"),
        years: Yup.number()
            .typeError("Years must be a valid number")
            .integer("Years must be an integer")
            .min(0, "Years must be a positive number")
            .max(100, "Years must be at most 100")
            .required("Years is required"),
    });
    return (

        <div className=" absolute top-1/4 p-2 grid place-content-center  backdrop-blur-md bg-gray-100 rounded-2xl w-[300px] lg:w-auto">
            <div className="h-auto pb-4 lg:w-[500px] bg-[#FFFFFF] rounded-[20px] ">
                <h1 className="text-center font-[600] text-2xl mt-2">Edit Your Profile</h1>
                <p className="text-sm text-center mx-10 ">Please enter your Details To Edit Your Profile</p>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",

                    }}
                    validationSchema={validate}>
                    {(formik) => (
                        <div className="px-4 lg:px-20 w-full">
                            <div className="flex  mt-2 mx-auto items-center justify-center">
                                <div className="flex ">
                                    <img
                                        className="h-20 p-[2px] border rounded-full border-[#4D5EDC]"
                                        src={profile}
                                        alt=""
                                    />
                                    <AiFillCamera
                                        className="text-[#4D5EDC] bg-[#EFF1F6] rounded-full border border-[#4D5EDC] p-1 relative -left-5 top-12 "
                                        size={24}
                                    />

                                </div>

                            </div>
                            {/* Personal Informations */}
                            <div className="text-xl">
                                <Form>
                                    <p className="text-[12px] text-[#4D5EDC]">First Name</p>
                                    <input
                                        className=" w-full h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 placeholder:px-1 "
                                        placeholder="John Doe"
                                        type="text"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                    />
                                    {formik.touched.firstName ? (
                                        <div className="text-red-400 text-[14px] mb-5">
                                            {formik.errors.firstName}
                                        </div>
                                    ) : null}
                                    <div className="">
                                        <div className="">
                                            <p className="text-[12px] text-[#4D5EDC]">Email Address</p>
                                            <input
                                                className="w-full h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 placeholder:px-1 "
                                                placeholder="John@gmail.com"
                                                type="text"
                                                value={formik.values.email}
                                                onChange={formik.handleChange("email")}
                                                onBlur={formik.handleBlur("email")}
                                            />
                                            {formik.touched.email ? (
                                                <div className="text-red-400 text-[14px]  mb-5">
                                                    {formik.errors.email}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="">
                                            <p className="text-[12px] text-[#4D5EDC]">Phone Number</p>
                                            <input
                                                className="w-full h-12 rounded-[10px] border border-[#4D5EDC] outline-none px-3 placeholder:px-1 "
                                                placeholder="89392XX9173"
                                                type="number"
                                                value={formik.values.phoneNumber}
                                                onChange={formik.handleChange("phoneNumber")}
                                                onBlur={formik.handleBlur("phoneNumber")}
                                            />
                                            {formik.touched.phoneNumber ? (
                                                <div className="text-red-400 text-[14px] mb-5">
                                                    {formik.errors.phoneNumber}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
                <Button text={"Save Changes"} onClick={handleSaveModel} />
                {displaySaveModel && <SaveModel text={"  Your Changes Have Been \n saved Successfully!"} />}
            </div>
        </div>
    );
}

export default ProfileModel;


 