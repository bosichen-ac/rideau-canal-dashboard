import { useEffect, useState } from 'react'
import './App.scss'
import ArticleCard from './ArticleCard';
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [errMsg, setErrMsg] = useState("")
  
  
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/analytics")
      const data = await res.json()
      setData(data)
    } catch (err) {
      setErrMsg(err)
    } finally {
      setLoading(false)
      setErrMsg("")
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])


  const dataByLocation = {
    "Dow's Lake": [],
    "Fifth Avenue": [],
    "NAC": []
  }
  data.forEach(e => {
    if (dataByLocation[e.location]) {
      dataByLocation[e.location].push(e)
    }
  })


  const dataLastHour = data.filter(d => {
    const now = new Date()
    const t = new Date(d.windowEnd)
    return now - t <= 60 * 60 * 1000
  })

  const dataLastHourByLocation = {
    "Dow's Lake": [],
    "Fifth Avenue": [],
    "NAC": []
  }
  dataLastHour.forEach(e => {
    if (dataLastHourByLocation[e.location]) {
      dataLastHourByLocation[e.location].push(e)
    }
  })

  const getDowsLakeData = (prop) => {
    return {
      labels: dataLastHourByLocation["Dow's Lake"].map(d => new Date(d.windowEnd).toLocaleTimeString()),
      datasets: [
        {
          label: prop,
          data: dataLastHourByLocation["Dow's Lake"].map(e => e[prop]),
        }
      ]
    }
  }

  const getFifthAveData = (prop) => {
    return {
      labels: dataLastHourByLocation["Fifth Avenue"].map(d => new Date(d.windowEnd).toLocaleTimeString()),
      datasets: [
        {
          label: prop,
          data: dataLastHourByLocation["Fifth Avenue"].map(e => e[prop]),
        }
      ]
    }
    
  }

  const getNACData = (prop) => {
    return {
      labels: dataLastHourByLocation["NAC"].map(d => new Date(d.windowEnd).toLocaleTimeString()),
      datasets: [
        {
          label: prop,
          data: dataLastHourByLocation["NAC"].map(e => e[prop]),
        }
      ]
    }
  }


  const overallStat = () => {
    if (data.some(d => d.safetyStatus === "Unsafe")) return "Unsafe"
    if (data.some(d => d.safetyStatus === "Caution")) return "Caution"
    return "Safe"
  }

  const setStatusClass = (status) => {
    if (status === "Safe") {
      return "green"
    } else if (status === "Caution") {
      return "orange"
    }
    return "red"
  }

  if (errMsg) {
    return (
      <main>
        <h1>Rideau Canal Skateway Dashboard</h1>
        <h2>Error: {errMsg}</h2>
      </main>
    )
  }


  if (loading) {
    return (
      <main>
        <h1>Rideau Canal Skateway Dashboard</h1>
        <h2>Loading...</h2>
      </main>
    )
  }


  return (
    <main>
      <h1>Rideau Canal Skateway Dashboard</h1>
      <div id='overallStatus' className={setStatusClass(overallStat())}>
        Overall system status: {overallStat()}
      </div>
      <div className='grid'>
        <div className='col'>
          <h2>Dow's Lake</h2>
          <ArticleCard dataItem={dataByLocation["Dow's Lake"][0]} setStatusClass={setStatusClass} />
        </div>
        <div className='col'>
          <h2>Fifth Avenue</h2>
          <ArticleCard dataItem={dataByLocation["Fifth Avenue"][0]} setStatusClass={setStatusClass} />
        </div>
        <div className='col'>
          <h2>NAC</h2>
          <ArticleCard dataItem={dataByLocation["NAC"][0]} setStatusClass={setStatusClass} />
        </div>
      </div>
      <div>
        <h3>Historical Data</h3>
        <div className='grid'>
          <div className='col'>
            <h4>Dow's Lake</h4>
            <Line data={getDowsLakeData("AvgIceThickness")} />
            <Line data={getDowsLakeData("AvgSurfaceTemperature")} />
            <Line data={getDowsLakeData("MaxSnowAccumulation")} />
          </div>
          <div>
            <h4>Fifth Avenue</h4>
            <Line data={getFifthAveData("AvgIceThickness")} />
            <Line data={getFifthAveData("AvgSurfaceTemperature")} />
            <Line data={getFifthAveData("MaxSnowAccumulation")} />
          </div>
          <div>
            <h4>NAC</h4>
            <Line data={getNACData("AvgIceThickness")} />
            <Line data={getNACData("AvgSurfaceTemperature")} />
            <Line data={getNACData("MaxSnowAccumulation")} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
