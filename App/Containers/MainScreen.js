import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import GroupActions from '../Redux/GroupRedux'

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  componentWillMount () {
    this.props.getTodaysDaily()
  }
  render () {
    const { daily } = this.props
    if (daily !== null) {
      const ludiCategories = daily.data[0].ludiCategories
      return (
        <View>
          <Text>
            { ludiCategories[0].name }
          </Text>
          <Text>
            { ludiCategories[1].name }
          </Text>
          <Text>
            { ludiCategories[2].name }
          </Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    daily: state.group.daily
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodaysDaily: () => dispatch(GroupActions.requestDaily('2017-4-11'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
