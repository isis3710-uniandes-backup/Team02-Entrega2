const React = require('react')
class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      functions: this.props.functions,
      index:this.props.index,
      indexP: this.props.indexP
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

    let start = (this.state.time === 0) ?
      <button onClick={this.startTimer}>start</button> :
      null

    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>

    let resume = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
      let submit = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.state.functions[2](this.state.indexP,this.state.index,this.state.time/1000)}>submit</button>
    return(
      <div>
        <h3>timer: {this.state.time/1000}s</h3>
        {start}
        {resume}
        {stop}
        {reset}
        {submit}
      </div>
    )
  }
}
module.exports = Timer