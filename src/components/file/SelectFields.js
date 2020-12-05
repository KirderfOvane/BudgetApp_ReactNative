import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import { theme } from '../../constants';
import SelectFieldsRow from './SelectFieldsRow';

const SelectFields = ({ csvpresets }) => {
  // State
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');
  const [selectPhase, setSelectPhase] = React.useState('description');

  // when value and description is selected, trigger this
  React.useEffect(() => {
    selectPhase === '' && console.log(description, value);
  }, [selectPhase]);

  return (
    <View style={styles.card}>
      <View style={styles.titlerow}>
        <Text style={styles.title}>Select Fields</Text>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Text style={styles.paragraph}>
          {selectPhase === 'description' ? 'Please select the description field' : 'Please select the value field'}
        </Text>
      </View>

      {/* Header-field constructed from CSV */}
      {/*     <SelectFieldsRow
        rowItem={csvpresets[0]}
        header={true}
        selectPhase={selectPhase}
        setSelectPhase={setSelectPhase}
        setValue={setValue}
        value={value}
        setDescription={setDescription}
        description={description}
      /> */}

      {/* csv-list */}
      <FlatList
        data={csvpresets}
        renderItem={(rowItem) => {
          // console.log(csvpresets.length);
          console.log(rowItem.index === 0);
          //  console.log('rowitem: ', Object.keys(rowItem.item.row)[0]);
          // return (
          /*  <FlatList
              snapToInterval={120}
              snapToAlignment={'start'}
              style={styles.table}
              horizontal={true}
              data={Object.keys(rowItem.item.row)}
              renderItem={(colItem) => { */
          // console.log(colItem.item);
          if (rowItem.index === 0) {
            // console.log(Object.keys(rowItem.item.row));
            return (
              <FlatList
                snapToInterval={120}
                snapToAlignment={'start'}
                style={styles.table}
                horizontal={true}
                data={Object.keys(rowItem.item.row)}
                renderItem={(colItem) => {
                  console.log(colItem.item);
                  return (
                    <View style={styles.col}>
                      <Text>{colItem.item}</Text>
                    </View>
                  );
                }}
              />
            );
          }
          if (rowItem.index >= 1) {
            return (
              <View style={styles.col}>
                <Text>fest</Text>
              </View>
            );
          }
          //}}
          // />
          // );
          {
            /* <SelectFieldsRow rowItem={rowItem} key={rowItem.id} presetCount={csvpresets.length} />; */
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    borderWidth: 1,
    flex: 1,
    height: 60,
    width: 120,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 10,
  },
  table: {
    flexDirection: 'row',

    overflow: 'hidden',
  },
  dropshadow: {
    overflow: 'visible',
    backgroundColor: theme.colors.light,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    paddingBottom: 5,
    borderColor: theme.colors.black,
    shadowRadius: 5,
  },
  picker: {
    //  flex: 1,
    minHeight: 75,
    maxHeight: 100,
    // paddingLeft: 15,
    paddingTop: 15,
    // borderWidth: 1,
    //  borderColor: 'green',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  incomeexpensetoggle: {
    fontSize: 19,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.light,
    marginHorizontal: 25,
    marginTop: 25,
    marginBottom: 45,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: '#2b2b2b',
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderColor: theme.colors.black,
    padding: 20,
    shadowRadius: 5,
    borderRadius: 16,
  },
  titlerow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pickerbtnFlex: {
    flex: 1,
    borderBottomWidth: 2,
    // maxHeight: 100,
    paddingTop: 5,
    borderColor: theme.colors.gray,
    // borderWidth: 2,
  },
  pickerbtn: {
    textAlign: 'left',
    fontSize: 22,
    color: theme.colors.gray,
    paddingLeft: 15,
    paddingTop: 15,
    // maxHeight: 100,
  },
  selectBtnInPicker: {
    textAlign: 'center',
    fontSize: 22,
    color: theme.colors.dark,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 150,
    borderWidth: 1,
    borderColor: theme.colors.dark,
    alignSelf: 'center',
  },

  title: {
    flex: 1,
    paddingLeft: 15,
    fontSize: theme.sizes.h2,
    fontWeight: theme.fonts.weight.semibold,
    textAlign: 'center',
  },
  input: {
    // flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 15,
    maxHeight: 100,
    minHeight: 75,
    fontSize: 22,
    color: theme.colors.dark,

    borderBottomWidth: 2,
    borderColor: theme.colors.gray,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  buttonView: {
    flex: 1,
  },
  button: {
    //marginTop: 85,
    textAlign: 'center',
    //    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.dark,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  registerbtntext: {
    color: theme.colors.light,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    backgroundColor: theme.colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: theme.sizes.base,
  },
});

export default SelectFields;
