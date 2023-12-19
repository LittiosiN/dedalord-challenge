import { Message, MessageDB } from "./models/Message";
// Get the singleton instance of UsersDB
const testDB = () => {
  const msgDB = MessageDB.getInstance();
  
  // Add users
  const msg1: Message = { from: 'joako', to: 'fede', timestamp: Date.now().toLocaleString(), message: 'hola fede' };
  const msg2: Message = { from: 'joako', to: 'Ramon', timestamp: Date.now().toLocaleString(), message: 'hola Ramon' };
  const msg3: Message = { from: 'joako', to: 'Ramon', timestamp: Date.now().toLocaleString(), message: 'Como va?' };
  const msg4: Message = { from: 'fede', to: 'Ramon', timestamp: Date.now().toLocaleString(), message: 'hola querido!!!' };
  
  msgDB.addMessage(msg1);
  console.log("------------")
  msgDB.addMessage(msg2);
  console.log("------------")
  msgDB.addMessage(msg3);
  console.log("------------")
  msgDB.addMessage(msg4);
  
  // Get a user by username
  const joakomsg = msgDB.getMessages('joako');
  if (joakomsg) {
    console.log('joakomsg messages:', joakomsg);
  }
  console.log("------------------------------")
  const ramonmsg = msgDB.getMessages('Ramon');
  if (ramonmsg) {
    console.log('Ramon messages:', ramonmsg);
  }
  const fedemsg = msgDB.getMessages('fede');
  if (fedemsg) {
    console.log('fede messages:', fedemsg);
  }
}

export default testDB
