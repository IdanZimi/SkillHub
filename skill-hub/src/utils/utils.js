import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export function showNotification(type, title, message){
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 200,
        dismiss: {
            duration: 2500,
            onScreen: true
        }
    });
}
