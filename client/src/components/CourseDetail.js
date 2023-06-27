import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";


const CourseDetail = () => {
    let { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);

    const history = useNavigate();

    useEffect(() => {
        axios.get(`${config.apiUrl}/courses/${id}`)
            .then(response => {
                setCourses(response.data);
                setUser(response.data.User);
            })
            .catch(error => {
                console.log('Error fetching data', error);
            })
    }, [id]);

    const handleDelete = async (id) => {
        await axios.delete(`${config.apiUrl}/courses/${id}`)
            // .then(response => {

            // })
            // .catch (error => {

            // });
        // const courseDetail = courses.filter(course => course.id !== id);
        // setCourses(courseDetail);
        // history.push('/');
    }

    return (
        <>
            <div className="actions--bar" >
                <div className="wrap" >
                    <Link className="button" to={`/courses/${courses.id}/update`}> Update Course </Link >
                    <Link className="button" to={'/'} onClick={handleDelete}> Delete Course </Link>
                    <Link className="button" to={'/'}> Return to List </Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courses.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>

                            <p>{courses.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courses.estimatedTime}</p>

                            <h3 className="course--detail--title"> Materials Needed</h3 >
                            <ul className="course--detail--list">
                                <li>{courses.materialsNeeded}</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CourseDetail;