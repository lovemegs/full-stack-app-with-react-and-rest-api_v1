import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../context/Context';


const CreateCourse = () => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const newCourse = { title: title, description: description, estimatedTime: estimatedTime, materialsNeeded: materialsNeeded };
        try {
            const response = await config.post(`${config.apiUrl}/courses`, newCourse);
            const allCourses = [...courses, response.data];
            setCourses(allCourses);
            setTitle('');
            setDescription('');
            setEstimatedTime('');
            setMaterialsNeeded('');
            history.push('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    const handleCancel = () => {

    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>

            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
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
            
                        {/* <p>By ${user.firstName} ${user.lastName}</p> */}

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
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};

export default CreateCourse;