import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {debounce, get, isEmpty, isFunction, isNil} from 'lodash';
import {
  type ArtistType,
  fetchArtistsRequest,
} from '../../../redux/reducers/artists/reducer';
import {
  artistsListSelector,
  isLoadingArtistsSelector,
} from '../../../redux/reducers/artists/selectors';
import {COLORS} from '../../../constants/colors';
import useThemeColor from '../../../hooks/useThemeColor';
import {useStateToggler} from '../../../hooks/useStateToggler';
import Typography from '../../../components/Typograhy';
import Input from '../../../components/Input';

type Props = {
  initialName?: string;
  onSelectArtist?: (artist: ArtistType) => void;
  resetOnSelect?: boolean;
};

const Search = (props: Props) => {
  const {initialName = '', onSelectArtist, resetOnSelect = false} = props;

  const [inputName, setInputName] = useState<string>();
  const [isShowingSuggestions, showSuggestions, hideSuggestions] =
    useStateToggler(false);

  const dispatch = useDispatch();

  const artistsList: Nullable<ArtistType[]> = useSelector(artistsListSelector);
  const isLoading: boolean = useSelector(isLoadingArtistsSelector);

  useEffect(() => {
    setInputName(initialName);
  }, [initialName]);

  const fetchArtists = useMemo(
    () =>
      debounce((text: string) => {
        showSuggestions();
        dispatch(fetchArtistsRequest({name: text}));
      }, 300),
    [dispatch, showSuggestions],
  );

  const onChangeText = useCallback(
    (text: string) => {
      setInputName(text);
      fetchArtists(text);
    },
    [fetchArtists],
  );

  const onPressArtist = useCallback(
    (artist: ArtistType) => {
      const {name} = artist;

      if (resetOnSelect) {
        setInputName('');
      } else {
        setInputName(name);
      }

      hideSuggestions();

      if (isFunction(onSelectArtist)) {
        onSelectArtist(artist);
      }
      Keyboard.dismiss();
    },
    [hideSuggestions, onSelectArtist, resetOnSelect],
  );

  const textColor = useThemeColor('text');
  const suggestionContainerColor = useThemeColor(null, {
    light: COLORS.white,
    dark: COLORS.black,
  });

  const onClear = () => {
    onChangeText('');
  };

  const RenderSuggestions = useCallback(() => {
    if (isNil(artistsList) || !isShowingSuggestions || isLoading) {
      return null;
    }

    if (isEmpty(artistsList)) {
      return (
        <Typography.Caption1
          color={COLORS.grey}
          style={styles.absoluteContainer}>
          No results found...
        </Typography.Caption1>
      );
    }

    return (
      <ScrollView
        bounces={false}
        style={[
          styles.suggestionContainer,
          styles.absoluteContainer,
          {
            backgroundColor: suggestionContainerColor,
            borderColor: textColor,
          },
        ]}
        keyboardShouldPersistTaps="always">
        {artistsList.map((item: ArtistType, index: number) => {
          const artistName = get(item, 'name', '');

          return (
            <TouchableOpacity
              style={styles.suggestionItem}
              key={artistName + index}
              onPress={() => onPressArtist(item)}>
              <Typography.Caption1>{artistName}</Typography.Caption1>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }, [
    artistsList,
    isShowingSuggestions,
    isLoading,
    suggestionContainerColor,
    textColor,
    onPressArtist,
  ]);

  return (
    <View style={styles.container}>
      <Input
        value={inputName}
        containerStyle={styles.input}
        placeholder="Find your favourite singer..."
        onChangeText={onChangeText}
        onClear={onClear}
      />

      <RenderSuggestions />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  input: {
    marginBottom: 25,
  },

  suggestionContainer: {
    maxHeight: 180,
    width: '100%',
    borderWidth: 1,
  },

  absoluteContainer: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    top: 50,
  },

  suggestionItem: {
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
});

export default Search;
