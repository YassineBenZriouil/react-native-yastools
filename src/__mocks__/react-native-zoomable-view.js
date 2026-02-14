const React = require('react');
const { View } = require('react-native');
const ReactNativeZoomableView = (props) => React.createElement(View, { ...props, testID: 'zoom-view-mock' });
module.exports = { ReactNativeZoomableView };
