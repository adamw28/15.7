function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Stopwatch extends React.Component{
    constructor(display) {
        super(display);

        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false,
            results: [],
            watch: null
        }
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            })
        }
    }
    step() {
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

        miliseconds++;

        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }

        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        this.setState({
            times: {
                miliseconds,
                seconds,
                minutes
            }
        })
    }

    stop() {
        clearInterval(this.state.watch);
        this.setState({
            running: false,
            watch: null,
            results: [...this.state.results, this.format(this.state.times)]
        });
    }
    
    reset(){
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 
            }
        })
    }

    resetList() {
        this.setState({
            results: []
        });
    }


    renderTime(currentTime, key){
        return (<li key={key}>{currentTime}</li>)
    }

    render(){
        return (
            <div>
                <nav className="controls">
                  <a href="#" className="button" id="start" onClick={this.start.bind(this)}>Start</a>
                  <a href="#" className="button" id="stop" onClick={this.stop.bind(this)}>Stop</a>
                  <a href="#" className="button" id="reset" onClick={this.reset.bind(this)}>Reset</a>
                  <a href="#" className="button" id="resetlisty" onClick={this.resetList.bind(this)}>Reset listy</a>
                </nav>
                <div className="stopwatch">{this.format(this.state.times)}</div>
                <ul className="results">
                    {this.state.results.map( (time, key) => this.renderTime(time, key))}
                </ul>
            </div>
        )
    }
}


ReactDOM.render(<Stopwatch />, document.getElementById('app'));