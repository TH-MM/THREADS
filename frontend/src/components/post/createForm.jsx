import { useRef, useState } from "react"
import * as Yup from 'yup'
import { Field, Form, Formik } from "formik"
import Button from "../UI/button"
import { ImagePlus, LoaderCircleIcon } from "lucide-react"
import { usePostContext } from "../../Context/postContext"
import { postApi } from "../../services/postService"

const UpdateUserForm = ({ hideForm }) => {
    const { createPost } = usePostContext()
    const [file, setFile] = useState(null)
    const textRef = useRef();

    const formValidation = Yup.object().shape({
        content: Yup.string().nullable(),
        image: Yup.string().nullable(),
    })

    const fileHandler = (event) => {
        setFile(event.target.files[0]);
    }

    const changeTextAreaHeight = () => {
        textRef.current.style.height = 'auto'
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }

    const onSubmit = async (values, { setErrors, setSubmitting }) => {

        const formData = new FormData()
        formData.append('content', values.content)
        formData.append('image', file)

        await postApi.createPost(formData)
            .then(() => {
                hideForm();
            })
            .catch((error) => {
                console.log(error)
                // setErrors({
                //     content: error.response.data.errors.content || "",
                //     image: error.response.data.errors.image || "",
                // })
            }).finally(() => {
                setSubmitting(false)
            })

    }

    return (
        <div className={`h-90vh w-full items-center fixed top-0 left-0 flex`}>
            <div onClick={hideForm} className="fixed top-0 left-0 w-full h-100vh bg-black opacity-70 z-10"></div>
            <Formik
                initialValues={{
                    content: "",
                    image: "",
                }}
                validationSchema={formValidation}
                onSubmit={onSubmit}
            >
                {
                    ({ isSubmitting, values }) => (
                        <Form className="z-20 bg-white p-30px rounded-xl flex flex-col items-center w-500px mx-auto border border-solid border-spacing-1 text-start">
                            <Field name="content">
                                {({ field }) => (
                                    <textarea
                                        {...field}
                                        ref={textRef}
                                        onChange={(event) => {
                                            field.onChange(event); // Call Formik's onChange
                                            changeTextAreaHeight(event); // Adjust the height dynamically
                                        }}
                                        placeholder="What's happening?"
                                        rows={1}
                                        className="w-full border-none outline-none mb-2 resize-none"
                                    />
                                )}
                            </Field>
                            {file && <img src={URL.createObjectURL(file)} alt="" className="rounded-lg p-0 m-0" />}
                            <div className="w-full mt-2">
                                <label htmlFor="image">
                                    <ImagePlus size={18} className="cursor-pointer stroke-slate-400 hover:stroke-slate-600" />
                                </label>
                                <input type="file" onChange={fileHandler} name="image" hidden id="image" />
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