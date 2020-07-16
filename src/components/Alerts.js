import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {
  const alertContext = React.useContext(AlertContext);
  const { alerts } = alertContext;
  console.log(alerts);
  return (
    <View>
      {alerts.length > 0 ? (
        <FlatList
          data={alerts}
          renderItem={({ alert }) => {
            return <Text>{alert.msg}</Text>;
          }}
          testID='alert'
        />
      ) : (
        <Text testID='alert'>No</Text>
      )}
    </View>
  );
};

export default Alerts;
