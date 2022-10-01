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
import {EmptyView, ErrorView, LoadingView} from '../../../components';

const FormsListView = () => {
  const ctx = useFormsListContext();
  console.log('-->', ctx.values.data.length > 0);
  return (
    <View style={styles.container}>
      {ctx.values.loading && <LoadingView />}
      {ctx.values.error && (
        <ErrorView
          message={JSON.stringify(ctx.values.error)}
          onPress={() => ctx.setters.setError(null)}
        />
      )}

      <FlatList
        data={ctx.values.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FormItem
            item={item}
            onAccess={ctx.functions.onAccessForm}
            onSend={ctx.functions.onSendForm}
          />
        )}
        ListEmptyComponent={() => <EmptyView />}
        contentContainerStyle={{flexGrow: 1}}
      />
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
