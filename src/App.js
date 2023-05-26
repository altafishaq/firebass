import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Crud from './pages/Crud';

import Signupp from './pages/Signupp';
import Signinn from './pages/Signinn';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>  
                                   
            <Routes>
              
               <Route path="/crud" element={<Crud/>}/>
               <Route path="/signup" element={<Signupp/>}/>
               <Route path="/" element={<Signinn/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;