import React, { useState, useEffect, useRef } from 'react';

interface Alarm {
  id: number;
  time: string;
}

const AlarmClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAlarms = () => {
      alarms.forEach((alarm) => {
        if (alarm.time === currentTime.slice(0, 5)) {
          playAlarm();
        }
      });
    };

    checkAlarms();
  }, [currentTime, alarms]);

  useEffect(() => {
    audioRef.current = new Audio('/src/alarm.mp3');
  }, []);

  const addAlarm = () => {
    if (newAlarmTime) {
      setAlarms([...alarms, { id: Date.now(), time: newAlarmTime }]);
      setNewAlarmTime('');
    }
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="alarm-clock glass-effect">
      <div className="current-time">{currentTime}</div>
      <div className="alarm-input">
        <input
          type="time"
          value={newAlarmTime}
          onChange={(e) => setNewAlarmTime(e.target.value)}
          className="glass-input"
        />
        <button onClick={addAlarm} className="set-btn">✓</button>
      </div>
      <div className="alarm-list">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="alarm-item glass-effect">
            <span>{alarm.time}</span>
            <button onClick={() => deleteAlarm(alarm.id)} className="glass-btn delete-btn">
              X
            </button>
          </div>
        ))}
      </div>
      <button onClick={stopAlarm} className="glass-btn stop-alarm">STOP</button>
    </div>
  );
};

export default AlarmClock;