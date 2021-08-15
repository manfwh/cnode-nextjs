import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import Button from '@/components/ui/Button'
const MyDialog = (props) => {
  const completeButtonRef = useRef(null)
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        onClose={props.onClose}
        initialFocus={completeButtonRef}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            leave="ease-in duration-200"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          > */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          {/* </Transition.Child> */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-sm">
              {props.title ||
                (props.type === 'warn' && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.title || '提示'}
                  </Dialog.Title>
                ))}
              {props.description && (
                <Dialog.Description className="mt-2 text-sm text-gray-500">
                  {props.description}
                </Dialog.Description>
              )}

              <div className="mt-4 text-right">
                <Button ref={completeButtonRef}
                  onClick={props.onClose}>
                我知道了
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MyDialog
