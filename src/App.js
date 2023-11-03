import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Layout from './components/Layout';
import job_data from './components/data';

const JobContext = createContext();

function App() {
  const [data, setData] = useState(job_data);
  const [modal_data, setModalData] = useState('');
  const [current_time, setCurrentTime] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedSearchKeyword, setSavedSearchKeyword] = useState([]);
  const handleModalData = (data)=>{
    setCurrentTime(Date.now());
    setModalData(data);
  }
  const handleFormSubmissionEffect = ()=>{
    setFormSubmitted(prev=>!prev)
  }

  const handleApplyJob = (id)=>{
    if (data && data.length>0) {
      data.map(job=>{
        if (job.id===id) {
          if (appliedJobs.length===0) {
            setAppliedJobs([job]);
          } else {
            setAppliedJobs(prev=>[...prev,job]);
          }
        }
      })
    }
  }

  const handleSavedJob = (id)=>{
    if (data && data.length>0) {
      data.map(job=>{
        if (job.id===id) {
          if (savedJobs.length===0) {
            setSavedJobs([job]);
          } else {
            setSavedJobs(prev=>[...prev,job]);
          }
        }
      })
    }
  }

  const handleSearchKeyword = (keyword)=>{
    if (savedSearchKeyword.length>0) {
      setSavedSearchKeyword(prev=>[...prev,keyword])
    } else {
      setSavedSearchKeyword([keyword])
    }
  }

  const deleteFromAppliedJob = (id)=>{
    setAppliedJobs(appliedJobs.filter(job=>job.id!==id));
  }
  const deleteFromSavedJob = (id)=>{
    setSavedJobs(savedJobs.filter(job=>job.id!==id));
  }

  const Cards = (data)=>{
    return  <div className='d-flex flex-wrap justify-content-center'>
                {(data && data.length>0) ? data.map(d=>{
                return <Card key={d.id} card_data = {d} handleModalData = {handleModalData}></Card>
                }) : 'No Job data available'}
            </div>
  }
  // console.log(savedSearchKeyword);
  return (
    <div className="App">
        <JobContext.Provider value={{data,setData,modal_data,setModalData,current_time,setCurrentTime,handleModalData,Cards,formSubmitted,setFormSubmitted,handleFormSubmissionEffect,searchResult, setSearchResult,appliedJobs, handleApplyJob,savedJobs,handleSavedJob, savedSearchKeyword, handleSearchKeyword,deleteFromAppliedJob,deleteFromSavedJob}}>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home></Home>} />
                      <Route path="/jobs" element={<Jobs />} />
                  </Route>
                </Routes>
            </BrowserRouter>
        </JobContext.Provider>

    </div>
  );
}

export { App, JobContext };

