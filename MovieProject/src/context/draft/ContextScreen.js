import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import {Context as BlogContext} from '../hookAndContext/BlogContext'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContextScreen = ({navigation}) =>  {
    const {state , addBlogPost, deleteBlogPost} = useContext(BlogContext);

    return (
        <View>
            <Button title="Add Post" onPress={addBlogPost}/>
            <FlatList 
                keyExtractor={blogPost => blogPost.title}
                data={state}
                renderItem={({item})=> {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ShowScreen', {id: item.id})}>
                             <View style={styles.blogContainer}>
                            <Text style={styles.titleStyle}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <FontAwesome5Icon style={styles.trashIcon} name="trash" />
                            </TouchableOpacity>
                        </View>
                        </TouchableOpacity>
                    )}
                }
            />
        </View>
    )
}

export default ContextScreen;

const styles = StyleSheet.create({
    blogContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        paddingVertical: 20, borderColor: 'gray', borderTopWidth: 2, borderBottomWidth: 2
    },
    titleStyle: {
        fontSize: 18
    },
    trashIcon: {
        fontSize: 24,
        marginRight: 10
    }
})
