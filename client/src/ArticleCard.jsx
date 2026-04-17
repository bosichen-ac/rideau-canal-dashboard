function ArticleCard({ dataItem, setStatusClass }) {

  const round = (rawData) => {
    return rawData ? rawData.toFixed(2) : "0.00"
  }


  return (
    <div>
      <article className='dataItem'>
        <p className={setStatusClass(dataItem.safetyStatus)}>
          Status: {dataItem.safetyStatus}
        </p>
        <p>Ice Thickness: {round(dataItem.AvgIceThickness)}</p>
        <p>Surface Temperature: {round(dataItem.AvgSurfaceTemperature)}</p>
        <p>Snow Accumulation: {round(dataItem.MaxSnowAccumulation)}</p>
      </article>
    </div>
  )
}

export default ArticleCard