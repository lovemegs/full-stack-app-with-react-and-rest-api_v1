import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from '../config';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    // retrieves the list of courses
    useEffect(() => {
        axios.get(`${config.apiUrl}/courses`)
            .then(response => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            });
    }, []);

    return (
        <div className="wrap main--grid">
            {/* maps through the courses to display each one */}
            {courses.map(course => (
                <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            ))}
            <Link className="course--module course--add--module" to={'/courses/create'}>
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div >
    )
};

export default Courses;