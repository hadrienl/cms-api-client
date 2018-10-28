import React from 'react';

export const context = React.createContext();
const { Provider } = context;

const LIGHT = 'light';
const DARK = 'dark';

const CACHE_KEY = 'theme';

export class Theme extends React.Component {
  switchTheme = theme => {
    if (theme) return this.setState({ theme });

    const { theme: prevTheme } = this.state;
    const newTheme = prevTheme === LIGHT
      ? DARK
      : LIGHT;

    this.setState({
      theme: newTheme,
    });

    global.localStorage.setItem(CACHE_KEY, newTheme);
  }

  state = {
    theme: 'light',
    switchTheme: this.switchTheme,
  };

  componentDidMount() {
    const savedTheme = global.localStorage.getItem(CACHE_KEY);
    if (savedTheme) this.switchTheme(savedTheme);
  }

  render () {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <Provider value={this.state}>
        <div className={`theme-${theme} bp3-${theme}`}>
          {children}
        </div>
      </Provider>
    );
  }
}

export default Theme;
