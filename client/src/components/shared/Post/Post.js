import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AuthTypes} from '../../../types';
import {remove, update} from '../../../actions/post';
import Like from './Like';
import ProfileImage from '../ProfileImage';
import Input from "../../UI/input/input";
import {removeInjection} from '../../../utils/index';
class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      newPostText: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.body !== this.props.post.body) {
      this.refs.body.innerHTML = removeInjection(this.props.post.body);
    }

  }

  componentDidMount() {
    this.refs.body.innerHTML = removeInjection(this.props.post.body);
  }

  onDelete = () => {
    if (window.confirm('Are you sure?')) {
      this.props.remove(this.props.post._id)
    }
  };
  onChangePost = () => {
    this.setState((prevState) => ({
      isChange: !prevState.isChange
    }))
  };
  onCheckInjection = (text) =>{

  }
  onSubmitPost = (event) => {
    event.preventDefault();
    const {update, post: {_id}} = this.props;
    const {newPostText} = this.state;
    update(_id, newPostText);
    this.onChangePost()
  }

  onChangeInput = (event) => {
    this.setState({newPostText: event.target.value})
  };

  render() {
    const {post, auth, TYPE} = this.props;
    const {isChange, newPostText} = this.state;

    const isAuthAndOwn = auth.isAuthenticated && auth.user.name === post.user.name;
    const date = new Date(post.createdDate).toDateString();
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <Link to={`/user/${post.user._id}`}>
                  <ProfileImage user={post.user} width="50"/>
                </Link>
              </div>
              <div className="ml-2">
                <div className="h5 m-0">{post.user.name}</div>
                <div className="h7 text-muted">
                  <i className="fa fa-clock-o"/> {date}
                </div>
              </div>
            </div>
            {isAuthAndOwn && (
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" type="button" id="drop"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                  {/*todo: add update post */}
                  <a className="dropdown-item" role="button" onClick={this.onDelete}>Remove</a>
                  <a className="dropdown-item" role="button" onClick={this.onChangePost}>Change</a>
                </div>
                {isChange &&
                (
                  <React.Fragment>
                    <button onClick={this.onChangePost}>X</button>
                      <form onSubmit={this.onSubmitPost}>
                        <Input type='text' value={newPostText} onChange={this.onChangeInput}/>
                      </form>
                  </React.Fragment>
                  )
                }
              </div>
            )}
          </div>
        </div>
        <div className="card-body" ref="body"/>
        <div className="card-footer">
          <Like postId={post._id} likes={post.likes} TYPE={TYPE}/>
          <Link to={`/post/${post._id}`} className="card-link">
            <i className="fa fa-arrow-right"/>
          </Link>
        </div>
      </div>
    );
  }
}


Post.propTypes = {
  remove: PropTypes.func.isRequired,
  post: PropTypes.shape({
    comments: PropTypes.array,
    likes: PropTypes.array,
    createdDate: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      createdDate: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired, // todo: find out what is it!
      _id: PropTypes.string.isRequired,
    })
  }),
  auth: AuthTypes,
  TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps, {remove, update})(Post)
