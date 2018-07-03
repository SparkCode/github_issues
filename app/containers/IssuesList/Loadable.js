/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "issues-list" */),
  loading: () => null,
});
