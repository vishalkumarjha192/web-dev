import UserProvider from "./UserProvider";
import Navbar from "./Navbar";

function App() {
  return (
    <UserProvider>      
      <Navbar />       
    </UserProvider>
  );
}

export default App;
