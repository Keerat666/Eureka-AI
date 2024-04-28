import Home from './pages/home/index'; // Assuming MyComponent is in a separate file
import Footer from './components/footer'
import HeaderPanel from './components/header'


function App() {
  return (
    <div>
      <HeaderPanel></HeaderPanel>
      <Home>
      </Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
