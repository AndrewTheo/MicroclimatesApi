import useSWR from 'swr'


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {


  return (
    <h1>Weather Microclimates Api </h1>
  )
}
