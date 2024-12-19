import albumsReducer, {
  moduleName as albumsReducerModuleName,
} from './reducers/albums/reducer';
import artistsReducer, {
  moduleName as artistsReducerModuleName,
} from './reducers/artists/reducer';

export default {
  [albumsReducerModuleName]: albumsReducer,
  [artistsReducerModuleName]: artistsReducer,
};
