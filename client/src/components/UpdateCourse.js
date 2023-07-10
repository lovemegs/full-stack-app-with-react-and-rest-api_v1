import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Context from "../Context";

const UpdateCourse = () => {
    const context = useContext(Context);
    const history = useNavigate();

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    // retrieves a specific course
    useEffect(() => {
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
    }, [id]);

    // updates the course
    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedCourse = { title: title, description: description, estimatedTime: estimatedTime, materialsNeeded: materialsNeeded };
        await axios.put(`${config.apiUrl}/courses/${id}`, updatedCourse, { auth: {username: context.authUser.config.auth.username, password: context.authUser.config.auth.password}})
            .then(() => {
                history('/');
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                console.log('Error updating course', error)
            })
    }

    // cancel button
    const handleCancel = (e) => {
        e.preventDefault();
        history(`/courses/${id}`);
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {/* validation errors */}
            {
                errors.length ?
                (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => {return <li key={i}>{error}</li>})}
                        </ul>
                    </div>
                ) : (null)
            }
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
                        <p>By {context.authUser.data.firstName} {context.authUser.data.lastName} </p>

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
                <button className="button" type="submit" onClick={handleEdit}>Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};

export default UpdateCourse;