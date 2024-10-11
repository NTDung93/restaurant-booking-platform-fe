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
      console.log('Geolocation is not supported by your browser');
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
          console.log('Unable to retrieve your location');
          resolve({ searchNearBy: false });
        },
      );
    }
  });
