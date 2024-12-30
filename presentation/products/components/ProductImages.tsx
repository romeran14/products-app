import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'

interface Props{
    images: string[]
}

const ProductImages = ({ images }:Props) => {

    if (images.length === 0) {
        return (
            <View
              style={{

                justifyContent: 'center',
                alignItems: 'center',
              
              }}
             >
                <Image 
                   style={{ width: 300, height: 300, marginHorizontal: 5, borderRadius: 5 , overflow:'hidden'}}
                   source={ require('../../../assets/images/no-product-image.png')}/>
            </View>
        )
    }

  return (
  
                <FlatList
                    data={images}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{ width: 300, height: 300, marginHorizontal: 5, borderRadius: 5 }}
                        />
                    )}
                />
            )
 
  
}

export default ProductImages