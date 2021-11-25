import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class AddItemsscreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      item_name:"",
      item_description:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(item_name,item_description)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('items').add({
        "user_id": userId,
        "item_name":item_name,
        "item_description":item_description,
        
    })

    this.setState({
        item_name :'',
        item_description : ''
    })

    return Alert.alert("Feedback Submitted Successfully")
  }


  render(){
    return(
        <View style={{flex:1}}>
       
          <MyHeader title="Add Items to store" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
            
             
                <TextInput
                style ={styles.formTextInput}
                placeholder={"Item Name"}
                onChangeText={(text)=>{
                    this.setState({
                        item_name:text
                    })
                }}
                value={this.state.item_name}
              />

               <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Item Description ..."}
                onChangeText ={(text)=>{
                    this.setState({
                        item_description:text
                    })
                }}
                value ={this.state.item_description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.item_name,this.state.item_description)}}
                >
                <Text>Add Item to Store</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#008B8B',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#008B8B",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
