import React from 'react';
import Toast from 'react-native-toast-message';

function Alerts(type, head, body) {
    Toast.show({
        type: type,//'success | error | info',
        position: 'bottom',
        text1: head,
        text2: body,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
    });
}

function ErrorAlert(){
    Toast.show({
        type: 'error',//'success | error | info',
        position: 'bottom',
        text1: "Error",
        text2: 'Ha ocurrido un error intentelo otra vez.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
    });
}

export {Alerts, ErrorAlert};
