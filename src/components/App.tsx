import "../assets/styles/index.css"
import "../assets/styles/small.css"
import { CardsPlace } from "./Cards";
import { Stats } from "./Stats";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Settings } from "./Settings";

function App() {
  return (
    <Provider store={store}>
      <div className="root">
        <header>
          <h1>Dungeon Cards AI</h1>
        </header>
        <main>
            <Stats />
            <Settings />
            <CardsPlace />
        </main>
        <footer>
          <a target="blank" href="https://github.com/blackpawsstudio">GitHub</a>
          <a target="blank" href="https://play.google.com/store/apps/details?id=com.The717pixels.DungeonCards&hl=ru&gl=US">Original game</a>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
