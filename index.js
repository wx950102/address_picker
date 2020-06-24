import React, { Component } from 'react';
import area from './area.json';
import Picker from 'react-native-picker';
import { View } from 'react-native';

export default function AddressSelect(props) {
  if (props.isSHQ) {
    const { defaultValue, onConfirm, closeModel, refs } = props;
    const data = createAreaData();
    Picker.init({
      pickerData: data,
      selectedValue: defaultValue || ['北京', '北京'],
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '关闭',
      pickerTitleText: '选择地区',
      pickerBg: [255, 255, 255, 255],
      pickerToolBarBg: [255, 255, 255, 255],
      pickerConfirmBtnColor: [20, 20, 20, 1],
      pickerCancelBtnColor: [20, 20, 20, 1],
      pickerFontColor: [33, 33, 33, 1],
      onPickerConfirm: (pickedValue) => {
        onConfirm(pickedValue);
      },
      onPickerCancel: (pickedValue) => {
        Picker.hide();
        closeModel(pickedValue);
      },
      onPickerSelect: pickedValue => {
        console.log('select', pickedValue);
      }
    });
    refs(Picker);
    Picker.show();
  } else {
    Picker.hide();
  }
  return <View />;
}

function createAreaData() {
  let data = [];
  let len = area.length;
  for (let i = 0; i < len; i++) {
    let city = [];
    for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
      let _city = {};
      _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
      city.push(_city);
    }
    let _data = {};
    _data[area[i]['name']] = city;
    data.push(_data);
  }
  return data;
}
