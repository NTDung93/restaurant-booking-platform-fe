import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  DEFAULT_STATUS,
} from '@/common/constants/paginationConstant';
import {
  RESTAURANT_DETAIL_ROUTE,
  RESTAURANT_ROUTE,
} from '@/common/constants/routerConstant';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { searchLocation } from '../../thunks';
import { getUserLocation, LocationResult } from '@/utils/location';
import {
  LocationResponseLazy,
  LocationSearchCriteria,
} from '@/common/models/location';
import LocationPopupSearchItem from '@/components/restaurant-user/LocationPopupSearchItem';
import { ResponseEntityPagination } from '@/common/models/pagination';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
}

const LocationPopupSearch: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  width,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [searchNearBy, setSearchNearBy] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [responsePagination, setResponsePagination] =
    useState<ResponseEntityPagination<LocationResponseLazy>>();

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      const fetchLocation = async () => {
        try {
          const result: LocationResult = await getUserLocation();
          setSearchNearBy(result.searchNearBy);
          if (result.searchNearBy && result.location) {
            setLatitude(result.location.latitude);
            setLongitude(result.location.longitude);
          } else {
            setLatitude(null);
            setLongitude(null);
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          setSearchNearBy(false);
          setLatitude(null);
          setLongitude(null);
        }
      };

      fetchLocation();
    }
  }, [isOpen]);

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
      const locationSearchCriteria: LocationSearchCriteria = {
        pageNo: DEFAULT_PAGE_NO,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: DEFAULT_SORT_BY,
        sortDir: DEFAULT_SORT_DIR,
        status: DEFAULT_STATUS,
        searchText: searchText,
        searchNearBy: searchNearBy,
        ...(searchNearBy && latitude && longitude
          ? { latitude, longitude }
          : {}),
      };

      try {
        const resultAction = await dispatch(
          searchLocation(locationSearchCriteria),
        );

        if (searchLocation.fulfilled.match(resultAction)) {
          console.log('Search result:', resultAction.payload);
          const data: ResponseEntityPagination<LocationResponseLazy> =
            resultAction.payload;
          setResponsePagination(data);
        } else {
          console.error('Search failed:', resultAction.error);
        }
      } catch (error) {
        console.error('Error during searchLocation dispatch:', error);
      }
    }, 500), // 1 second delay before the API call is triggered
    [searchNearBy, latitude, longitude, dispatch],
  );

  useEffect(() => {
    if (searchText.trim()) {
      debouncedSearch(searchText.trim());
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, debouncedSearch]);

  const handleRestaurantDetailNavigation = () => {
    navigate(RESTAURANT_DETAIL_ROUTE);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchButtonOnClick = () => {
    if (responsePagination) {
      // navigate(RESTAURANT_ROUTE, { state: { responsePagination } });
      navigate(RESTAURANT_ROUTE);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6 mt-4 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập từ khóa"
              className="w-3/4 h-12 border border-neutral-400 rounded-l-lg px-4 text-gray-700 placeholder-gray-500"
              value={searchText}
              onChange={handleInputChange}
            />
            <button
              className="cursor-pointer w-1/4 h-12 bg-amber-600 text-white text-base font-medium flex items-center justify-center rounded-r-lg border border-neutral-400"
              onClick={handleSearchButtonOnClick}
            >
              Tìm kiếm
            </button>
          </div>

          <div className="mt-2 text-black text-2xl font-bold">
            Tìm kiếm nổi bật
          </div>

          <div
            className="mt-4 flex-1 overflow-auto"
            style={{ maxHeight: 'calc(8 * 4rem)' }}
          >
            {responsePagination && responsePagination!.content.length > 0 ? (
              responsePagination!.content.map((location) => (
                <LocationPopupSearchItem
                  key={location.id}
                  location={location}
                  onClick={handleRestaurantDetailNavigation}
                />
              ))
            ) : (
              <div className="text-gray-500">No results found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPopupSearch;
