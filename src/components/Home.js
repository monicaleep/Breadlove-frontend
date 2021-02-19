import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Header from './Header'
import {getAllBread} from '../services/bread.service'

const Home = () => {
  const [breadData, setBreadData] = useState()
  useEffect(()=>{
    getAllBread().then(res=>{
      setBreadData(res.data)
    })
  },[])
  const display = () => {

}

return (
  <Header/>
)
}


export default Home;
