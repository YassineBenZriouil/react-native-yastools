const React = require('react');
const { View } = require('react-native');
const Video = React.forwardRef((props, ref) => React.createElement(View, { ...props, ref, testID: 'video-mock' }));
module.exports = Video;
module.exports.default = Video;
