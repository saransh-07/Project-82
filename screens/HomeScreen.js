import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';


export default class HomeScreen extends Component{
  
  constructor(){
    super()
    this.state = {
      requestedItemsList : [],
      userId : firebase.auth().currentUser.email,
    }
  this.requestRef= null
  }

  getRequestedItemsList =()=>{
    
    this.requestRef = db.collection("items")
    .onSnapshot((snapshot)=>{
      var requestedItemsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedItemsList : requestedItemsList,
       
      });
    })
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(item_name,item_description)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()

    db.collection('cart').add({
        "user_id": userId,
        "item_name":item_name,
        "item_description":item_description,
        
    })
  }

  componentDidMount(){
   
    this.getRequestedItemsList()
    
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.item_description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        
        rightElement={
            <TouchableOpacity style={styles.button}
             onPress = {() => {
              
                this.addRequest(item.item_name, item.user_id)
              //  this.addRequest(item.item_description, item.item_description)
              //  this.addRequest(item.name, item.description)
              //  this.addRequest(item.item_name, item.item_description)
              }}>
              <Text style={{color:'#ffff'}}>Add to Cart</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="All In One Store" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Items in the store</Text>
              </View>
            )
            :(
              
              <FlatList
                  keyExtractor={this.keyExtractor}
                  
                  data={this.state.requestedItemsList}
                  renderItem={this.renderItem}

                
                  //data={this.state.userId}
                  //renderItem={this.renderItem}

                  //data={this.state.requestedItemsList}
                  //renderItem={this.requestedItemsList}

                  //data={this.state.renderItem}
                  //renderItem={this.renderItem}

              />
              
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#008B8B",
  }
})
