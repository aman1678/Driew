import Card from "./Card";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header/>
      <div style={{ display: "flex", gap: "10px" }}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
}

export default App;
