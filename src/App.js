import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      break: false,
      breakLength: 300,
      breakTimer: 300,
      sessionLength: 1500,
      sessionTimer: 1500
    };  
  };

  componentDidUpdate= (prevProps, prevState) => {
    if (prevState.sessionLength !== this.state.sessionLength) {
      this.setState({ sessionTimer: this.state.sessionLength });
    };
    if (prevState.breakLength !== this.state.breakLength) {
      this.setState({ breakTimer: this.state.breakLength });
    };
  };
  
  timer = () => {
    if (!this.state.active) {
      this.timerId =  setInterval(() => {
        if (this.state.sessionTimer === 0 ) {
          this.setState({ break: true });
        }
        this.state.break ? this.breakCountdown() : this.sessionCountdown();
      }, 1000)
    } else {
      this.clearTimer();
    }
  };

  clearTimer = () => {
    this.setState({ active: false });
    clearInterval(this.timerId);
  };

  breakLengthHandler = (e) => {
    if (e.target.innerHTML === '+ Break' && this.state.breakLength < 3600) {
      this.setState((prevState) => ({ 
        breakLength: prevState.breakLength + 60
      }));
    } else if (e.target.innerHTML === '- Break' && this.state.breakLength > 60) {
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
      this.setState({ break: false })
    }
  };
 
  sessionLengthHandler = (e) => {
    if (!this.state.active) {
      if (e.target.innerHTML === '+ Session' && this.state.sessionLength < 3600) {
        this.setState((prevState) => ({ 
          sessionLength: prevState.sessionLength + 60
      }));    
      } else if (e.target.innerHTML === '- Session' && this.state.sessionLength > 60) {
        this.setState((prevState) => ({ 
          sessionLength: prevState.sessionLength - 60
        }));
      };
    };
  
  };

  timeFormater = (seconds) => {
    const min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
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
    })
  }

  render() {
    return(
      <div className="container">
        <div className="wrapper">
          <h1>Tomatino</h1>
          <h2 id="timer-label">{this.state.break ? "Break" : "Session"}</h2>
          <p id="time-left">{this.state.break ? this.timeFormater(this.state.breakTimer) : this.timeFormater(this.state.sessionTimer)}</p>
          <h3 id="session-label">Session Length</h3>
          <p id="session-length">{this.timeFormater(this.state.sessionLength)}</p>
          <h3 id="break-length">Break Length</h3>
          <p id="break-length">{this.timeFormater(this.state.breakLength)}</p>
          <div className="settings">
            <button id="session-increment" onClick={this.sessionLengthHandler}>+ Session</button>
            <button id="session-decrement" onClick={this.sessionLengthHandler}>- Session</button>
            <button id="break-increment" onClick={this.breakLengthHandler}>+ Break</button>
            <button id="break-decrement" onClick={this.breakLengthHandler}>- Break</button>
            <button id="start_stop" onClick={this.timer}>{this.state.active ? "Pause" : "Go"}</button>
            <button id="reset" onClick={this.resetHandler}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
