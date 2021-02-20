import {useEffect, useState} from 'react'
import Header from './Header'
import BreadBox from './BreadBox'
import {getAllBread} from '../services/bread.service'

const Home = () => {
  const [breadData, setBreadData] = useState()
  useEffect(()=>{
    getAllBread().then(res=>{
      setBreadData(res.data.breads)
    })
  },[])

  const display = () => {
    return (breadData && breadData.map(bread => {
      return <BreadBox
      name={bread.name}
      imageurl={bread.imageurl}
      key={bread.id}
      description={bread.description}
      id={bread.id}
      commentCount={bread.commentCount}/>
    }))
}

return (
  <>
  <Header/>
   {display()}
  </>
)
}


export default Home;
