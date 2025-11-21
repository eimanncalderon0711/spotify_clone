import  * as Dialog from "@radix-ui/react-dialog"
import { CgClose } from "react-icons/cg";

type ModalProps = {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
  return (
   <Dialog.Root open={true} defaultOpen={isOpen} onOpenChange={onChange}>
    <Dialog.Portal>
        <Dialog.DialogOverlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0"/>
        <Dialog.DialogContent 
            className="fixed w-full h-full border border-neutral-700 top-1/2 left-1/2 drop-shadow-md max-h-full 
                        md:h-auto
                        md:max-h-[85vh]
                        md:w-[90vw] 
                        md:max-w-[450px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-md
                        bg-neutral-800
                        p-[25px]
                        focus:outline-none
                        "
        >
            <Dialog.DialogTitle className="text-xl text-center font-bold mb-4">
                {title}
            </Dialog.DialogTitle>
            <Dialog.DialogDescription className="mb-5 text-sm leading-normal text-center">
                {description}
            </Dialog.DialogDescription>
            <div>
                {children}
            </div>
            <Dialog.DialogClose asChild>
                <button className="text-neutral-400 
                      hover:text-white absolute top-3 right-3 inline-flex 
                      h-[25px] w-[25px] appearance-none items-center 
                      justify-center rounded-full focus:outline-none"
                >
                    <CgClose/>
                </button>
            </Dialog.DialogClose>
        </Dialog.DialogContent>
    </Dialog.Portal>
   </Dialog.Root>
  )
}

export default Modal