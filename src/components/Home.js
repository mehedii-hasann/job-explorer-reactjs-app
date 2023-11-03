import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import collabImg from '../collab.jpeg';
import hireImg from '../hire.png';
import penImg from '../pen-solid.svg';
import clipImg from '../clipboard-user.svg';
import starImg from '../star-solid.svg';
import tickImg from '../tickImg.svg';
import { JobContext } from '../App';
const Home = (props) => {
  const {formSubmitted} = useContext(JobContext);
  const img_style = {
    height:'300px',
    width:'300px',
    border:'5px solid green',
    borderRadius:'50%',
    marginLeft:'20%'
  }
  const hire_img_style = {
    height:'200px',
    width:'500px',
    borderRadius:'10px',
  }
  const icon_img_style = {
    height:'25px',
    width:'25px',
    marginLeft:'20px',
    marginRight:'10px',
  }
  const tick_img_style = {
    height:'25%',
    width:'25%',
    position:'absolute',
    top:'20%',
    left:'35%',
  }

  return (
    <div className='position-relative'>
      {formSubmitted ? <img src={tickImg} alt="" className='' style={tick_img_style}/> : ''}
      <div className="d-flex mt-5">
        <div>
          <div className='text-success'>
            <h1>How work <br />should work</h1>
            <h3>Forget the old rules. You can have the best people.<br/>Right now.<br/>Right here.</h3>
          </div>
          {/* style={{textDecoration:'none', color:'inherit'}} */}
          <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#hireModal">Hire</button>
          <Link to='/jobs' ><button className='btn btn-outline-success m-3'>Get Hired</button></Link>
        </div>
        <div>
          <img src={collabImg} alt="" className='' style={img_style}/>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div>
          <img src={hireImg} alt="" style={hire_img_style}/>
        </div>
        <div className='text-white p-2'>
          <h2>Up your work game, it’s easy</h2>
          <div className=''>
            <p><img src={penImg} alt="" style={icon_img_style}/><span className='ml-3'>No cost to join</span></p>
            <p><img src={clipImg} alt="" style={icon_img_style}/><span className='ml-3'>Post a job and hire top talent</span></p>
            <p><img src={starImg} alt="" style={icon_img_style}/><span className='ml-3'>Work with the best — without breaking the bank</span></p>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  )
}


export default Home