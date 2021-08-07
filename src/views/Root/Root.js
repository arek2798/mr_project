import GlobalStyle from "../../theme/GlobalStyles";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from '../../store';
import { Provider } from 'react-redux';
import SigninView from "../SigninView/SigninView";
import DashboardView from '../DashboardView/DashboardView';
import TestsView from "../TestsView/TestsView";
import LessonsView from "../LessonsView/LessonsView";
import LessonView from "../LessonView/LessonView";
import AchievementsView from "../AchievementsView/AchievementsView";
import TestView from "../TestView/TestView";
import ProfilView from "../ProfilView/ProfilView";
import RegisterView from "../RegisterView/RegisterView";

function RootView() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <div className="app">
          <Switch>
            <Route exact path="/" component={SigninView} />
            <Route exact path="/rejestracja" component={RegisterView} />
            <Route exact path="/panel" component={DashboardView} />
            <Route exact path="/lekcje" component={LessonsView} />
            <Route exact path="/lekcje/:lessonSlug" component={LessonView} />
            <Route exact path="/testy" component={TestsView} />
            <Route exact path="/testy/:testSlug" component={TestView} />
            <Route exact path="/osiagniecia" component={AchievementsView} />
            <Route exact path="/profil" component={ProfilView} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default RootView;
