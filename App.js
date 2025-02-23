import { use, useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHandler() {
        setModalIsVisible(true);
    }

    function endAddGoalHandler() {
        setModalIsVisible(false);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals(currentCourseGoals =>
            [...currentCourseGoals, {
                text: enteredGoalText,
                id: Math.random().toString() // flatlist looks for key, but can be done by any property name using the key extractor prop in the renderer
            }]);
        endAddGoalHandler();
    }

    function deleteGoalHandler(id) {
        setCourseGoals(currentCourseGoals => {
            return currentCourseGoals.filter((goal) => goal.id !== id);
        });
    }

    return (
        <>
            <StatusBar style='light' />
            <View style={styles.appContainer}>
                <Button title="Add new goal" color='#a065ec' onPress={startAddGoalHandler} />
                <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
                <View style={styles.goalsContainer}>
                    <FlatList data={courseGoals} keyExtractor={(item, index) => {
                        return item.id;
                    }} renderItem={(itemData) => {
                        return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />;
                    }} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        
    },
    goalsContainer: {
        flex: 5
    },
});
