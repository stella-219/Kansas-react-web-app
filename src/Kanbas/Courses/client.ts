import axios from "axios";

// let another version of axios supporting cookies
// the server needs to know where the request comes from, so needs working with session
const axiosWithCredentials = axios.create({
    withCredentials: true,
})

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Retrieving Courses
export const fetchAllCourses = async () => {
    const response = await axiosWithCredentials.get(COURSES_API);
    return response.data;
};

// Retrieving published courses
export const fetchPublishedCourses = async () => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/published`);
    return response.data;
};

// Creating New Courses
export const createCourse = async (course: any) => {
    const response = await axiosWithCredentials.post(COURSES_API, course);
    return response.data;
};

// Deleting a Course
export const deleteCourse = async (id: string) => {
    const response = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return response.data;
};

// Updating a Course
export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return response.data;
};
  
