import React, { useState } from "react";
import Loader from "./Loader";

const ImageUpload = ({ handleUploadImage }) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads"); // "my-uploads" comes from https://console.cloudinary.com/settings/c-1376444a4616b3da24f660ea7959dc/upload

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dwp2h8pns/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    handleUploadImage(data.secure_url);
    if (data.secure_url.length > 0) {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="image-upload__wrapper"
          method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <div className="image-upload">
            <svg
              className="image-upload__icon"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.5em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.499" cy="9.5" r="1.5"></circle>
              <path d="m10.499 14-1.5-2-3 4h12l-4.5-6z"></path>
              <path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-16 14V6h16l.002 12H3.999z"></path>
            </svg>
            <input
              className="image-upload__input"
              type="file"
              name="file"
              required
            />

            <button className="image-upload__submit-btn" type="submit">
              Add Image
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ImageUpload;
