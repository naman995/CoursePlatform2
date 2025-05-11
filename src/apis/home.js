import { axiosPublic } from './axios';
import { convertPrice } from './courses';
import mappings from './currency_mappings';

const userLocation = JSON.parse(localStorage.getItem("user-location"))?.country_code

export async function getHome() {
    // Mock data for courses
    const defaultImage = "/src/assets/Home/CourseCard.png";
    return {
        trendingCourses: [
            { _id: '1', title: 'Mock Trending Course 1', price: { amt: 100, base: 'USD', symbol: '$' }, image: defaultImage, category: 'programming', overall_rating: 4, reviews: [{}, {}, {}] },
            { _id: '2', title: 'Mock Trending Course 2', price: { amt: 120, base: 'USD', symbol: '$' }, image: defaultImage, category: 'design', overall_rating: 5, reviews: [{}, {}] }
        ],
        newCourses: [
            { _id: '3', title: 'Mock New Course 1', price: { amt: 90, base: 'USD', symbol: '$' }, image: defaultImage, category: 'marketing', overall_rating: 3, reviews: [{}] },
            { _id: '4', title: 'Mock New Course 2', price: { amt: 110, base: 'USD', symbol: '$' }, image: defaultImage, category: 'business', overall_rating: 4, reviews: [{}, {}, {}, {}] }
        ],
        liveCourses: [
            { _id: '5', title: 'Mock Live Course 1', price: { amt: 130, base: 'USD', symbol: '$' }, image: defaultImage, category: 'live', overall_rating: 5, reviews: [{}, {}, {}, {}, {}], date: '2024-07-01' }
        ]
    };
}