import { useState } from "react"
import Button from "../Button"
import FormInput from "./FormInput"
import { 
  useForm
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { User, iLoginInputs } from "../../types/Auth"
import { loginUser } from "../../data/api/auth"
import { Response } from "../../types/Response"
import { useNavigate } from "react-router-dom";

const Loginschema = yup.object().shape({
  username: yup.string().default('').required("Username is required").min(3, 'must be at least 3 characters long'),
  password: yup.string().default('').required("Password is required")
})

interface LoginFormProps {
  setUser: (user:User|null) => void
}

const LoginForm:React.FC<LoginFormProps> = ({setUser}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    } 
  } = useForm<iLoginInputs>({
    resolver: yupResolver(Loginschema),
  })


  const onSubmit = (data:iLoginInputs) => {
    setLoading(true)
    console.log("login with data", data)
    loginUser(data).then((res:Response) => {
      if (!res.ok) {
        console.log("error", res)
        toast.error(res.message,{position: toast.POSITION.TOP_CENTER})
        reset({
          username: '',
          password: '',
        })
        return
      }
      toast.info(res.message,{position: toast.POSITION.TOP_CENTER})
      console.log("logged", res)
      setUser(res.data as User)
      navigate("/chats")
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
          </div>
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm