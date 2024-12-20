import Toast from '@/components/Toast';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationResult {
  searchNearBy: boolean;
  location?: Location; // Undefined if the user denies the location request
}

export const getUserLocation = (): Promise<LocationResult> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      <Toast
        type="warning"
        message="Geolocation is not supported by your browser"
      />;
      resolve({ searchNearBy: false });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({
            searchNearBy: true,
            location: { latitude, longitude },
          });
        },
        () => {
          <Toast type="error" message="Unable to retrieve your location" />;
          resolve({ searchNearBy: false });
        },
      );
    }
  });
