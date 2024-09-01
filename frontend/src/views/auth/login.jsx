import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../components/UI/button";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../svg/icons";
import FieldBox from "../../components/formComponents/fieldBox";
import { useUserContext } from "../../Context/userContext";
import { REGISTER_FORM_URL } from "../../urls";
import { LoaderCircleIcon } from "lucide-react";
import { userApi } from "../../services/userServices";


const Login = () => {
    const { setIsAuth_ } = useUserContext()
    const navigator = useNavigate()

    const formValidation = Yup.object().shape({
        username: Yup.string().required("username is required").min(2),
        password: Yup.string().required("Password is required").min(8)
    })

    const onSubmit = async (values, { setErrors, setSubmitting }) => {
        await userApi.login(values).then((response) => {
            if (response.status === 204) {
                setIsAuth_(true)
                navigator('/')

            }
        }).catch((error) => {
            setErrors({ username: error.response.data.errors.username, password: error.response.data.errors.password })
        }).finally(() => {
            setSubmitting(false)
        })

    }

    return (
        <div className="h-90vh flex items-center">
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={formValidation}
                onSubmit={onSubmit}
            >
                {
                    ({ isSubmitting }) => (
                        <Form className="p-30px rounded-xl flex flex-col items-center w-500px mx-auto border border-solid border-spacing-1">
                            <Link className="mb-10" to={'/'}><Logo size={38} className="stroke-none fill-gray-800" /></Link>
                            <div className="w-full">
                                <FieldBox name="username" placeholder="Username" >Username :</FieldBox>
                            </div>
                            <div className="relative w-full">
                                <FieldBox type="password" name="password" placeholder="Password" >Password :</FieldBox>
                            </div>
                            <Button type={'submit'} disabled={isSubmitting} className={`w-full mt-2 flex justify-center text-white ${isSubmitting ? "bg-slate-500" : ""}`} >{isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "Login"} </Button>
                            <p className="mt-2">you don't have an accout ? <Link to={REGISTER_FORM_URL} className="font-bold text-gray-800 hover:text-orange-400 duration-200 underline" >register</Link></p>
                        </Form>

                    )
                }

            </Formik>
        </div>
    )
}

export default Login;