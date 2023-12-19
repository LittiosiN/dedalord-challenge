import { useState } from "react"
import {toast} from 'react-toastify'
import Button from "../Button"
import FormInput from "./FormInput"
import { 
  useForm
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { iRegisterInputs } from "../../types/Auth"
import { registerUser } from "../../data/api/auth"
import { Response } from "../../types/Response"

const Registerschema = yup.object().shape({
  username: yup.string().default('').required("Username is required").min(3, 'must be at least 3 characters long'),
  password: yup.string().default('').required("Password is required"),
  passwordConfirmation: yup.string().required("Password confirmation is required")
     .oneOf([yup.ref('password')], 'Passwords must match')
})

interface RegisterFormProps {
  goToLogin: () => void
}

const RegisterForm:React.FC<RegisterFormProps> = ({goToLogin}) => {
  const [loading, setLoading] = useState<boolean>(false)
  
  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    } 
  } = useForm<iRegisterInputs>({
    resolver: yupResolver(Registerschema),
  })

  const onSubmit = (data:iRegisterInputs) => {
    setLoading(true)
    registerUser(data).then((res:Response) => {
      if (!res.ok) {
        console.log("error", res)
        toast.error(res.message,{position: toast.POSITION.TOP_CENTER})
        reset({
          username: '',
          password: '',
          passwordConfirmation: '',
        })
        return
      }
      toast.info(res.message,{position: toast.POSITION.TOP_CENTER})
      goToLogin()
    }).finally(() => setLoading(false))
    // call login post
  }

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-fullseparator
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          sm:rounded-lg
          sm:px-10
          shadow
        "
      >
        <form
          className="space-y-6 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <FormInput
              label="Username"
              id="username"
              type="text"
              register={register}
              disabled={loading}
              errors={errors}
              placeHolder="Username"
            />
            <FormInput
              label="Password"
              id="password"
              type="password"
              disabled={loading}
              register={register}
              errors={errors}
            />
            <FormInput
              label="Confirm your password"
              id="passwordConfirmation"
              type="password"
              disabled={loading}
              register={register}
              errors={errors}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm