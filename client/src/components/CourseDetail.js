import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Context from "../Context";
import ReactMarkdown from 'react-markdown';


const CourseDetail = () => {
    const context = useContext(Context);
    const history = useNavigate();

    let { id } = useParams();
    const [courses, setCourses] = useState('');
    const [user, setUser] = useState('');

    // Retrieves a specific course
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

    // Delete function to delete a specific course
    const handleDelete = async () => {
        await axios.delete(`${config.apiUrl}/courses/${id}`, { auth: {username: context.authUser.config.auth.username, password: context.authUser.config.auth.password}})
            .then(() => {
                history('/');
            })
            .catch (error => {
                console.log('Error delteing course', error);
            });
    }

    return (
        <>
            <div className="actions--bar" >
                <div className="wrap" >
                    {/* Only displays the delete and update buttons if the correct user is logged in */}
                    {context.authUser && context.authUser.data.id === courses.userId
                        ? (
                            <>
                                <Link className="button" to={`/courses/${courses.id}/update`}> Update Course </Link >
                                <Link className="button" to={'/'} onClick={handleDelete}> Delete Course </Link>
                            </>
                        ) : (null) }
                    
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

                            <ReactMarkdown>{courses.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courses.estimatedTime}</p>

                            <h3 className="course--detail--title"> Materials Needed</h3 >
                            <ul className="course--detail--list">
                                <ReactMarkdown>{courses.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CourseDetail;