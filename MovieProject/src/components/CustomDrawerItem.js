import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Drawer } from 'react-native-paper';

// const CustomDrawerItem = ({id, label, icon, navigation, naviTo, updateDrawerStatus, status}) => {
//     const [active, setActive] = useState(1);
//   return (
//     <View>
//       <DrawerItem
//         icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
//         label={label}
//         onPress={() => {
//           navigation.navigate(`${naviTo}`);
//           updateDrawerStatus(id);
//           setActive(id);
//         }}
//         active={active === id}
//         focused={status}
//         activeBackgroundColor="pink"
//         inactiveBackgroundColor="white"
//         activeTintColor="black"
//         inactiveTintColor="gray"
//       />
//     </View>
//   );
// };

// export default memo(CustomDrawerItem);

const CustomDrawerItem = ({id, label, icon, navigation, naviTo}) => {
  const [active, setActive] = useState(1);
  return (
    <View>
      <Drawer.Item
        icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
        label={label}
        onPress={() => {
          navigation.navigate(`${naviTo}`);
          setActive(id);
        }}
        active={active === id}
      />
    </View>
  );
};

export default memo(CustomDrawerItem);
