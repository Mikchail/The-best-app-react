import React,{Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { UPDATE_POST } from '../../actions/typesActions'
import { getById as getPostById } from '../../actions/post'

import Loader from '../shared/Loader'
import Post from '../shared/Post'
import Comment from './Comment'
import CommentForm from './CommentForm'
import {AuthTypes,PostsTypes} from '../../types';


class SinglePost extends Component {

  componentDidMount() {
    this.props.getPostById(this.props.match.params.id)
  }

  componentDidUpdate(nextProps) {
    // if (!nextProps.post.isLoading && nextProps.post.post === null) {
    //   this.props.history.push('/404')
    // }
  }

  render() {
    const { auth, post } = this.props;
    console.log( this.props)
    return !post.isLoading && post.post !== null ? (
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <Post post={post.post} TYPE={UPDATE_POST} />
          <div className="col-md-12 mx-auto">
            {auth.isAuthenticated && <CommentForm postId={post.post._id} />}
            {post.post.comments.map((c) => (
              <Comment comment={c} postId={post.post._id} key={c._id} />
            ))}
          </div>
        </div>
      </div>
    ) : <Loader />
  }
}

SinglePost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PostsTypes,
  auth: AuthTypes
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getPostById })(SinglePost)
