import React, { Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import incomeData from "./candidates"
import WinnerScreen from "./winnerScreen";
const { width, height } = Dimensions.get('window')
function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
class PlayScreen extends Component {
    constructor(props) {
        super(props)
        let candidatesData = incomeData.filter(candidate=>candidate.gender === props.navigation.getParam('gender'))
        let firstId = between(0, candidatesData.length)
        let secondId = between(0, candidatesData.length)
        while (secondId === firstId) {
            secondId = between(0, candidatesData.length)
        }
        this.state = {
            gameOver: false,
            candidatesData: candidatesData,
            failedCandidates: [],
            activeWinnerId: NaN,
            gameLenght: between(5, 10),
            roundsCounter: 0,
            leftCurrentPlayer: candidatesData[firstId],
            rightCurrentPlayer: candidatesData[secondId]
        }
        this.changePlayer = this.changePlayer.bind(this)
        this.addFailedCandidate = this.addFailedCandidate.bind(this)
        this.finishTheGame = this.finishTheGame.bind(this)
        this.switchFailedCandidate = this.switchFailedCandidate.bind(this)
    }
    generateRandomCandidateFromRemaining() {
        const initialIdsArray = this.state.candidatesData.map(candidate => candidate.id)
        const arrayWithRemainingCandidates = initialIdsArray.filter(candidateId =>
            ![...this.state.failedCandidates, this.state.activeWinnerId].includes(candidateId))
        return arrayWithRemainingCandidates[between(0, arrayWithRemainingCandidates.length)]
    }
    finishTheGame() {
        this.setState(state => {
            return { gameOver: true }
        })
    }
    addFailedCandidate(id) {
        this.setState((state) => {
            return { failedCandidates: [...state.failedCandidates, id] };
        });
    }
    changePlayer(idOfWinner, idOfLooser) {
        this.addFailedCandidate(idOfLooser)
        this.setState((state) => {
            return { activeWinnerId: idOfWinner };
        }, () => this.switchFailedCandidate());
    }
    switchFailedCandidate() {
        const randomId = this.generateRandomCandidateFromRemaining()
        if (typeof randomId === 'undefined' || this.state.roundsCounter === this.state.gameLenght) {
            this.finishTheGame()
            return
        }
        this.setState(state => {
            const candidate = this.state.candidatesData.find(cand => cand.id === randomId)
            return (state.activeWinnerId === state.leftCurrentPlayer.id ?
                { rightCurrentPlayer: candidate, roundsCounter: state.roundsCounter + 1 } :
                { leftCurrentPlayer: candidate, roundsCounter: state.roundsCounter + 1 })
        })
    }

    render() {
        return (!this.state.gameOver ?
            <View style={styles.container}>
                <View style={styles.titleContainer}></View>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity onPress={
                        () => this.changePlayer(this.state.leftCurrentPlayer.id,
                            this.state.rightCurrentPlayer.id)}
                        style={styles.cardContainer}>
                        <Image style={styles.image} source={this.state.leftCurrentPlayer.pic} />
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.leftCurrentPlayer.name}</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => this.changePlayer(this.state.rightCurrentPlayer.id,
                            this.state.leftCurrentPlayer.id)}
                        style={styles.cardContainer}>
                        <Image style={styles.image} source={this.state.rightCurrentPlayer.pic} />
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.rightCurrentPlayer.name}</Text></View>
                    </TouchableOpacity>
                </View>
            </View> : <WinnerScreen id={this.state.activeWinnerId} />
        );
    }
}
export default PlayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#88deb0"
    },
    titleContainer: {
        position: "absolute",
        width: width,
        height: width,
        borderRadius:150,
        marginTop:-180,
        alignItems: "center",
        backgroundColor: "white",
        alignItems:"center",
        justifyContent:"center"
    },
    titleText: {
        fontSize: 35,
        color: "#ef6d55",
        fontWeight: "bold"
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: width,
        height: width+30,
        marginTop:"50%"
    },
    cardContainer: {
        width: "48%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        justifyContent: "center"
    },
    image: {
        alignSelf: 'center',
        height: 180,
        width: 180,
        borderWidth:4,
        borderColor:"#69c6af",

    },
    textContainer: {
        height: 30,
        width: "100%",
        alignItems: "center",
        backgroundColor:"#69c6af"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textTransform: "capitalize"
    }
});