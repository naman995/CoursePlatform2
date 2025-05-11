import { axiosPublic } from './axios';

const mockBlogs = [
  {
    id: 1,
    _id: "1",
    title: "Getting Started with Web Development",
    content: "Learn the basics of web development including HTML, CSS, and JavaScript...",
    author: "John Doe",
    date: "2024-03-15",
    image: "/course.jpg",
    imageUrl: "/course.jpg",
    viewCount: 120,
    comments: [
      { id: 1, text: "Great article!", author: "Alice" },
      { id: 2, text: "Very helpful!", author: "Bob" }
    ]
  },
  {
    id: 2,
    _id: "2",
    title: "Advanced React Patterns",
    content: "Explore advanced React patterns and best practices for building scalable applications...",
    author: "Jane Smith",
    date: "2024-03-14",
    image: "/course.jpg",
    imageUrl: "/course.jpg",
    viewCount: 85,
    comments: [
      { id: 1, text: "Excellent explanation!", author: "Charlie" }
    ]
  },
  {
    id: 3,
    _id: "3",
    title: "Mastering TypeScript",
    content: "A comprehensive guide to TypeScript and its features...",
    author: "Mike Johnson",
    date: "2024-03-13",
    image: "/course.jpg",
    imageUrl: "/course.jpg",
    viewCount: 95,
    comments: [
      { id: 1, text: "Very informative!", author: "David" },
      { id: 2, text: "Thanks for sharing!", author: "Eve" },
      { id: 3, text: "Great content!", author: "Frank" }
    ]
  }
];

export async function getBlogs() {
    return mockBlogs;
}

export async function getBlog(id) {
    return mockBlogs.find(blog => blog.id === parseInt(id));
}