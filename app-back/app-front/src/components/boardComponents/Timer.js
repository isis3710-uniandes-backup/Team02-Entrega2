const React = require('react')
class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0, isOn: false})
  }
  render() {
    // eslint-disable-next-line
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
      // eslint-disable-next-line
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
      // eslint-disable-next-line
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
      // eslint-disable-next-line
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    return(
      <div>
        <h3>timer: {this.state.time/1000}s</h3>
        {start}
        {resume}
        {stop}
        {reset}
      </div>
    )
  }
}
module.exports = Timer