import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { Button } from 'assets/css/styled';

import Dialog from 'components/Dialog';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Loader } from '@googlemaps/js-api-loader';
import back from 'assets/img/icon/ic-back.svg';
import {
  createNavbar,
  mapSearch,
  dropdownContainer,
  itemDropdown,
  searchInput,
  centeredIcon,
  centeredButton,
  addressDiv,
  floatingDiv,
} from './styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import utils from 'utils';
import useGlobalState from 'actions';
import { MAX_WIDTH } from 'constant';
const MAPS_API_PARAM = {
  key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  libraries: ['places'],
};

const AutoCompleteCustom = ({ ...props }) => {
  const { handleResult, getLocationByLatlong, mapRef } = props;
  const [value, setValue] = useState('');
  const [state] = useGlobalState();
  const handleSelect = (selected) => {
    geocodeByAddress(selected)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        if (mapRef?.map) {
          mapRef.map.panTo(latLng);
        }
        getLocationByLatlong(latLng);
      })
      .catch((error) => handleResult({ error }));
  };

  return (
    props.mapsFullLoaded && (
      <PlacesAutocomplete
        value={value}
        onChange={(val) => setValue(val)}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
            className={mapSearch}
            style={{
              width:
                state.windowWidth < MAX_WIDTH ? state.windowWidth - 28 : 472,
            }}
          >
            <TextField
              {...getInputProps({
                placeholder: 'Cari Alamat',
                className: searchInput,
              })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={props.clickMap || null}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
            <div className={dropdownContainer}>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                let className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';

                className += ` ${itemDropdown}`;

                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={i}
                  >
                    <span>{suggestion.formattedSuggestion.mainText}</span>
                    <span>{suggestion.formattedSuggestion.secondaryText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  );
};

const Maps = ({ ...props }) => {
  const { open, setOpen, setData, setIsLoad } = props;
  const [state, actions] = useGlobalState();
  const [center, setCenter] = useState({
    lat: utils.store.get('latitude')
      ? parseFloat(utils.store.get('latitude'))
      : -6.175392,
    lng: utils.store.get('longitude')
      ? parseFloat(utils.store.get('longitude'))
      : 106.827156,
  });
  const [geocoder, setGeocoder] = useState();
  const [mapsFullLoaded, setMapsFullLoaded] = useState(false);
  const [zoom] = useState(16);
  const [firstLoadLocation, setFirstLoadLocation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOutsideIndonesia, setIsOutsideIndonesia] = useState(false);
  const [selected, setSelected] = useState({});
  const [mapRef, setMapRef] = useState(null);
  const getLocationByLatlong = async (centered) => {
    setLoading(true);
    const result = await new Promise((resolve, reject) => {
      geocoder?.geocode(
        {
          location: centered,
        },
        (results, status) => {
          if (status === 'OK') {
            resolve(results);
          } else {
            reject(results);
          }
          setLoading(false);
        }
      );
    });
    if (result?.length) {
      const isIndonesia = !!result.filter(
        (item) => item?.formatted_address === 'Indonesia'
      ).length;
      if (isIndonesia) {
        setIsOutsideIndonesia(false);
        setSelected(result[0]);
      } else {
        setIsOutsideIndonesia(true);
        setSelected({
          ...selected,
          formatted_address: 'Hanya berlaku untuk wilayah Indonesia.',
        });
      }
    }
  };

  const selectLocation = async () => {
    if (!Object.keys(selected).length) {
      const result = await new Promise((resolve, reject) => {
        geocoder?.geocode(
          {
            location: center,
          },
          (results, status) => {
            if (status === 'OK') {
              resolve(results);
            } else {
              reject(results);
            }
          }
        );
      });
      if (result?.length) {
        setSelected(result[0]);
        setData(result[0]);
      }
    } else {
      setData(selected);
    }
    setOpen(false);
  };

  const handleFirstLoadMap = () => {
    if (firstLoadLocation) {
      getLocationByLatlong(center);
      setFirstLoadLocation(false);
    }
  };

  const handleLoadGMapAPI = (map) => {
    setMapRef(map);
    setIsLoad(true);
    setMapsFullLoaded(true);
  };

  useEffect(() => {
    const tempLoader = new Loader({
      apiKey: MAPS_API_PARAM.key,
      libraries: MAPS_API_PARAM.libraries,
    });

    tempLoader
      .load()
      .then((google) => {
        const tempGeocoder = new google.maps.Geocoder();
        setGeocoder(tempGeocoder);
      })
      .catch(() => {
        setSelected({
          ...selected,
          formatted_address: 'Silahkan coba beberapa saat lagi.',
        });
      });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', actions.handleWindowSizeChange);
  }, []);

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={false}
      padding={`0px`}
      getShow={setOpen}
      show={open}
    >
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <div
          className={floatingDiv}
          style={{
            width: state.windowWidth < MAX_WIDTH ? state.windowWidth - 28 : 472,
          }}
        >
          <div className='row m-0'>
            <div className={`col-12 ${createNavbar}`}>
              <a onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>
                <img src={back} alt='' />
              </a>
              <h5 className='m-0 ml-2'>Alamat</h5>
            </div>
          </div>
          <div className='row m-0'>
            <div className='col-12 m-0 p-0'>
              <AutoCompleteCustom
                mapsFullLoaded={mapsFullLoaded}
                getLocationByLatlong={getLocationByLatlong}
                mapRef={mapRef}
              />
            </div>
          </div>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: MAPS_API_PARAM.key,
            libraries: MAPS_API_PARAM.libraries,
          }}
          center={center}
          defaultZoom={zoom}
          onDrag={() => setLoading(true)}
          onDragEnd={(e) => {
            let newCenter = {
              lat: e.center.lat(),
              lng: e.center.lng(),
            };
            setFirstLoadLocation(true);
            setCenter(newCenter);
            getLocationByLatlong(newCenter);
          }}
          options={{
            scrollwheel: false,
            zoomControl: false,
          }}
          onGoogleApiLoaded={(map) => handleLoadGMapAPI(map)}
          onTilesLoaded={() => handleFirstLoadMap()}
        />
        <div className={centeredButton}>
          <Button
            fluid
            disabled={loading || isOutsideIndonesia}
            onClick={selectLocation}
          >
            <div className='w-100'>Pilih Lokasi</div>
          </Button>
        </div>
        <RoomIcon
          className={centeredIcon}
          style={{ color: 'red', fontSize: 40 }}
        />
        <div
          className={addressDiv}
          style={{
            width: state.windowWidth < MAX_WIDTH ? state.windowWidth - 28 : 472,
          }}
        >
          {loading ? (
            <CircularProgress size={15} color='primary' />
          ) : (
            selected?.formatted_address
          )}
        </div>
      </div>
    </Dialog>
  );
};

Maps.propTypes = {
  handleResult: PropTypes.func,
  getLocationByLatlong: PropTypes.func,
  mapRef: PropTypes.object,
  mapsFullLoaded: PropTypes.any,
  clickMap: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func,
  setData: PropTypes.func,
  setIsLoad: PropTypes.func,
};

AutoCompleteCustom.propTypes = {
  handleResult: PropTypes.func,
  getLocationByLatlong: PropTypes.func,
  mapRef: PropTypes.object,
  mapsFullLoaded: PropTypes.any,
  clickMap: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func,
  setData: PropTypes.func,
  setIsLoad: PropTypes.func,
};

export default Maps;
