export default data => ({
  id: data.id,
  number: data.number,
  title: data.title,
  createdAt: data.created_at,
  body: data.body,
  issueUrl: data.html_url,
  repositoryUrl: data.repository_url,
  state: data.state,
  userLogin: data.user.login,
  userUrl: data.user.html_url,
  userAvatarUrl: `${data.user.avatar_url}`,
});
