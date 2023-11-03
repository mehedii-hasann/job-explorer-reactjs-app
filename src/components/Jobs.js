import React, { useContext, useState } from 'react';
import { JobContext } from '../App';
import upIcon from '../caret-up.svg';
import downIcon from '../caret-down.svg';
const Jobs = () => {
  const {data,setData,modal_data,setModalData,current_time,setCurrentTime,handleModalData,Cards} = useContext(JobContext);
  const [up, setUp] = useState(true);
  const [down, setDown] = useState(false);
  const [expUp, setExpUp] = useState(true);
  const [expDown, setExpDown] = useState(false);
  // const [clearFilter, setClearFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e)=>{
    if (e.target.name==='exp_level') {
      setFilteredData(data.filter(d=>d.level===e.target.value));
    }
  }

  const clearFilter = ()=>{
    const elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
      }
    setFilteredData([]);

  }

  const filterAreaStyle = {
    backgroundColor:'white',
    borderRadius:'5px',
  }
  // console.log(filteredData)
  return (
    <>
      <div className='row'>
        <div className='col-md-3' style={filterAreaStyle}>
          <div className='d-flex flex-row-reverse mt-2'>
            <button className='btn btn-outline-danger' onClick={()=>clearFilter()}>Clear</button>
          </div>
          <div className='m-4'>
            <div className='row' onClick={()=>{
              setExpUp(prev=>!prev);
              setExpDown(prev=>!prev);
            }} style={{cursor:'pointer'}}>
              <div className='col-md-10'>
                <b>Experience Level</b>
              </div>
              <div className='col-md-2'>
                {expUp ? <img src={upIcon} alt=""/> : ''}
                {expDown ? <img src={downIcon} alt=""/> : ''}
              </div>
            </div>
            {expDown ? <div className='m-3'>
                      <p>
                        <input type="radio" name='exp_level' className='form-check-input mx-2' value='Entry level' onClick={(e)=>handleFilter(e)}/>
                        <span className=''>Entry Level</span>
                      </p>
                      <p>
                        <input type="radio" name='exp_level' className='form-check-input mx-2' value='Intermediate' onClick={(e)=>handleFilter(e)}/>
                        <span className=''>Intermediate</span>
                      </p>
                      <p>
                        <input type="radio" name='exp_level' className='form-check-input mx-2' value='Expert' onClick={(e)=>handleFilter(e)}/>
                        <span className=''>Expert</span>
                      </p>
                  </div> : ''}
          </div>
          <hr/>
          <div className='m-4'>
            <div className='row' onClick={()=>{
              setUp(prev=>!prev);
              setDown(prev=>!prev);
            }} style={{cursor:'pointer'}}>
              <div className='col-md-10'>
                <del>Budget</del><span>( fixed-price)</span>
              </div>
              <div className='col-md-2'>
                {up ? <img src={upIcon} alt=""/> : ''}
                {down ? <img src={downIcon} alt=""/> : ''}
              </div>
            </div>
            {down ? <div className='m-3'>
                      <p>
                        <input type="radio" name='fixed_price' className='form-check-input mx-2'/>
                        <span className=''>Less than $100</span>
                      </p>
                      <p>
                        <input type="radio" name='fixed_price' className='form-check-input mx-2'/>
                        <span className=''>$100 to $500</span>
                      </p>
                      <p>
                        <input type="radio" name='fixed_price' className='form-check-input mx-2'/>
                        <span className=''>$500 to $1k</span>
                      </p>
                      <p>
                        <input type="radio" name='fixed_price' className='form-check-input mx-2'/>
                        <span className=''>$1k than $5k</span>
                      </p>
                      <p>
                        <input type="radio" name='fixed_price' className='form-check-input mx-2'/>
                        <span className=''>$5k+</span>
                      </p>
                  </div> : ''}
          </div>
          <hr/>
        </div>
        
        <div className='col-md-9'>
          {filteredData.length>0 ? Cards(filteredData) :Cards(data)}
        </div>
      </div>
    </>
  )
}

// {appliedJobs.length>0 ? appliedJobs.map(job=>{if (job.id===id) {
//   console.log('if');
//   return <button className="btn btn-success" style={{position:'absolute',left:'45%'}}>Applied <img src={tickImg} style={tickImgStyle}/></button>
// }
// else{console.log('else');return <button className="btn btn-outline-success" style={{position:'absolute',left:'35%'}} onClick={()=>handleApplyJob(id)}>Aplai</button>}})
// :<button className="btn btn-outline-success" style={{position:'absolute',left:'45%'}} onClick={()=>handleApplyJob(id)}>Apply</button>}

export default Jobs