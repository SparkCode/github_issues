/**
 * Asynchronously loads the component for IssueDetail
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "issue-detail" */),
  loading: () => null,
});
