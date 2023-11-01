import React, { useState } from "react";

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
        <div>Loading...</div>
      ) : (
        <form
          method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          className="flex flex-col sm:flex-row gap-4 sm:justify-between"
        >
          <input
            type="file"
            name="file"
            className="file-input file-input-sm file-input-primary file-input-bordered w-full bg-transparent"
            required
          />

          {/* {imageSrc && !uploadData && ( */}
          <button type="submit" className="btn btn-sm btn-primary">
            Upload
          </button>
          {/* )} */}
        </form>
      )}
    </>
  );
};

export default ImageUpload;
