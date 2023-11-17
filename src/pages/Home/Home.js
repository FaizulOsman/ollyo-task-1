import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import {
  useDeleteImagesMutation,
  useGetAllDataQuery,
  useInsertImageMutation,
} from "../../redux/features/gallery/galleryApi";
import ImageComponent from "../../components/ImageComponent";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Home = () => {
  const [allImages, setAllImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Data queries
  const [
    insertImage,
    {
      isSuccess: isInsertImageSuccess,
      isError: isInsertImageError,
      error: insertImageError,
    },
  ] = useInsertImageMutation();
  const { data: getAllData } = useGetAllDataQuery();
  const [
    deleteImages,
    {
      isSuccess: isDeleteImagesSuccess,
      isError: isDeleteImagesError,
      error: deleteImagesError,
    },
  ] = useDeleteImagesMutation();

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  function handleSort() {
    const imageClone = [...allImages];
    const temp = imageClone[dragPerson.current];
    imageClone[dragPerson.current] = imageClone[draggedOverPerson.current];
    imageClone[draggedOverPerson.current] = temp;
    setAllImages(imageClone);
  }

  const handleUploadImage = async (imageUrl) => {
    const data = { imageUrl: imageUrl };
    insertImage(data);
  };

  const handleDeleteImages = async () => {
    deleteImages(selectedImages);
  };

  const handleCheck = (id, e) => {
    if (e.target.checked) {
      setSelectedImages((prevSelectedImages) => {
        if (!prevSelectedImages.includes(id)) {
          return [...prevSelectedImages, id];
        }
      });
    } else {
      setSelectedImages((prevSelectedImages) => {
        if (prevSelectedImages.includes(id)) {
          return prevSelectedImages.filter((selectedId) => selectedId !== id);
        }
      });
    }
  };

  useEffect(() => {
    setAllImages(getAllData?.data);
  }, [getAllData?.data]);

  useEffect(() => {
    if (isInsertImageSuccess) {
      toast.success("Image uploaded successfully!");
    }
  }, [isInsertImageSuccess]);

  useEffect(() => {
    if (isInsertImageError) {
      toast.error(insertImageError?.data?.message || "Something went wrong!");
    }
  }, [isInsertImageError, insertImageError]);

  useEffect(() => {
    if (isDeleteImagesSuccess) {
      toast.success("Image deleted successfully!");
    }
  }, [isDeleteImagesSuccess]);

  useEffect(() => {
    if (isDeleteImagesError) {
      toast.error(deleteImagesError?.data?.message || "Something went wrong!");
    }
  }, [isDeleteImagesError, deleteImagesError]);

  return (
    <main className="main-container main-section">
      <div className="header">
        {selectedImages?.length > 0 ? (
          <strong className="selected-heading">
            <div className="check">
              <input type="checkbox" defaultChecked={true} />
              <span className="checkmark"></span>
            </div>
            {selectedImages?.length} File Selected
          </strong>
        ) : (
          <h4 className="heading">Gallery</h4>
        )}
        <h3 onClick={() => handleDeleteImages()} className="delete__btn">
          Delete files
        </h3>
      </div>
      <div className="images-section">
        {allImages?.length > 0 ? (
          allImages?.map((image, index) => (
            <label
              key={index}
              className={`single-image ${index === 0 ? "wider" : ""}`}
            >
              <ImageComponent
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (draggedOverPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                image={image}
              />
              <div className="check">
                <input
                  type="checkbox"
                  onClick={(e) => handleCheck(image?.id, e)}
                />
                <span className="checkmark"></span>
              </div>
            </label>
          ))
        ) : (
          <Loader />
        )}

        <ImageUpload handleUploadImage={handleUploadImage} />
      </div>
    </main>
  );
};

export default Home;
