import {HashRouter, Switch, Route} from 'react-router-dom'

import Home from './pages/Home';
import Auth from './pages/Auth';

const Routes = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth' component={Auth} />
        </Switch>
    </HashRouter>
)

export default Routes;