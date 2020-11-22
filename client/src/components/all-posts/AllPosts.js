import React,{Component} from 'react'
import { connect } from 'react-redux'
import {AuthTypes} from '../../types'
import PostForm from '../shared/PostForm'
import Posts from '../shared/Posts'

class AllPosts extends Component {

  render() {
    const { auth } = this.props;
    return (
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {auth.isAuthenticated && <PostForm />}
          <Posts queryParams={{}} />
        </div>
      </div>
    )
  }
}

AllPosts.propTypes = {
  auth: AuthTypes
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AllPosts)
