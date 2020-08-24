//todo app
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform,
  Image,
  ScrollView
} from "react-native";


  
const isAndroid = Platform.OS == "android";
const viewPadding = 10;



export default class TodoList extends Component {
  
  state = {
    tasks: [],
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text});
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    // fecha y hora
    var fehcaHora = new Date().toLocaleString();
    var currentdate = new Date(); 
    var datetime = " " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: "notes: " + "[" + text + "]" + " " + fehcaHora}),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

 

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }
 
render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
      <Text style={styles.head}>--Todo_App--</Text>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="X" onPress={() => this.deleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder=" Input text and enter   :-)"
          returnKeyType="done"
          returnKeyLabel="done"
        />
        <Text>*This is todo application in react-native made by vikalp sharma(developer). </Text>
    <Text>*Enjoy this application by making notes on your mobile instead of writing.</Text>
    <Text>“If you cut a tree, you kill a life. If you save a tree, you save a life.
If you plant a tree, you plant a life.” </Text>
  
  <View style={{flex:9, alignItems:"center", justifyContent:"center"}}> 
      <Image
          source={require("./assets/IMG_20200715_134444.jpg")}
          style={{ height: 128, width: 128, borderRadius: 128/2 }}
      />
    </View>
  <View>
  <Text style={styles.vikalp}>VIKALP_SHARMA</Text>
  <Text style={styles.dev}>Developer</Text>
  </View>
      </View>
      </ScrollView>
    );
  }
}
  

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  vikalp: {
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 22,
    marginTop: 0,
    marginLeft: 22
  },
  dev: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 66
  },
  hr: {
    height: 1,
    backgroundColor: "black"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%",
    fontSize: 24
  },
  head: {
    fontSize: 45
  },
 
});
//made by vikalp sharma 