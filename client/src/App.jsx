import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.scss'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data)
      })
  }, []);

  const setStatusClass = (status) => {
    if (status === "Safe") return "green";
    if (status === "Caution") return "orange";
    return "red";
  };

  return (
    <main>
      <h1>Rideau Canal Skateway Dashboard</h1>
      {data.map(item => (
        <div key={item.id} className="dataItem">
          <h2>{item.loaction}</h2>
          <p className={setStatusClass(item.safetyStatus)}>Status: {item.safetyStatus}</p>
          <p>Avg Ice Thickness: {item.AvgIceThickness} cm</p>
          <p>Surface Temp: {item.AvgSurfaceTemperature} °C</p>
          <p>Snow: {item.MaxSnowAccumulation} cm</p>
        </div>
      ))}
    </main>
  )
}

export default App
