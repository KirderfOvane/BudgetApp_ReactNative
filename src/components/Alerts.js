import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AlertContext from '../context/alert/alertContext';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../constants';

const Alerts = () => {
  const alertContext = React.useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <View>
      {alerts.length > 0 ? (
        <FlatList
          data={alerts}
          renderItem={(alert) => {
            const type = alert.item.type;
            return (
              <View
                style={[
                  styles.alert,
                  type === 'danger' ? { backgroundColor: theme.colors.danger } : { backgroundColor: theme.colors.success },
                ]}
              >
                <AntDesign name='infocirlce' size={24} color='white' style={styles.icon} />
                <Text style={styles.text}>{alert.item.msg}</Text>
              </View>
            );
          }}
          testID='alert'
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  alert: {
    borderWidth: 2,

    paddingHorizontal: 25,
    marginHorizontal: 25,
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
  },
  text: {
    flex: 7,
    fontSize: 20,
    textAlign: 'left',
    paddingLeft: 15,
    color: 'white',
  },
  icon: {
    flex: 1,
  },
});

export default Alerts;
