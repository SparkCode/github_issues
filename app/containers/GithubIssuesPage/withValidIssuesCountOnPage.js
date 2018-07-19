import { withProps } from 'recompose';

const withValidIssuesCountOnPage = withProps(
  ({ issuesCountOnPageOptions, issuesCountOnPage, defaultIssuesCountOnPageOption, ...props }) => ({
    issuesCountOnPage:
      issuesCountOnPageOptions.indexOf(issuesCountOnPage) !== -1 ? issuesCountOnPage : defaultIssuesCountOnPageOption,
    ...props,
  }),
);

export default withValidIssuesCountOnPage;
