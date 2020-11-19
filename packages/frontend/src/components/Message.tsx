import React from "react";
import styles from "./Message.module.css";

export enum MessageType {
  INFO = "info",
  ERROR = "error",
  NONE = "",
}
console.log(styles);

export const Message: React.FC<{
  // react function component als type, nimmt properties entgegen und rendert diese raus
  type?: MessageType; // ? weil message type ist optional, ansonsten ohne ? ist message type Pflicht
}> = ({ children, type = MessageType.NONE }) => {
  // type = MessageType.NONE default value die das überprüfen nicht benötigt (Kommentar darunter wird unnötig)
  return <div className={`message ${styles[type]}`}>{children}</div>; //überprüfe ob type definiert => type ? `message ${type}` : message , ansonsten nur message
};
