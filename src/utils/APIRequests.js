import axios from 'axios';
import QueryString from 'qs';

import API, {targetAPI, secretToken} from '../constants/API';

const uploadImage2 = async img => {
  try {
    var data = QueryString.stringify({
      'secretToken': 'kedikldtr20accesstoken22',
      base64image: img,
    });

    var config = {
      method: 'post',
      url: API.uploadImage,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const response = await axios(config);
    const result = await response.data;

    console.log(result);
    if (result.status === 'success') {
      return `${targetAPI}\\${result.fileName}`;
    }
  } catch (error) {
    throw error;
  }
};
export default {
  uploadImage: uploadImage2,
};
