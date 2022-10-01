import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useHomeContext} from '../context/context';
import Screens from '../../../constants/Screens';
import {useAuthContext} from '../../../store/AuthContext';
import {useLanguageContext} from '../../../store/LanguageContext';
import {LanguageSelector} from '../../../components';

import Images from '../../../constants/Images';

const DEFAULT_ICON = 'ios-key-sharp';
const ACTIVE_ICON = 'ios-folder-open';

const {width} = Dimensions.get('window');
const isMobile = width < 650;

const HeaderView = () => {
  const [vkey, setVkey] = React.useState(Math.random());

  const ctx = useHomeContext();
  const authCtx = useAuthContext();
  const langCtx = useLanguageContext();
  const {getVal} = langCtx.functions;

  const DEFAULT_LABEL = getVal('login');
  const ACTIVE_LABEL = getVal('forms');

  React.useEffect(() => {
    setVkey(Math.random());
  }, [authCtx.values.token]);

  const onAccess = () => {
    const targetScreen = authCtx.values.token
      ? Screens.forms_folders
      : Screens.sign_in;
    ctx.functions.navigator(targetScreen, {
      nextScreen: Screens.forms_folders,
    });
  };

  return (
    <View
      style={[
        styles.container,
        isMobile && {
          flexDirection: 'column',
          height: 'auto',
        },
      ]}
      key={vkey}>
      <LanguageSelector
        containerStyle={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}
        activeLang={langCtx.values.activeLanguage}
        setActiveLang={langCtx.functions.changeLanguage}
      />
      <View style={[!isMobile && styles.left_container]}>
        <Image
          style={[!isMobile ? styles._icon : styles.mob_icon]}
          source={Images.logo}
        />
      </View>
      <View style={[!isMobile && styles.right_container]}>
        <TouchableOpacity
          style={isMobile ? styles.mob_login_btn : styles.login_btn}
          onPress={onAccess}>
          <Ionicons
            name={DEFAULT_ICON}
            color={Colors.shuttle_gray}
            size={27}
            style={styles.check_box_icon}
          />
          <Text style={styles.login_txt}>
            {authCtx.values.token ? ACTIVE_LABEL : DEFAULT_LABEL}
          </Text>
        </TouchableOpacity>
        {authCtx.values.token && (
          <TouchableOpacity
            style={isMobile ? styles.mob_login_btn : styles.login_btn}
            onPress={authCtx.functions.onLogout}>
            <Ionicons
              name={'ios-enter-sharp'}
              color={Colors.shuttle_gray}
              size={27}
              style={styles.check_box_icon}
            />
            <Text style={styles.login_txt}>{getVal('logout')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  container: {
    height: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',

    shadowColor: Colors.shuttle_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  right_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
  },
  left_container: {
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  login_btn: {
    backgroundColor: Colors.lavender,
    padding: 10,
    borderRadius: 8,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mob_login_btn: {
    backgroundColor: Colors.lavender,
    padding: 10,
    borderRadius: 8,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  login_txt: {
    color: Colors.shuttle_gray,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
  },
  _icon: {
    width: width * 0.4,
  },
  mob_icon: {
    width: width * 0.9,
    alignSelf: 'center',
  },
});
