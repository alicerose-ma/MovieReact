import React , {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Context as BlogContent} from '../hookAndContext/BlogContext';

const ShowScreen = ({route}) => {
    const {state} = useContext(BlogContent)
    const blogPost = state.find((blogPost) => blogPost.id === route.params['id'])
    return (
        <View>
            <Text>{blogPost.title}</Text>
        </View>
    )
}

export default ShowScreen

