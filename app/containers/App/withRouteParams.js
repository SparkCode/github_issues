import queryString from 'query-string';
import { withProps } from 'recompose';

export default withProps(({ match: { params }, location: { search } }) => ({
  ...params,
  ...queryString.parse(search),
}));
