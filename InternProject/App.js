import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Dimensions, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList, StyleSheet, Text, TouchableHighlight, View, Modal } from 'react-native';

export default function App() {

  const [count,setCount] = useState(0) 
  const [visible,setVisible] = useState(false)
  const [rejectRemark,setRejectRemark] = useState();
  const [data,setData] = useState([
                  { mobile: '8888888888',id: '1',earning: '1000',action: 'pending',sel: false},
                  { mobile: '9999999999',id: '2',earning: '500',action: 'pending',sel: false},
                  { mobile: '1000000000',id: '3',earning: '200',action: 'pending',sel: false},
                  { mobile: '1212121212',id: '4',earning: '500',action: 'pending',sel: false},
                  { mobile: '4534532344',id: '5',earning: '1000',action: 'pending',sel: false},
                  { mobile: '7777777777',id: '6',earning: '1200',action: 'pending',sel: false},
                  { mobile: '6666666666',id: '7',earning: '1300',action: 'pending',sel: false},
                  { mobile: '5555555555',id: '8',earning: '1400',action: 'pending',sel: false},
                    ])


  const countHandler = (id,item) => {
    if(item.action === 'approve') ToastAndroid.show('This mobile no. is already approved',ToastAndroid.LONG)
    else if(item.action === 'reject') ToastAndroid.show('This mobile no. is already rejected',ToastAndroid.LONG)
    else if(item.action === 'pending')
    setData(data.map(x => {
      if (x.id === id) {
        if(x.sel) setCount(count-1)
        else setCount(count+1) 
        return {...x,sel:!x.sel}}
      return x
    }))
  }

  const approveHandler = () => {
    const approvedmobileNo = []
    if(count>0) {
    setData(data.map(x => {
      if(x.sel) {
        approvedmobileNo.push({mobile: x.mobile,id: x.id,earning:x.earning,action: 'approve'})
        return {...x,action: 'approve',sel:false}
      }
      else return x
    }))
  }
  setCount(0)
  console.log(approvedmobileNo);
  }

  const rejectHandler = () => {
    if (count>0 && count<2)
      setVisible(true)
  }

  const submitHandler = () => {
    const rejectedMobileNo = []
    setData(data.map(x => {
      if(x.sel) {
        rejectedMobileNo.push({mobile: x.mobile,id: x.id,earning:x.earning,action: 'reject',remark: rejectRemark})
        return {...x,action: 'reject',sel: false}
      }
      else return x
    }))
    setVisible(false)
    setCount(0)
    setRejectRemark('')
    console.log(rejectedMobileNo)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Modal animationType="slide" 
                   transparent visible={visible} 
                   presentationStyle="overFullScreen">
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Rejection remark" 
                                   value={rejectRemark} style={styles.textInput} 
                                   onChangeText={(value) => setRejectRemark(value)} />
                        <View style={{flexDirection: 'row', width: '100%',justifyContent: 'space-between' }}>
                        <Text onPress={submitHandler} style={styles.Button}> Submit </Text>
                        <Text onPress={e => setVisible(false)} style={styles.Button}> Close </Text>
                        </View>
                    </View>
                </View>
            </Modal>
         <View style={styles.top}>
                  <Text style={{flex: 1.5,fontSize: 16}}> Molbile no. </Text>
                  <Text style={{flex: 0.8,fontSize: 16}}> Id </Text>
                  <Text style={{flex: 1,fontSize: 16}}> Earning </Text>
                  <Text  style={{flex: 1,fontSize: 16}}> Action </Text>
                </View>
                
         <FlatList style={styles.List}
            data={data}
            renderItem={({item}) => { return <KeyboardAvoidingView>
              <TouchableHighlight
              style={{...styles.row,backgroundColor: item.sel ? '#e8f6fe' : '#fff'}} 
              onPress={e =>  countHandler(item.id,item)} underlayColor= '#e8f6fe'>
                        <>
                                    <Text style={{flex: 1.5,fontSize: 15}}> {item.mobile} </Text>
                                    <Text style={{flex: 0.8,fontSize: 15}}> {item.id} </Text>
                                    <Text style={{flex: 1,fontSize: 15}}> {item.earning} </Text>
                                    <Text style={{flex: 1,fontSize: 15}}> {item.action} </Text>
                                    </>
                      </TouchableHighlight>
            </KeyboardAvoidingView>
            }
              }
        />
       <View style={styles.bottom}>
         <Text onPress={approveHandler}
         style={{...styles.Button,backgroundColor: count>0 ?'green' : '#90EE90'}}> Approve </Text>
         <Text onPress={rejectHandler}
         style={{...styles.Button,backgroundColor: count>0 && count<2 ? 'red' : '#ffcccb'}}> Reject </Text>
        </View> 
    </View>
  );
}


const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {

    width: '100%',
    marginBottom: 5,
    backgroundColor: '#f2f2f2'
  },
  List: {
    width: '100%',
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    height: 50,
    alignContent: 'center'
  },
  top: {
    backgroundColor: '#f2f2f2',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  Button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 3,
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    flex: 1,
    margin: 10,
    backgroundColor: '#01b0ff',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
},
  bottom: {
  flexDirection: 'row',
  justifyContent:'space-between',
  width: '100%',
  borderTopColor: '#aaa',
  borderTopWidth: 1
},
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
},
modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
                { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 30
},
textInput: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
},
});
