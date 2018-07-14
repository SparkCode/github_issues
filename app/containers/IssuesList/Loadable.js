/**
 * Asynchronously loads the component for IssuesListContainer
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "issues-list" */),
  loading: () => null,
});
