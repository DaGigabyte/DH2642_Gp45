import * as Dialog from "@radix-ui/react-dialog";
import { IoCloseOutline } from "react-icons/io5";

export default function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({ title, children }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm z-[1010]" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] md:w-[80vw] max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-white border border-black rounded-md shadow-lg shadow-black/80 p-8 overflow-hidden focus:outline-none overflow-y-auto z-[1020]">
        <Dialog.Title className="text-2xl font-bold mb-4">{title}</Dialog.Title>
        {children}
        <Dialog.Close asChild>
          <button
            className="absolute top-4 right-4 inline-flex appearance-none items-center justify-center focus:outline-none hover:bg-black/25 rounded-full p-2"
            aria-label="Close"
          >
            <IoCloseOutline size={25} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
