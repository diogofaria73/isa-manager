import PropTypes from 'prop-types';
// import { Content, Wrapper } from './styles';

export default function AuthLayout({ children }) {
  return { children };
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
