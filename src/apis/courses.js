import { axiosPrivate, axiosPublic } from './axios';
import axios from 'axios';
import { clearCart } from './cart';
import mappings from './currency_mappings';
import { toast } from "react-toastify";

const {
    VITE_EXCHANGE_RATE_API
} = import.meta.env

const requestedRates = []

const mockCourses = [
  {
    _id: "1",
    title: "Web Development Bootcamp",
    description: "Learn web development from scratch",
    price: {
      base: "USD",
      amt: 99.99,
      symbol: "$"
    },
    image: "/images/Home/CourseCard.png",
    category: "Web Development",
    overall_rating: 4.5,
    reviews: 120
  },
  {
    _id: "2",
    title: "React Masterclass",
    description: "Master React.js and build modern web applications",
    price: {
      base: "USD",
      amt: 79.99,
      symbol: "$"
    },
    image: "/images/Home/CourseCard.png",
    category: "Frontend Development",
    overall_rating: 4.8,
    reviews: 85
  },
  {
    _id: "3",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    price: {
      base: "USD",
      amt: 89.99,
      symbol: "$"
    },
    image: "/images/Home/CourseCard.png",
    category: "Backend Development",
    overall_rating: 4.6,
    reviews: 95
  }
];

export function convertSecondsToDaysOrWeeks(seconds) {
    if (seconds < 3600) {
        return `${Math.round(seconds / 60)} minutes`
    } else if (seconds < 86400) {
        return `${Math.round(seconds / 3600)} hours`
    } else if (seconds < 604800) {
        return `${Math.round(seconds / 86400)} days`
    } else {
        return `${Math.round(seconds / 604800)} weeks`
    }
}

async function getExchangeRate(base, to) {
    try {
        //check if the rates are present in local storage
        //if not, fetch the rates and store them in local storage

        //check if the rate is already requested
        //if not, request the rate and store it in local storage
        if (!requestedRates.find(rate => rate.to === to && rate.base === base)) {
            let rates = JSON.parse(localStorage.getItem("rates"))  //an array of object {to, base, rate}
            //check if the rates are present in local storage
            //if not, fetch the rates and store them in local storage

            if (!rates || !rates.find(rate => rate.to === to && rate.base === base)) {
                console.log("fetching rates")
                const { data: { rates: fetchedRates } } = await axios.get(`https://exchange-rates.abstractapi.com/v1/live/?api_key=${VITE_EXCHANGE_RATE_API}&base=${base}&target=${to}`)
                rates = Object.keys(fetchedRates).map(key => {
                    return {
                        to: key,
                        base: base,
                        rate: fetchedRates[key]
                    }
                })
                localStorage.setItem("rates", JSON.stringify(rates))


                //add the requested rate to the requestedRates array
                requestedRates.push({ to, base, rate: rates.find(rate => rate.to === to && rate.base === base).rate })
            }

            return rates.find(rate => rate.to === to && rate.base === base).rate
        } else {
            const rate = await requestedRates.find(rate => rate.to === to && rate.base === base).rate
            return rate
        }
    } catch (err) {
        //reload on status 429
        console.log(err)
        if (err.response.status === 429) {
            // window.location.reload()
        }
    }
}

const userLocation = JSON.parse(localStorage.getItem("user-location"))?.country_code

export async function convertPrice(course) {
    const { price } = course;
    const userCurrency = JSON.parse(localStorage.getItem("user-location"))?.currency || "USD"
    const exchangeRate = await getExchangeRate(price.base, price.to ? price.to : userCurrency)

    const country_price = Math.round(price.amt * exchangeRate)

    return { country_price: country_price, symbol: mappings[userLocation]?.symbol || "$" }
}

export async function getCourses() {
    let courses = [...mockCourses];
    
    //filter if the course is present in cart
    const cartCourses = JSON.parse(localStorage.getItem("cart"));
    if (cartCourses) {
        courses = courses.filter((course) => {
            const courseInCart = cartCourses.find(
                (cartCourse) => cartCourse._id === course._id
            );
            return !courseInCart;
        });
    }

    //filter if the course is present in enrolled courses
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses"));
    if (enrolledCourses) {
        courses = courses.filter((course) => {
            const courseInEnrolledCourses = enrolledCourses.find(
                (enrolledCourse) => enrolledCourse._id === course._id
            );
            return !courseInEnrolledCourses;
        });
    }

    return courses;
}

export async function getCourse(id) {
    const course = mockCourses.find(course => course._id === id);
    return { course };
}

export async function getCourseNoConversion(id) {
    const course = mockCourses.find(course => course._id === id);
    return { course };
}

export async function createCourse(course) {
    return { data: { ...course, _id: Date.now().toString() } };
}

export async function updateCourse(course) {
    return { data: course };
}

export async function deleteCourse(id) {
    return { data: { success: true } };
}

export async function enrollCourses(courses, order) {
    return { data: { success: true } };
}

export async function getEnrolledCourses() {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    return enrolledCourses;
}

export async function getTrainerCourses() {
    let { data: courses } = await axiosPrivate.get("/courses/all");

    //set the symbol according to the price base
    courses = await Promise.all(courses.map(async (course) => {
        if (course.price.base === JSON.parse(localStorage.getItem("user-location"))?.currency) {
            return {
                ...course,
                price: {
                    ...course.price,
                    symbol: mappings[userLocation]?.symbol || "$"
                }
            }
        }
        const { country_price, symbol } = await convertPrice(course)
        return { ...course, price: { ...course.price, amt: country_price, symbol } }
    }))

    return courses;
}

export async function courseInEnrolledCourses(courseId) {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const course = enrolledCourses.find((course) => course._id === courseId);
    return course;
}

export async function search(query) {
    return mockCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
}

export async function updateCompletedPercentage(courseId, completedPercentage) {
    const response = await axiosPrivate.post(`/courses/updatePercentage`, {
        courseId,
        completedPercentage,
    });
    return response;
}

export function getCertificate(courseId) {
    return Promise.resolve("https://example.com/certificate.pdf");
}

export async function uploadVideo(formData, options) {
    const response = await axiosPrivate.post("/courses/video", formData, options);
    return response;
}

export async function addReview(review, courseId) {
    return { success: true };
}