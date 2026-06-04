import style from './PhotosGalleryItem.module.css'

const PhotosGalleryItem = ({ avg_color, src, alt }) => {
  return (
    <div
      className={style.thumb}
      style={{ backgroundColor: avg_color, borderColor: avg_color }}
    >
      <img src={src.large} alt={alt} />
    </div>
  );
};
export default PhotosGalleryItem;
