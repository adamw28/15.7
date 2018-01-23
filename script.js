class Stopwatch extends React.Component{
    constructor(display) {
        super(display);
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }
    print() {
        this.display.innerText = this.format(this.times);
	}
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	start() {
    	if (!this.running) {
        	this.running = true;
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}
	step() {
    	if (!this.running) return;
    	this.calculate();
    	this.print();
	}
	calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    }
	}
	stop() {
        this.running = false;
        clearInterval(this.watch);
    	this.list(this.times);
	}
	list(times){
        ReactDOM.render(<li/>, document.getElementById('results'));
        var li = React.createClass({
            propTypes:{
                li:React.PropTypes.object.isRequired,
            },
            render: function() {
            return (
                <li>
                {this.format(this.times)}
                </li>
            );
    }
});
	}
	resetListy(){
		var results = document.getElementById('results');
		while (results.hasChildNodes()) {   
    		results.removeChild(results.firstChild);
		}
	}
}
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

var resetListyButton = document.getElementById('resetlisty');
resetListyButton.addEventListener('click', () => stopwatch.resetListy());