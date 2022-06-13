import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getStudent, updateStudentSuccess} from "../redux/sudents/students";
import {useNavigate} from "react-router-dom";
import {Container, TextField} from "@mui/material";
import {Myloader} from "../components/Myloader";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";

const Student = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, setValue, handleSubmit, formState: {errors}} = useForm();
    const {student, loading, updateSuccess} = useSelector(state => state.students);
    const [fullName, setFullname] = useState('');

    useEffect(() => {
        dispatch(getStudent(id))
        console.log(student)
    }, [])

    useEffect(() => {
        if (updateSuccess) {
            navigate('/')
        }

    }, [updateSuccess])

    useEffect(() => {
        if (student) {
            setValue("fullName", student.fullName)
            setValue("universityName", student.universityName)
            setValue("entranceYear", student.entranceYear)
            setValue("studyType", student.studyType)
            setValue("organizationId", student.organizationId)
        }
    }, [student])


    const submitUpdate = (val) => {
        console.log(val)
        dispatch(updateStudentSuccess(val))
    }

    return (
        <>
            <Container fixed>
                {loading ? <Myloader/> :
                    <div style={{ padding: '60px 0'}}>
                        <form onSubmit={handleSubmit(submitUpdate)}>
                            <TextField
                                {...register('fullName')}
                                required={true}
                                type={'text'}
                                variant="outlined"
                                color="primary"
                                label="Full Name"
                                sx={{m: 2}}
                            />
                            <TextField
                                {...register('universityName')}
                                required={true}
                                type={'text'}
                                variant="outlined"
                                color="primary"
                                label="University Name"
                                sx={{m: 2}}
                            />
                            <TextField
                                {...register('entranceYear')}
                                required={true}
                                type={'text'}
                                variant="outlined"
                                color="primary"
                                label="Entrance Year"
                                sx={{m: 2}}
                            />
                            <TextField
                                {...register('studyType')}
                                required={true}
                                type={'text'}
                                variant="outlined"
                                color="primary"
                                label="Study type"
                                sx={{m: 2}}
                            />
                            <TextField
                                {...register('organizationId')}
                                required={true}
                                type={'text'}
                                variant="outlined"
                                color="primary"
                                label="Organization Id"
                                sx={{m: 2}}
                            />
                            <Button type={'onsubmit'} sx={{p: 1.5, m: 2}} variant="contained" color="success">Update student</Button>
                        </form>
                    </div>
                }
            </Container>
        </>
    )
}

export default Student;