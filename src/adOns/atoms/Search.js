import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { BgColor } from '../../styles/colors';
import { getResponsiveValue, screenWidth } from '../../styles/responsive';

const SearchBox = (props) => {

    const { searchArray} = props
    const blurTimeoutRef = useRef(null);
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedData, setSearchedData] = useState([])

    const handleTextChange = (v) => {
        setSearchedTerm(v)
        if (v !== '') {
            let filtered = searchArray.filter(item =>
                item.toLowerCase().includes(v.toLowerCase()));
            setSearchedData(filtered)
        } else {
            setSearchedData([])
        }
    }
    const handleFocus = () => {
        handleTextChange(searchedTerm)
    }
    const handleItemSelected = (item) => {
        console.log(`ITEM ${item} IS SELECTED`)
        setSearchedTerm(item)
        setSearchedData([])
        clearTimeout(blurTimeoutRef.current);
    }
    const handleBlur = () => {
        console.log('BLURRED')
        blurTimeoutRef.current = setTimeout(() => {
            console.log('Input Blurred');
            setSearchedData([])
          }, 200);
    }
    useEffect(() => {
        console.log('SEARCH ENABLED')
        return () => {
            console.log('SEARCH DISABLED')
            setSearchedData([])
            setSearchedTerm('')
        }
    }, [])

    return (
        <View style={styles.inputContainer}>
            <Icon name='search' style={styles.icon} size={24} />
            <TextInput
                style={styles.input}
                placeholder={props.placeholder ? props.placeholder : 'Search ...'}
                placeholderTextColor='white'
                onChangeText={v => handleTextChange(v)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={searchedTerm}
            />
            <View style={styles.matchedList}>
                {searchedData.map((item, i) => {
                    return <TouchableOpacity onPress={() => handleItemSelected(item)} key={i} >
                        <Text
                            style={styles.matchedListItems}
                            >
                            {item}
                        </Text>
                    </TouchableOpacity>
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: getResponsiveValue(70, 50),
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: `black`,
        marginBottom: getResponsiveValue(40, 20),
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        position: 'relative'
    },
    icon: {
        marginRight: 10,
        color: 'white'
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'white'
    },
    matchedList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 50,
        width: '100%',
        backgroundColor: 'black',
        marginLeft: 7,
        zIndex: 5

    },
    matchedListItems: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 5,
        padding: 10,
        width: '100%'
    }
});

export default SearchBox;
