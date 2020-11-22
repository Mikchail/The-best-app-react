import PropTypes from 'prop-types'

export const AuthTypes = PropTypes.shape({
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    exp: PropTypes.number.isRequired, // todo: find out what is it!
    iat: PropTypes.number.isRequired, // todo: find out what is it!
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
});

export const UserTypes = PropTypes.shape({
  createdDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired, // todo: find out what is it!
  _id: PropTypes.string.isRequired,
})
export const PostTypes = PropTypes.shape({
  comments: PropTypes.array,
  likes: PropTypes.array,
  createdDate: PropTypes.string,
  _id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: UserTypes
})


export const PostsTypes = PropTypes.shape({
  posts: PropTypes.array,
  totalCount: PropTypes.number,
  isLoading: PropTypes.bool,
  post: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ])
})
