import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import { uploadImage } from "@/firebase/client";
import { UploadTask } from "firebase/storage";
import { useAppContext } from "@/components/AppContext";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export const useComposeTweet = () => {
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
