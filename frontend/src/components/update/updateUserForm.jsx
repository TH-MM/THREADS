import { useState } from "react"
import { useUserContext } from "../../Context/userContext"
import { BASE_URL } from "../../urls"
import * as Yup from 'yup'
import { Form, Formik } from "formik"
import FieldBox from "../formComponents/fieldBox"
import Button from "../UI/button"
import { Edit, LoaderCircleIcon } from "lucide-react"
import { userApi } from "../../services/userServices"

const UpdateUserForm = ({ hideForm }) => {
    const { user , setUser} = useUserContext()
    const [file, setFile] = useState(null)

    const formValidation = Yup.object().shape({
        name: Yup.string().required(),
        username: Yup.string().required("Username is required").min(2),
        bio: Yup.string().max(250).nullable(),
        website: Yup.string().nullable(),
        profile_picture: Yup.string().nullable(),
    })

    const fileHandler = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = (values, { setErrors, setSubmitting }) => {

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('username', values.username)
        formData.append('email', values.email)
        formData.append('bio', values.bio)
        formData.append('website', values.website)
        formData.append('profile_picture', file)

        userApi.update(formData)
            .then(() => {
                setUser((prevUser) => {
                    if(file)
                    {
                        var updatedProfilePicture = `profile/profile_picture_user_${user.id}.${file.name.split('.').pop()}`;
                    }
                    
                    return {
                        ...prevUser,
                        name: values.name,
                        username: values.username,
                        email: values.email,
                        bio: values.bio,
                        website: values.website,
                        profile_picture: file ? updatedProfilePicture+'?'+new Date().getTime() : user.profile_picture // Force refresh
                    };
                })
                hideForm();
            })
            .catch((error) => {
                setErrors({
                    name: error.response.data.errors.name || "",
                    username: error.response.data.errors.username || "",
                    email: error.response.data.errors.email || "",
                    website: error.response.data.errors.website || "",
                    bio: error.response.data.errors.bio || "",
                    profile_picture: error.response.data.errors.profile_picture || "",
                })
            }).finally(() => {
                setSubmitting(false)
            })

    }

    return (
        <div className={`h-90vh w-full items-center fixed top-0 left-0 flex`}>
            <div onClick={hideForm} className="fixed top-0 left-0 w-full h-100vh bg-black opacity-70 z-10"></div>
            <Formik
                initialValues={{
                    name: user.name || "",
                    username: user.username || "",
                    email: user.email || "",
                    bio: user.bio || "",
                    website: user.website || "",
                    profile_picture: user.profile_picture || "",
                }}
                validationSchema={formValidation}
                onSubmit={onSubmit}
            >
                {
                    ({ isSubmitting }) => (
                        <Form className="z-20 bg-white p-30px rounded-xl flex flex-col items-center w-500px mx-auto border border-solid border-spacing-1">
                            <div className="w-full flex justify-center mt-2 mb-5">
                                <label className="relative cursor-pointer" htmlFor="profile_picture">
                                    <img src={file ? URL.createObjectURL(file) : `${BASE_URL}storage/${user.profile_picture}` || ""} alt="" className="w-24 h-24 rounded-full object-cover" />
                                    <div className="bg-black opacity-20 absolute top-0 rounded-full w-full h-full flex justify-center items-center"><Edit size={25} className="stroke-white" /></div>
                                </label>
                                <input type="file" hidden id="profile_picture" onChange={fileHandler} name="profile_picture" />
                            </div>
                            <div className="w-full">
                                <FieldBox name="name" placeholder="Name" >Name :</FieldBox>
                            </div>
                            <div className="w-full">
                                <FieldBox name="username" placeholder="Username" >Username :</FieldBox>
                            </div>
                            <div className="w-full">
                                <FieldBox name="email" placeholder="Email" >Email :</FieldBox>
                            </div>
                            <div className="w-full">
                                <FieldBox name="bio" placeholder="Bio" >Bio :</FieldBox>
                            </div>
                            <div className="w-full">
                                <FieldBox name="website" placeholder="website" >website :</FieldBox>
                            </div>
                            <Button type={'submit'} disabled={isSubmitting} className={`w-full mt-2 flex justify-center text-white ${isSubmitting ? "bg-slate-500" : ""}`} >{isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "Save Changes"} </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
export default UpdateUserForm