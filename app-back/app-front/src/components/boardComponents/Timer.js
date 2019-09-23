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
    //console.log(props);
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

    // start Button
    let start = (this.state.time === 0) ?
      <button className = 'btn btn-primary btn-sm m-1'onClick={this.startTimer}>start</button> :
      null;

    //stop button
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button className = 'btn btn-danger btn-sm m-1' onClick={this.stopTimer}>stop</button>;

    //resume button
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button className = 'btn btn-primary btn-sm m-1' onClick={this.startTimer}>resume</button>;

    //restart button
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button className = 'btn btn-danger btn-sm m-1' onClick={this.resetTimer}>reset</button>;

    //submit button  
    let submit = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button className = 'btn btn-info btn-sm m-1' onClick={this.state.functions[2](this.state.indexP,this.state.index,this.state.time/1000)}>submit</button>

      let sec = Math.floor((this.state.time/1000)%60);
      let min = Math.floor((this.state.time/1000)/60);
      let hour = Math.floor(((this.state.time/1000)/60)/60);

    return(
      <div>
        <h3>Timer: {hour}:{min}:{sec}</h3>
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