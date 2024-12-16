import { Avatar, AvatarFallback } from "@components/ui/avatar";
import Modal from "../../components/Modal";

function ImagePreview({ photo, addStyles = "h-32 w-32", alt }) {
  const image_url = import.meta.env.VITE_IMAGE_URL + photo;

  if (!photo)
    return (
      <Avatar
        className={`${addStyles} transform bg-gradient-to-br from-purple-500/90 to-blue-600/90 text-4xl text-white shadow-lg transition-transform hover:scale-110`}
      >
        <AvatarFallback className="bg-primary/20">{alt}</AvatarFallback>
      </Avatar>
    );

  return (
    <Modal>
      <Modal.Open opens="image-preview">
        <div
          className={`cursor-pointer rounded-full border border-opacity-25 ${addStyles}`}
        >
          {" "}
          <img
            className="h-full w-full rounded-full object-center"
            src={image_url}
            alt="user Profile"
          />{" "}
        </div>
      </Modal.Open>
      <OpenImagePreview img={image_url} />
    </Modal>
  );
}

function OpenImagePreview({ img }) {
  return (
    <Modal.Window name="image-preview">
      <div className="m-1 h-[60vh] w-[60vw] sm:h-[70vh] sm:w-[40vw] md:h-[70vh] md:w-[40vw] lg:w-[30vw]">
        <img src={img} alt="user-profile" className="h-full w-full" />
      </div>
    </Modal.Window>
  );
}

export default ImagePreview;
