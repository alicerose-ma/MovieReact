import React, {useState}  from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MovieScreen from './src/screens/Tab/MovieScreen';
import FavoriteScreen from './src/screens/Tab/FavoriteScreen';

const BottomTab = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'music', title: 'Music', icon: 'queue-music' },
        { key: 'albums', title: 'Albums', icon: 'album' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: MovieScreen,
        albums: FavoriteScreen,
      });
    
    return (
        <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    )
}

export default BottomTab;
