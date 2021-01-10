import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';
import SwipeItem from '../components/SwipeItem';
import { NavigationEvents } from 'react-navigation';
import StartModal from '../components/guide/StartModal';
import GuideContext from '../context/guide/guideContext';

const YearBalanceScreen = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  const authContext = React.useContext(AuthContext);
  //context destruct
  const { getPresets, year, presets, addMonth, setYear, month } = presetContext;
  const { isAuthenticated, user } = authContext;
  const { setUserExited, exitedguide } = React.useContext(GuideContext);
  //state
  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    presets === null && isAuthenticated && user && getPresets();
  }, [year, isAuthenticated, user, presets]);

  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    if (newindex > 6) {
      //swipe right
      addMonth('January');
      navigation.navigate('Month');
    } else if (newindex < 6) {
      setYear(parseInt(year) - 1);
      navigation.navigate('Month', { fromYear: 'December' });
    }
  };
  const [isFocused, setFocus] = React.useState(true);
  const notFocus = () => {
    setFocus(false);
  };
  const doFocus = () => {
    setFocus(true);
    getPresets();
  };

  return (
    <>
      <NavigationEvents onWillFocus={doFocus} onWillBlur={notFocus} />
      {/* guidemodal */}
      {!exitedguide && <StartModal navigation={navigation} user={user} setUserExited={setUserExited} />}

      {isFocused && (
        <FlatList
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          data={[
            { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
            { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
            { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
            { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
            { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
            { month: year.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
            { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
            { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
            { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
            { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
            { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
            { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
            { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
          ]}
          onScrollEndDrag={changeMonthList} // runs when movement finished
          snapToInterval={414}
          snapToAlignment={'start'}
          decelerationRate='fast'
          initialScrollIndex={6}
          horizontal
          keyExtractor={(item) => item.month}
          renderItem={(data) => {
            return (
              <View>
                <SwipeItem
                  // navigation={navigation} // problem keeping yearbalancescreen loaded in bg on monthscreen?
                  month={data.item.month}
                  key={data.item.month}
                  index={data.index}
                  activeindex={5}
                  monthlist={[
                    { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
                    { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
                    { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
                    { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
                    { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
                    { month: year.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
                    { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
                    { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
                    { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
                    { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
                    { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
                    { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
                    { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
                  ]}
                />
              </View>
            );
          }}
          getItemLayout={(data, index = 12) => {
            // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
            return { length: 414, offset: 414 * index, index };
          }}
        />
      )}
    </>
  );
};

export default YearBalanceScreen;
