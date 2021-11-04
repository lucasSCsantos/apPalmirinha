import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasEmProgresso from './pages/ReceitasEmProgresso';
import Detalhes from './pages/Detalhes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarPorIngredientes from './pages/ExplorarPorIngredientes';
import ExplorarPorOrigem from './pages/ExplorarPorOrigem';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <div className="meals">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Comidas } />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route
              exact
              path="/explorar/comidas"
              component={ ExplorarComidas }
            />
            <Route
              exact
              path="/explorar/bebidas"
              component={ ExplorarBebidas }
            />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarPorIngredientes }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarPorIngredientes }
            />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarPorOrigem }
            />
            <Route exact path="/comidas/:id" component={ Detalhes } />
            <Route exact path="/bebidas/:id" component={ Detalhes } />
            <Route
              exact
              path="/comidas/:id/in-progress"
              component={ ReceitasEmProgresso }
            />
            <Route
              exact
              path="/bebidas/:id/in-progress"
              component={ ReceitasEmProgresso }
            />
            <Route
              path="*"
              component={ NotFound }
            />
          </Switch>
        </div>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
