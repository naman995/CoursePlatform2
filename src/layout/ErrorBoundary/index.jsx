import ErrorContext from "@/context/ErrorContext";

import Warning from "@/components/Errors/Warning";
import Success from "@/components/Errors/Success";
import Error from "@/components/Errors/Error";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorBoundary = ({ children }) => {
  try {
    // const throwError = (err, type) => {
    //   // let e = {
    //   //   id: Math.floor(Math.random() * 100),
    //   //   message: err,
    //   //   type,
    //   // };

    //   // setErrors([...errors, e]);
    //   toast(err, {
    //     type: type,
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //   });
    // };

    return (
      <ErrorContext.Provider value={{}}>
        <div className="h-full w-full">
          <div className="flex-col absolute top-0 right-0 py-6 px-6 z-50 space-y-3 overflow-y-auto overflow-x-hidden max-h-full">
            {/* {errors?.length > 0 &&
              errors.map((error, index) => (
                <div key={index}>
                  {error.type === "WARN" && (
                    <Warning
                      key={index}
                      id={error.id}
                      message={error.message}
                      removeError={removeError}
                    />
                  )}
                  {error.type === "SUCCESS" && (
                    <Success
                      key={index}
                      id={error.id}
                      message={error.message}
                      removeError={removeError}
                    />
                  )}
                  {error.type === "ERROR" && (
                    <Error
                      key={index}
                      id={error.id}
                      message={error.message}
                      removeError={removeError}
                    />
                  )}
                </div>
              ))} */}
            <ToastContainer />
          </div>
          {children}
        </div>
      </ErrorContext.Provider>
    );
  } catch (er) {
    console.log(er);
  }
};

export default ErrorBoundary;
