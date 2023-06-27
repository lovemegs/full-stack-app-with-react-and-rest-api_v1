import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const UpdateCourse = () => {
    const {id} = useParams();
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    // const [errors, setErrors] = useState([]);

    const history = useNavigate();

    useEffect(() => {
        if (courses) {
            axios.get(`${config.apiUrl}/courses/${id}`)
                .then(response => {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setEstimatedTime(response.data.estimatedTime);
                    setMaterialsNeeded(response.data.materialsNeeded);
                })
                .catch((error) => {
                    console.log(`Error: ${error.message}`);
                });
        }
    }, [id]);


    const handleEdit = async (id) => {
        const updatedCourse = { title: title, description: description, estimatedTime: estimatedTime, materialsNeeded: materialsNeeded };
            try {
                const response = await axios.put(`${config.apiUrl}/courses/${id}`, updatedCourse);
                setCourses(courses.map(course => course.id === id ? { ...response.data } : course));
                setTitle('');
                setDescription('');
                setEstimatedTime('');
                setMaterialsNeeded('');
                history.push('/');
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history(`/courses/${id}`);
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* ADD Name */}
                        <p>By {user.firstName} {user.lastName} </p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={materialsNeeded}
                            onChange={(e) => setMaterialsNeeded(e.target.value)}
                        />
                    </div>
                </div>
                
                <button className="button" type="submit" onClick={() => handleEdit(courses.id)}>Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};

export default UpdateCourse;