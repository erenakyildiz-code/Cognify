import './App.css';
import Home from './pages/index.tsx';
import ContractForm from './pages/articleCalculator';
import ContentGenerator from './pages/contentGenerator/contentGemerator';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home/>} >
            
          </Route>
          <Route path="/articleCalculator" element={<ContractForm></ContractForm>}>
            
          </Route>
          <Route path="/contentGenerator" element={<ContentGenerator></ContentGenerator>}>
            
          </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
