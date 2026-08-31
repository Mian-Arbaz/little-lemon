import About from './components/About';
import BookingPage from './components/BookingPage';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <BookingPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
