import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
const ReivewSkeleton = ({number = 3} : {number : number}) => {
  return (
    <div className="flex flex-col gap-5 pl-5 pb-4 mt-5 ">
      {[...Array(number)].map(placeholder => ( 
            <div key={placeholder}> 
              <Skeleton width={150}/>
              <Skeleton width={100}/>
              <Skeleton count={2}/>

            </div>  
          ))}
          </div>
  )
}

export default ReivewSkeleton