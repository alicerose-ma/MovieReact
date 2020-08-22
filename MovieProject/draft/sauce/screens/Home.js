import React , {memo} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux' 

export const  componentName = (props) => {
    return (
        <View style={styles.container}>
            <Text>This is home</Text>
        </View>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    // requestName: () => dispatch()
})

export default connect(mapStateToProps, mapDispatchToProps)(memo( componentName));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})