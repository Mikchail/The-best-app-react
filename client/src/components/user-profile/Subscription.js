import React,{Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {AuthTypes} from '../../types';
import { create, getAll, remove } from '../../actions/subscription'

class Subscription extends Component {

  componentDidMount() {
    this.props.getAll({ profile: this.props.userId })
  }

  onSubClick = (event) => {
    event.preventDefault()
    const { subscription: { subscriptions }, auth, userId } = this.props
    if (!auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      const existedSub = subscriptions.find((s) => s.subscriber === auth.user.id)
      if (existedSub) {
        this.props.remove(existedSub._id)
      } else {
        this.props.create({ profile: userId })
      }
    }
  }

  render() {
    const { subscriptions, isLoading } = this.props.subscription
    return !isLoading && (
      <button
        className="btn btn-dark btn-block subscribe-btn"
        onClick={this.onSubClick}
      >
        Subscribe | <i className="fa fa-users"></i> {subscriptions.length}
      </button>
    )
  }
}

Subscription.propTypes = {
  create: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  auth: AuthTypes,
  subscription: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  subscription: state.subscription
})

export default connect(mapStateToProps, {
  create, getAll, remove
})(withRouter(Subscription))
