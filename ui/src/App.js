import Home from './pages/home/index'; // Assuming MyComponent is in a separate file
import Footer from './components/footer'
import Header from './components/header'


function App() {
  return (
    <div>
      <Header></Header>
      <Home>
      </Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
