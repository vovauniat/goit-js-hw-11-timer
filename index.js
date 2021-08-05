class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      timerId: document.querySelector('#timer-1'),
      days: document.querySelector('[data-value="days"]'),
      hours: document.querySelector('[data-value="hours"]'),
      minutes: document.querySelector('[data-value="mins"]'),
      seconds: document.querySelector('[data-value="secs"]'),
    };
  }
  setTimer() {
    this.intervalId = setInterval(() => {
      const startDate = new Date();
      const delta = this.targetDate - startDate;

      this.updateTimer(this.getTimeComponents(delta));
      this.stopTimer(delta);
    }, 1000);
  }
  stopTimer(time) {
    if (time <= 0) {
      clearInterval(this.intervalId);
      this.refs.timerId.insertAdjacentHTML('beforebegin', '<h1 class="text">Time expired!</h1>');
      this.refs.days.textContent = '00';
      this.refs.hours.textContent = '00';
      this.refs.seconds.textContent = '00';
      this.refs.minutes.textContent = '00';
    }
  }
  updateTimer({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.seconds.textContent = `${secs}`;
    this.refs.minutes.textContent = `${mins}`;
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// ================= new timer ================= //

const test = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 17, 2021'),
});

test.setTimer();