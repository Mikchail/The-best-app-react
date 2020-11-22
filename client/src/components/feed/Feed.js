import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {AuthTypes} from '../../types'
import { getAll as getAllSubscriptions } from '../../actions/subscription'
import Loader from '../shared/Loader'
import Posts from '../shared/Posts'

class Feed extends Component {

  componentDidMount() {
    this.props.getAllSubscriptions({
      subscriber: this.props.auth.user.id
    })
  }

  render() {
    const { isLoading, subscriptions } = this.props.subscription;
    console.log(subscriptions)
    return !isLoading ? (
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {subscriptions.length !== 0 ? (
            <Posts queryParams={{
              users: subscriptions.map((s) => s.profile).join(',')
            }} />
          ) : (
            <div className="text-center">
              <h2>You have no subscriptions</h2>
            </div>
          )}
        </div>
      </div>
    ) : <Loader />
  }
}

Feed.propTypes = {
  getAllSubscriptions: PropTypes.func.isRequired,
  subscription: PropTypes.object.isRequired,
  auth: AuthTypes
}

const mapStateToProps = (state) => ({
  subscription: state.subscription,
  auth: state.auth
})

export default connect(mapStateToProps, { getAllSubscriptions })(Feed)