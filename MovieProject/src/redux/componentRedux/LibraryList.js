import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LibraryList extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        console.log(this.props)
        return (
            <View>
                <Text> prop </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { dataToShow : state.libraries}
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList)
