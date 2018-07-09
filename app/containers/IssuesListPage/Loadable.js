/**
 * Asynchronously loads the component for IssuesListPage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "issues-list-page" */),
  loading: () => null,
});
