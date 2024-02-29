import { Dimensions } from 'react-native';

export const { width: screenWidth } = Dimensions.get('window');
export const height = Dimensions.get('window').height;
export const isTablet = screenWidth >= 768;

export const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);
