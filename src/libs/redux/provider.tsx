import { Provider } from 'react-redux';
import { store } from './store';

export const AppProvider = (props: React.PropsWithChildren) => (
  <Provider store={store}>{props.children}</Provider>
);
