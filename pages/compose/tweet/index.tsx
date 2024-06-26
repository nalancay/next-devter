import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import { uploadImage } from "@/firebase/client";
import { UploadTask } from "firebase/storage";
import { useAppContext } from "@/components/AppContext";
import { Button } from "@/components/Button";

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const useComposeTweet = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState<UploadTask | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const { setAppContext } = useAppContext();

  const user = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const newTask = uploadImage(file);
    setTask(newTask);
  };

  useEffect(() => {
    if (setAppContext) {
      setAppContext({
        title: "Crear un Devit",
        subTitle: "Mensajeria",
        user,
      });
    }
  }, [setAppContext, user]);

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;
  return {
    drag,
    message,
    imgURL,
    setImgURL,
    isButtonDisabled,
    handleSubmit,
    handleChange,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};

export default function ComposeTweetPage() {
  const {
    drag,
    message,
    imgURL,
    setImgURL,
    isButtonDisabled,
    handleSubmit,
    handleChange,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useComposeTweet();

  return (
    <>
      <section className="flex flex-col items-center px-4 py-2">
        <form onSubmit={handleSubmit} className="w-full max-w-xl">
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
            className={`w-full p-4 text-lg rounded-lg outline-none resize-none border ${
              drag === DRAG_IMAGE_STATES.DRAG_OVER
                ? "border-blue-500"
                : "border-gray-300"
            } focus:border-blue-500 transition-all duration-300`}
          ></textarea>
          {imgURL && (
            <section className="relative mt-4">
              <button
                onClick={() => setImgURL(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 text-white text-lg rounded-full flex items-center justify-center"
              >
                x
              </button>
              <img src={imgURL} alt="Uploaded" className="rounded-lg" />
            </section>
          )}
          <div className="mt-4 flex justify-end">
            <Button
              disabled={isButtonDisabled}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-300"
            >
              Enviar
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
