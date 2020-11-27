import {Client} from '@stomp/stompjs';
import logo from "../commons/images/icon2.png";

let client = null;
let messages = [];
let i = 0;

function connect() {
    client = new Client();
    client.configure({
        brokerURL: 'wss://medplatform-backend.herokuapp.com/socket/websocket',
        onConnect: () => {
            client.subscribe('/topic/update', msg => {
                const obj = JSON.parse(msg.body);
                let activity = obj.activity;
                i = i + 1;
                const milliseconds = obj.end - obj.start;
                const hours = `${new Date(milliseconds).getHours() - 1}`.slice(-2);
                const minutes = `${new Date(milliseconds).getMinutes()}`.slice(-2);
                //const seconds = `${new Date(milliseconds).getSeconds()}`.slice(-2);
                //const time = `${hours}:${minutes}:${seconds}`
                //console.log(time);

                if (!(activity === 'Leaving')) {
                    messages.push({
                        key: i,
                        image: logo,
                        message: 'Patient ... has been ' + activity.toLowerCase() + ' for the past ' + `${hours}` + ' hours and ' + `${minutes}` + ' minutes.',
                        detailPage: '',
                    })
                } else {
                    messages.push({
                        key: i,
                        image: logo,
                        message: 'Patient ... has been ' + activity.toLowerCase() + ' the house for the past ' + `${hours}` + ' hours ' + `${minutes}` + ' minutes.',
                        detailPage: ''
                    })
                }
                console.log(messages)
                //handleNotifications(message);
            })
        },
        onWebSocketError: (err) => {
            console.log("Cannot connect to websocket!" + err)
        }
    })
    client.activate();
}


function getMessages() {
    return messages;
}

export {
    connect,
    getMessages
}

