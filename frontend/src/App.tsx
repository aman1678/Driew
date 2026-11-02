import Card from "./components/Card";
import Header from "./Header";
import Home from "./pages/Home";

const DRAMAS = ["Darenijaat", "Kafeel", "Sharpasand"];

function App() {
  return (
    <div>
      <Header/>
      <div className="drama-cards">
        {DRAMAS.map((d:string) => (
          <Card key={d} drama={d}/>
        ))}
      </div>
      <Home/>
    </div>
  );
}

export default App;