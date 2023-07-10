import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../config";
import axios from "axios";
import Context from "../Context";


const CreateCourse = () => {
    const context = useContext(Context);
    const history = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    // creates a new course
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = { title: title, description: description, estimatedTime: estimatedTime, materialsNeeded: materialsNeeded };
        await axios.post(`${config.apiUrl}/courses`, newCourse, { auth: {username: context.authUser.config.auth.username, password: context.authUser.config.auth.password}})
            .then(() => {
                history('/');
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                console.log('Error creating a new course', error);
            })
    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>
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
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
            
                        <p>By {context.authUser.data.firstName} {context.authUser.data.lastName} </p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={description}
                            required
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
                <button className="button" type="submit" onClick={handleSubmit}>Create Course</button>
                <Link className="button button-secondary" to='/'>Cancel</Link>
            </form>
        </div>
    )
};

export default CreateCourse;