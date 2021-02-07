import MenuPage from './Components/MenuPage';
import SortingPage from './Components/SortingPage';
import SudokuPage from './Components/SudokuPage';
import PathfindingPage from './Components/PathfindingPage';
import AboutPage from './Components/AboutPage';
import React, { useState, useEffect } from 'react'
import _debounce from 'lodash.debounce'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    // eslint-disable-next-line no-unused-vars
    const [dimensions, setDimensions] = useState({height: 0, width: 0});

    useEffect(() => {
        const handleResize = _debounce(() => setDimensions({width: window.innerWidth, height: window.innerHeight}), 100)
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/sudoku">
                        <SudokuPage />
                    </Route>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/sorting">
                        <SortingPage />
                    </Route>
                    <Route path="/pathfinding">
                        <PathfindingPage 
                            dimensions={dimensions}
                        />
                    </Route>
                    <Route path="/">
                        <MenuPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
