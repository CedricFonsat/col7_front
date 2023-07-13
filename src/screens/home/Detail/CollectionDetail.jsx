import React, { useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, Image } from 'react-native'
import Size from '../../../constants/Size'
import Colors from '../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from '../../../components/Card'
import { BlurView } from 'expo-blur'

const HEADER_HEIGHT = 300;

const CollectionDetail = ({navigation, route}) => {

    const {itemId} = route.params

    const dataMe = {
        email: 'Axie@gmail.com',
        username: 'Axie',
        image: 'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/257218235/original/5516cb5c85fbf3a1df3a293f62dbf78a3e78f960.png'
    }

    const data = [
        { id: '1', name: 'AAAAA', price: 200, image: 'https://cdnb.artstation.com/p/assets/images/images/049/713/917/large/nft-artist-screenshot-20220520-214533.jpg?1653142270'
    },
        { id: '2', name: 'BBBB', price: 200, image: 'https://cdnb.artstation.com/p/assets/images/images/049/713/917/large/nft-artist-screenshot-20220520-214533.jpg?1653142270'
    },
        { id: '3', name: 'CCC', price: 600,  image: 'https://cdnb.artstation.com/p/assets/images/images/049/713/917/large/nft-artist-screenshot-20220520-214533.jpg?1653142270'
    },
        { id: '4', name: 'jjjjjjj', price: 800 ,  image: 'https://cdnb.artstation.com/p/assets/images/images/049/713/917/large/nft-artist-screenshot-20220520-214533.jpg?1653142270'
    },
        { id: '5', name: 'SSS', price: 200, image: 'https://cdnb.artstation.com/p/assets/images/images/049/713/917/large/nft-artist-screenshot-20220520-214533.jpg?1653142270'
    }
      ];

   // const {data: dataMe, error: errorMe, isLoading: loadingMe} = useMeQuery()

  //  const { data, error, isLoading } = useGetCardsQuery();
  
  
  const leftButton = ({ navigation }) => {
    return (
      <TouchableOpacity style={{
        width: 50,
        height: 50,
        borderRadius: Size.xl,
        backgroundColor: Colors.primary, 
        justifyContent: 'center',
        alignItems: 'center', 
        borderColor: Colors.borderColor,
        borderWidth: 1,
        overflow: 'hidden',
        zIndex: 99999
      }}
      onPress={() => navigation.goBack()}
      activeOpacity={0.8}
      //onPress pour faire un goBack avec navigation
      >
        {/* <Image style={{
          width: 20,
          height: 20,
          tintColor: Colors.white,
        }} source={arrow} /> */}
  
       <Text style={{
         color: 'white',
         fontSize: Size.fs24
       }}>GO</Text>
      </TouchableOpacity>
    )
  }
  
  const renderHeaderBar = () => {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 90,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 10
        }}>
            {/* Screen Overlay */}
            <Animated.View  style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'black',
                opacity: scrollY.interpolate({
                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
                    outputRange: [0, 1]
                })
            }}/>
  
            {/* Header Bar Title */}
            <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 10,
                opacity: scrollY.interpolate({
                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                    outputRange: [0, 1]
                }),
                transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [50, 0],
                            extrapolate: 'clamp'
                        })
                    }
                ]
            }}
            >
                <Text style={{color: 'gray'}}> {itemId}</Text>
                <Text style={{color: 'white', fontWeight: 'bold'}} >
         new collection
                </Text>
            </Animated.View>
  
            {/* Back Button */}
            {/* <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 35,
                width: 35,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'rgba(0,0,0,.2)'
            }}
            onPress={() =>
              //console.log("Go BACK")
              navigation.goBack()
              }
            >
                <Image
                source={arrow}
                 style={{
                    width: 15,
                    height: 15,
                    tintColor: 'gray'
                }}/>
  
            </TouchableOpacity> */}
  
            {/* Bookmark */}
            {/* <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 35,
                width: 35
            }}>
                <Image source={bookmark}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white'
                }}
                />
            </TouchableOpacity> */}
  
        </View>
    )
  }
  
  const renderHeader = () => {
    return (
      <View style={{
        width: width,
        height: 100,
       // backgroundColor: Colors.secondary,
        position: 'absolute',
        justifyContent: 'flex-end',
        paddingHorizontal: Size.default,
        zIndex: 999
      }}>
        {leftButton({ navigation })}
      </View>
    )
  }
  
  
      //const { data, error, isLoading } = useGetPokemonByNameQuery()
      
     // const { data: queryData} = useMeQuery();
  
     // console.log(queryData, 'hhhhh');
    
      const renderItems = ({item , index}) => {
        return  (
          <Card  key={item.id} name={item.name} price={item.price}
            bid="flex"
            image={{
              uri: item.image
             }}
          //   onPress={handleSubmit} 
            />
        );
      };
  
      const scrollY = useRef(new Animated.Value(0)).current;
      
        const renderCollectionHeader = () => {
          return (
            <View
              style={{
                marginTop: -1000,
                paddingTop: 1000,
                alignItems: "center",
                overflow: "hidden"
              }}
            >
                
              {/* Background Image */}
              <Animated.Image
                source={{
                  uri: dataMe.image
                }}
                resizeMode="contain"
                style={{
                  height: HEADER_HEIGHT,
                  width: "200%",
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                      }),
                    },
                    {
                      scale: scrollY.interpolate({
                        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        outputRange: [2, 1, 0.75],
                      }),
                    },
                  ],
                }}
              >
              </Animated.Image>
  
           
          
      
        
         <BlurView intensity={70} tint="white" style={{
             position: 'absolute',
             width: width * 0.9,
             height: 60,
             borderRadius: Size.xs,
             overflow: 'hidden',
           //  backgroundColor: Colors.white,
             justifyContent: 'center',
             alignItems: 'center',
             bottom: 20
         }}>
             <Text style={{
               fontSize: Size.fs24,
               fontWeight: Size.w600,
               color: Colors.white
             }}> {itemId}</Text>
             </BlurView>
             
            </View>
          );
        };
  

  return (
    <View style={styles.container}>
       <Animated.FlatList
        data={data}
        renderItem={renderItems}
        numColumns={2}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}  
            {/* Probable emplacement de SharedElement */}
            {renderCollectionHeader()} 
          
            {/* Title */}
            <View style={{
              height: 100,
              width: width,
              alignItems:'center'
            }}>
            </View>
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />

      {renderHeader()}
   
        {/* Header Bar */}
        {renderHeaderBar()}


   
    </View>
  )
}

export default CollectionDetail

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 200,
    },
    card:{
      width: width / 2.5,
      height: height / 3.5,
      backgroundColor: Colors.secondary,
      borderRadius: Size.littleMargin,
      justifyContent: 'center',
      alignItems: 'center',
      margin: Size.defaultMargin
    },
    imageCard: {
      width: 50,
      height: 50
    }
  });