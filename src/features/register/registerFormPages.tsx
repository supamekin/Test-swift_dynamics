
import { Provider } from 'react-redux';
import { store } from '../../shared/store';
import RegisterForm from './registerPages';

const registerFormPages = () => {
  return (
    <Provider store={store}>
        <RegisterForm />
    </Provider>
  );
};

export default registerFormPages;
