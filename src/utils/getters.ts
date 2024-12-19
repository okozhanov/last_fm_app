import {get, keyBy} from 'lodash';
import type {ImagesType} from '../redux/reducers/artists/reducer';

type SizeType = ImagesType[number]['size'];

export const getImageBySize = (
  images: ImagesType,
  sizes: SizeType[],
): string => {
  const imagesBySize = keyBy(images, 'size');

  for (const size of sizes) {
    const image = get(imagesBySize, `${size}.#text`, '') as string;

    if (image) {
      return image;
    }
  }

  return '';
};
