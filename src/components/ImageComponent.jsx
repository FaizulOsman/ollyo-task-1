import React from "react";

const ImageComponent = ({
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  image,
}) => {
  return (
    <div
      className="image"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div
      // className="gallery__image"
      // style={{
      //   backgroundImage: `url(${image.imageUrl})`,
      // }}
      >
        <img
          className="gallery__image"
          src={image.imageUrl}
          alt="gallery_image"
        />
      </div>
    </div>
  );
};

export default ImageComponent;
