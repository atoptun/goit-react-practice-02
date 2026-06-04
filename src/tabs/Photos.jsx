import { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const { photos, total_results, per_page } = await getPhotos(
          query,
          page,
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prev => [...prev, ...photos]);
        setHasMoreImages(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const getQuery = inputValue => {
    setQuery(inputValue);
    setImages([]);
    setPage(1);
    setHasMoreImages(false);
    return true;
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Form onSubmit={getQuery} />
      <PhotosGallery images={images} />
      {hasMoreImages && (
        <Button onClick={handleLoadMoreClick}>Load more</Button>
      )}
      {isEmpty && (
        <Text textAlign="center">Nothing found with "{query}" ...</Text>
      )}
      {!query && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">Something went wrong "{ error }" ...</Text>}
    </>
  );
};

export default Photos;
