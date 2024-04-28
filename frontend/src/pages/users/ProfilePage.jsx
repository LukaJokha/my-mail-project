import { Formik, Form, ErrorMessage } from "formik"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { axiosInterceptorsInstance } from "@/lib/axiosInstance"
import clsx from "clsx"
import { useContext } from "react"
import { AuthContext } from "@/components/AuthContext"

export const ProfilePage = () => {
  // const [status, setStatus] = useState({
  //   message: "",
  //   type: ""
  // })
  const { user, setUser } = useContext(AuthContext)

  const updateProfile = async (values) => {
    const response = await axiosInterceptorsInstance.patch("/user", values)
    const updatedUser = response.data.user
    setUser(updatedUser)
  }

  const initialValues = {
    username: user.username,
    currentPassword: "",
    newPassword: ""
  }

  return (
    <Formik initialValues={initialValues} onSubmit={updateProfile}>
      {(formik) => {
        return (
          <div>
            <Form className="flex flex-col gap-4 max-w-md mx-auto">
              {status.message && (
                <Alert
                  className={clsx(
                    status.type === "success" ? "bg-green-200" : "bg-red-200"
                  )}
                >
                  <AlertTitle
                    className={clsx(
                      "mb-0 font-normal",
                      status.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    )}
                  >
                    {status.message}
                  </AlertTitle>
                </Alert>
              )}
              <div>
                <Label htmlFor="title" className="mb-4 block">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-600"
                />
              </div>
              <div>
                <Label className="mb-4 block">Email</Label>
                <div className="my-4">{user.email}</div>
              </div>
              <div>
                <Label htmlFor="imageUrl" className="mb-4 block">
                  Current password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...formik.getFieldProps("currentPassword")}
                />
                <ErrorMessage
                  name="currentPassword"
                  component="span"
                  className="text-red-600"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl" className="mb-4 block">
                  New password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...formik.getFieldProps("newPassword")}
                />
                <ErrorMessage
                  name="newPassword"
                  component="span"
                  className="text-red-600"
                />
              </div>
              <Button
                type="submit"
                className="self-end"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update profile"
                )}
              </Button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}
