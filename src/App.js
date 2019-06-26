import React from 'react';
import './App.css';
import './icono.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      break: false,
      breakLength: 300,
      breakTimer: 300,
      sessionLength: 1500,
      sessionTimer: 1500,
      settings: false
    };  
  };

  componentDidMount = () => {
    document.title = `Tomatino Timer: ${this.timeFormater(this.state.sessionLength)}`;
  }

  componentDidUpdate= (prevProps, prevState) => {
    if (prevState.sessionLength !== this.state.sessionLength) {
      this.setState({ sessionTimer: this.state.sessionLength });
    };
    if (prevState.breakLength !== this.state.breakLength) {
      this.setState({ breakTimer: this.state.breakLength });
    };
    if (prevState.sessionTimer !== this.state.sessionTimer) {
      document.title = `Tomatino Timer: ${this.timeFormater(this.state.sessionTimer)}`;
    };
    if (this.state.sessionTimer === 0) {
      document.title = `Tomatino Break: ${this.timeFormater(this.state.breakTimer)}`;
    } 
  };
  
  timer = () => {
    if (!this.state.active) {
      this.timerId =  setInterval(() => {
        if (this.state.sessionTimer === 0 ) {
          this.setState({ break: true });
        }
        this.state.break ? this.breakCountdown() : this.sessionCountdown();
      }, 300)
      this.setState({active: true})
    } else {
      this.clearTimer();
    };
  };

  clearTimer = () => {
    this.setState({ active: false });
    clearInterval(this.timerId);
  };

  breakLengthHandler = (e) => {
    e.stopPropagation();
    if (e.currentTarget.id === 'break-increment' && this.state.breakLength < 3600) {
      this.setState((prevState) => ({ 
        breakLength: prevState.breakLength + 60
      }));
    } else if (e.currentTarget.id === 'break-decrement' && this.state.breakLength > 60) {
      this.setState((prevState) => ({ 
        breakLength: prevState.breakLength - 60
      }));
    };
  };

  sessionCountdown = () => {
    this.setState({ active: true, sessionTimer: this.state.sessionTimer - 1 });
  };

  breakCountdown = () => {
    this.setState({ breakTimer: this.state.breakTimer - 1 });
    if (this.state.breakTimer === 0) {
      this.setState({ break: false, sessionTimer: this.state.sessionLength, breakTimer: this.state.breakLength })
      this.sessionCountdown();
    }
  };
 
  sessionLengthHandler = (e) => {
    e.stopPropagation();
    if (!this.state.active) {
      if (e.currentTarget.id === 'session-increment' && this.state.sessionLength < 3600) {
        this.setState((prevState) => ({ 
          sessionLength: prevState.sessionLength + 60
      }));    
      } else if (e.currentTarget.id === 'session-decrement' && this.state.sessionLength > 60) {
        this.setState((prevState) => ({ 
          sessionLength: prevState.sessionLength - 60
        }));
      };
    };
  };

  timeFormater = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (min.toString().length === 1) {
      min = '0' + min;
    }
    if (sec.toString().length === 1) {
      sec = '0' + sec;
    };
    return `${min}:${sec}`;
  };

  resetHandler = () => {
    this.clearTimer();
    this.setState({
      active: false,
      break: false,
      breakLength: 300,
      breakTimer: 300,
      sessionLength: 1500,
      sessionTimer: 1500
    });
  };

  render() {
    return(
      <div className="container">
        <div className="wrapper">
          <h1>Tomatino</h1>
          <div className="timer">
            <div className="timer-display">
              <h2 id="timer-label">{this.state.break ? "Break" : "Session"}</h2>
              <p id="time-left">
                {
                  this.state.break 
                  ? this.timeFormater(this.state.breakTimer) 
                  : this.timeFormater(this.state.sessionTimer)
                }
              </p>
            </div>
            <div className="timer-controls">
              <button 
                className={`button ${this.state.active ? "pause" : "play"}`} 
                id="start_stop" 
                onClick={this.timer}
              >
              </button>
              <button 
                id="reset" 
                onClick={this.resetHandler}
              >
                <i className="icono-reset"></i>
              </button>
              <button 
                className="show-settings" 
                onClick={() => this.setState({ settings: !this.state.settings })}
              >
                <i className="icono-gear"></i>
              </button>
            </div>
          </div>
          <div className={`settings ${this.state.settings ? "show" : "hidden"}`}>
            <div className="session-settings">
              <h3 id="session-label">Session</h3>
              <p id="session-length">{this.timeFormater(this.state.sessionLength)}</p>
              <button 
                id="session-increment" 
                onClick={this.sessionLengthHandler}
              >
                <i className="icono-caretUpSquare"></i>
              </button>
              <button 
                id="session-decrement" 
                onClick={this.sessionLengthHandler}
              >
                <i className="icono-caretDownSquare"></i>
              </button>
            </div>
            <div className="break-settings">
              <h3 id="break-length">Break</h3>
              <p id="break-length">{this.timeFormater(this.state.breakLength)}</p>
              <button 
                id="break-increment" 
                onClick={this.breakLengthHandler}
              >
                <i className="icono-caretUpSquare"></i>
              </button>
              <button 
                id="break-decrement" 
                onClick={this.breakLengthHandler}
              >
                <i className="icono-caretDownSquare"></i>
              </button>
            </div>
          </div>        
        </div>
      </div>
    );
  };
};

export default App;
