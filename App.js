import React from 'react';
import { StyleSheet, Text, View,StatusBar,FlatList,TextInput,Button,Alert,Image } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ingreadient:"",
      ingreList:[]
    }
  }
  onFindHandler=()=>{
    const url = 'http://www.recipepuppy.com/api/?i='+this.state.ingreadient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        alert(` ${responseJson.results[1].thumbnail.substring(27,32)}`);
        this.setState({
          ingreList:responseJson.results
        })
      })
      .catch((error) => { 
        Alert.alert("sai roi"); 
      });    
  }
  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <View style={{height:"80%",width:"100%",backgroundColor:"pink"}}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={()=>Math.random()} 
          renderItem={({item,i}) => <View style={{width:"100%",height:"10%"}}>
          <Text>{item.title.replace(/[\r\n]/g, '')}</Text>
          <Text>{item.ingredients}</Text>
          <Image style={{width:100,height:100}} source={{uri: `http://img.recipepuppy.com/`+item.thumbnail.substring(27,item.thumbnail.length)}}/>
          {/* item.thumbnail.substring(0,5)+item.thumbnail.substring(11,28)+item.thumbnail.substring(29,37) */}
          
          </View>}
          data={this.state.ingreList}
          ItemSeparatorComponent={this.listSeparator} /> 
        </View>
        <View style={{height:"20%",width:"100%",backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
        <TextInput style={{fontSize: 18, width: 200,borderWidth:1,borderColor:"gray",backgroundColor:"white"}} placeholder='ingreadient' onChangeText={(ingreadient) => this.setState({ingreadient})} />
        <Button title="Find" onPress={this.onFindHandler} />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
