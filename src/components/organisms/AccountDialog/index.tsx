import * as React from 'react'

//styles
import InputText from '@/components/atoms/InputText'
import Button from '@/components/atoms/Button'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import * as yup from 'yup'
import { IRootState } from '@/redux'
import { Formik } from 'formik'

interface IFormValue {
  name: string
  email: string
  phoneNumber: string
}

export interface IAccountDialogProps {
  open: boolean
  onClose: () => void
  product?: IProductDetail
}

function OrderShippingInfoDialog(props: IAccountDialogProps) {
  //props
  const { open, onClose } = props

  //state
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    name: user?.username as string,
    email: user?.email as string,
    phoneNumber: user?.phoneNumber as string,
  })
  const [loading, setLoading] = React.useState<boolean>(false)

  //functions
  const handleSubmit = async (values: IFormValue) => {
    try {
      setLoading(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      name: yup.string().required('Vui lòng điền tên của bạn'),
      email: yup.string().required(''),
      phoneNumber: yup.string().required(''),
    })

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ submitForm, values, handleSubmit }) => {
            return (
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-5">
                  <div className="w-full flex items-center">
                    <h1 className="text-gray-600 font-bold text-2xl mb-2">
                      Quản lý thông tin tài khoản của bạn
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-2 gap-y-5 items-center justify-between">
                    <InputText
                      name="name"
                      value={initialValues?.name}
                      label="Tên của bạn"
                      placeholder="Nhập tên của bạn"
                    />
                    <InputText
                      name="email"
                      value={initialValues?.email}
                      label="Email"
                      placeholder="Email"
                    />
                  </div>
                  <InputText
                    name="phoneNumber"
                    value={initialValues?.phoneNumber}
                    label="Số điện thoại"
                    placeholder="Số điện thoại của bạn"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div></div>
                  <div className="flex items-center">
                    <Button
                      variant="secondary"
                      onClick={() => onClose()}
                      title="Đóng"
                    />
                    {/* <Button
                      type="submit"
                      title="Xác nhận"
                      variant="primary"
                      className="ml-2"
                      isLoading={loading}
                      onClick={handleSubmit}
                    /> */}
                  </div>
                </div>
              </div>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default OrderShippingInfoDialog
