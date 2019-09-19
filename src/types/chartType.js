import { shape, string, arrayOf } from 'prop-types';
import coordinateType from './coordinateType';

export default shape({
  color: string.isRequired,
  coordinates: arrayOf(coordinateType),
});
