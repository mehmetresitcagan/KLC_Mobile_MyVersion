import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useFormsListContext} from '../context/context';
import FormItem from './FormItem';
import Colors from '../../../constants/Colors';
import {EmptyView, ErrorView} from '../../../components'

const FormsListView = () => {
  const ctx = useFormsListContext();

  return (
    <View style={styles.container}>
      {ctx.values.error && <ErrorView hasButton={false}/>}
      {ctx.values.loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.shuttle_gray}
          style={styles.activity_indicator}
        />
      ) : ctx.values.data.length > 0 ? (
        <FlatList
          data={ctx.values.data}
          bounces={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexGrow: 1}}
          numColumns={2}
          renderItem={({item}) => (
            <FormItem item={item} onAccess={ctx.functions.onAccessForm} />
          )}
          ListEmptyComponent={<EmptyView/>}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default FormsListView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lavender,
    flex: 1,
  },
  activity_indicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});
