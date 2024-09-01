import { useRef, useState } from "react"
import * as Yup from 'yup'
import { Field, Form, Formik } from "formik"
import Button from "../UI/button"
import { LoaderCircleIcon } from "lucide-react"
import { BASE_URL } from "../../urls"

const CommentForm = ({ hideForm, post, user_ }) => {
    const textRef = useRef();

    const formValidation = Yup.object().shape({
        comment: Yup.string().nullable(),
    })

    const changeTextAreaHeight = () => {
        textRef.current.style.height = 'auto'
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }

    const formatText = (text) => {
        return text.split("\n").map((line) => {
            return (
                <>
                    {line}
                    <br />
                </>
            )
        })
    }

    const onSubmit = async () => {
    }

    return (
        <div className={`h-90vh w-full items-center fixed top-0 left-0 flex`}>
            <div onClick={hideForm} className="fixed top-0 left-0 w-full h-100vh bg-black opacity-70 z-10"></div>
            <div className="z-20 bg-white p-20px pb-1 rounded-xl flex w-500px mx-auto text-start gap-3">
                <img src={`${BASE_URL}storage/${user_.profile_picture}`} alt="" className="h-40px w-40px object-cover rounded-full" />
                <div className="w-full">
                    <div className="w-full pb-3 mb-3 border-b">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold">{user_.username}</p>
                            <p className="text-gray-400 text-xs font-light">10/12/2023</p>
                        </div>
                        <p className="mb-1 text-justify text-base text-gray-800">{formatText(post.content)}</p>
                        <img src={`${BASE_URL}storage/${post.image}`} alt="" className=" rounded-xl " />
                    </div>
                    <Formik
                        initialValues={{
                            comment: "",
                        }}
                        validationSchema={formValidation}
                        onSubmit={onSubmit}
                    >
                        {
                            ({ isSubmitting, values }) => (
                                <Form className="w-full">
                                    <Field name="comment">
                                        {({ field }) => (
                                            <textarea
                                                {...field}
                                                ref={textRef}
                                                onChange={(event) => {
                                                    field.onChange(event); // Call Formik's onChange
                                                    changeTextAreaHeight(event); // Adjust the height dynamically
                                                }}
                                                placeholder={"Reply to " + user_.username + ' ...'}
                                                rows={1}
                                                className="w-full border-none outline-none mb-2 resize-none"
                                            />
                                        )}
                                    </Field>
                                    <Button type={'submit'} disabled={isSubmitting} className={`w-auto flex justify-center text-white ${isSubmitting ? "bg-slate-500" : ""}`} >{isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "Post"} </Button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default CommentForm