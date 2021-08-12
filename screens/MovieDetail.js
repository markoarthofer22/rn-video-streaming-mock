import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { ProgressBar } from '../components';

import { FONTS, COLORS, SIZES, icons } from '../constants';

const MovieDetail = ({ navigation, route }) => {
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    React.useEffect(() => {
        let { selectedMovie } = route.params;
        setSelectedMovie(selectedMovie);
    });

    const renderIcon = (icon, callback) => (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                width: 50,
                height: 50,
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: COLORS.transparentBlack,
            }}
            onPress={callback}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                }}
            />
        </TouchableOpacity>
    );

    const renderHeaderSection = () => {
        return (
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height:
                        SIZES.height < 700
                            ? SIZES.height * 0.6
                            : SIZES.height * 0.7,
                }}
            >
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: Platform.OS == 'ios' ? 40 : 20,
                            paddingHorizontal: SIZES.padding,
                        }}
                    >
                        {/* back button */}
                        {renderIcon(icons.left_arrow, () =>
                            navigation.goBack()
                        )}

                        {/* share button */}
                        {renderIcon(icons.upload, () => console.log('shared!'))}
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={[COLORS.transparent, COLORS.black]}
                            style={{
                                width: '100%',
                                height: 250,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.h4,
                                }}
                            >
                                {selectedMovie?.details?.season}
                            </Text>

                            <Text
                                style={{
                                    marginTop: SIZES.base,
                                    color: COLORS.white,
                                    ...FONTS.h1,
                                }}
                            >
                                {selectedMovie?.name}
                            </Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        );
    };

    const renderCategory = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                        {selectedMovie?.details?.age}
                    </Text>
                </View>
                <View
                    style={[
                        styles.categoryContainer,
                        { paddingHorizontal: SIZES.padding },
                    ]}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                        {selectedMovie?.details?.genre}
                    </Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Image
                        source={icons.star}
                        resizeMode="contain"
                        style={{ width: 15, height: 15 }}
                    />
                    <Text
                        style={{
                            marginLeft: SIZES.base,
                            color: COLORS.white,
                            ...FONTS.h4,
                        }}
                    >
                        {selectedMovie?.details?.ratings}
                    </Text>
                </View>
            </View>
        );
    };

    const renderMovieDetails = () => {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                flex: 1,
                                color: COLORS.white,
                                ...FONTS.h4,
                            }}
                        >
                            {selectedMovie?.details?.currentEpisode}
                        </Text>

                        <Text
                            style={{
                                color: COLORS.lightGray,
                                ...FONTS.body4,
                            }}
                        >
                            {selectedMovie?.details?.runningTime}
                        </Text>
                    </View>

                    <ProgressBar
                        containerStyle={{ marginTop: SIZES.radius }}
                        barStyle={{ height: 5, borderRadius: 3 }}
                        barPercentage={selectedMovie?.details?.progress}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom:
                            Platform.OS === 'ios' ? SIZES.padding * 2 : 0,
                        borderRadius: 15,
                        backgroundColor: COLORS.primary,
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            textTransform: 'uppercase',
                        }}
                    >
                        {selectedMovie?.details?.progress === '0%'
                            ? 'watch now'
                            : 'continue watch'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                backgroundColor: COLORS.black,
            }}
            style={{ backgroundColor: COLORS.black }}
        >
            {renderHeaderSection()}

            {/* Ratings */}
            {renderCategory()}

            {/* details */}
            {renderMovieDetails()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.gray1,
        borderRadius: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
    },
});

export default MovieDetail;
