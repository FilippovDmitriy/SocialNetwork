export const convertFriendValueToBoolean = (convertingValue: string) => {
    if (convertingValue === 'null') {
        return null;
    } else {
        return convertingValue === 'true';
    }
};