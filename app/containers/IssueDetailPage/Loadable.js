/**
 * Asynchronously loads the component for IssueDetailPage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index' /* webpackChunkName: "issue-detail-page" */),
  loading: () => null,
});
