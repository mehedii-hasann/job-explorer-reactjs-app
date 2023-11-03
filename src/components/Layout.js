import React, { useContext, useRef, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { JobContext } from '../App';
import checkIcon from '../check2.svg';
import logo from '../logo.svg';
import profileImg from '../user-solid.svg';
import xIcon from '../x.svg';
import HireModal from './HireModal';
import Modal from './Modal';
import ProfileModal from './ProfileModal';

const Layout = () => {

    const {data,setData,modal_data,setModalData,current_time,setCurrentTime,handleModalData,Cards,searchResult, setSearchResult, appliedJobs, savedJobs,savedSearchKeyword, handleSearchKeyword} = useContext(JobContext);
    const [showProfile, setShowProfile] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [toast, setToast] = useState(false);
    const [keyword, setKeyword] = useState('');
    const searchBtnRef = useRef();
    const searchInputRef = useRef();
    const profileImg_style = {
        height:'40px',
        width:'40px',
        position:'absolute',
        right:'0%',
        cursor:'pointer'
      }
    const handleSearch = async(e)=>{
        if (e.key == 'Enter') {
            
            let search_result = [];
            if (e.target.value!=='') {
                setKeyword(e.target.value);
                setIsSearched(true);
                for (let i = 0; i < data.length; i++) {
                    const title = (data[i].title.toLowerCase()).split(' ');
                    const desc = (data[i].description.toLowerCase()).split(' ');
                    // const tag = data[i].skillsTag.split(' ');
                    let availableInTag = false;
                    for (let j = 0; j < data[i].skillsTag.length; j++) {
                        if (data[i].skillsTag[j].toLowerCase()===(e.target.value).toLowerCase()) {
                            availableInTag = true;
                            break;
                        }
                    }
                    
                    if (title.includes((e.target.value).toLowerCase()) || desc.includes((e.target.value).toLowerCase()) || availableInTag) {
                        search_result.push(data[i]);
                    }
                }
                setSearchResult(search_result);
            }
            
            if (search_result.length>0) {
                searchInputRef.current.value ='';
                searchBtnRef.current.click();
            }
            else{
                setToast(true);
                setTimeout(()=>{
                    setToast(false);
                },3000);
            }
            // console.log(search_result);
        }
    }
    const handleShowProfile = ()=>{
        setShowProfile(true)
    }
    const handleCloseProfile = ()=>{
        setShowProfile(false)
    }
    const checkIfKeywordExist = ()=>{
        if (!savedSearchKeyword.includes(keyword)) {
            handleSearchKeyword(keyword);
            setKeyword('');
            searchInputRef.current.value ='';
        }
        setIsSearched(false);
    }
    const profileArea = {
        backgroundColor:'white',
        border:'2px solid green',
        borderRadius:'10px',
        width:'180px',
        zIndex:'1',
        position:'absolute',
        top:'10%',
        right:'10%',
        padding:'20px',
        marginTop:'45px',
        marginRight:'20px',
        boxShadow: '5px 5px 20px white'
    }
    const saveSearchStyle = {
        backgroundColor:'white',
        height:'30px',
        width:'250px',
        padding:'2px',
        border:'2px solid green',
        borderRadius:'5px'
    }
    const toastStyle = {
        backgroundColor:"white",
        height:"70px",
        width:'300px',
        border:'3px solid green',
        borderRadius:'10px',
        position:'absolute',
        top:'70%',
        boxShadow: '5px 5px 20px white'
    }
  return (
    <div>
        <div className='container position-relative'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <img src={logo} className='App-logo' alt="logo" height={100}/>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-white" aria-current="page"><Link to="/" style={{textDecoration:'none', color:'inherit'}}>Home</Link></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link text-white"><Link to="/jobs" style={{textDecoration:'none', color:'inherit'}}>Jobs</Link></a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className='position-relative'>
                    <img src={profileImg} alt="" style={profileImg_style} onClick={()=>handleShowProfile()}/>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{(appliedJobs.length)+(savedJobs.length)}</span>
                    {showProfile ? <div style={profileArea}>
                                    <div className='p-relative'>
                                        <span className=''>Hello <h5>User</h5></span>
                                        <button className='btn-close' style={{position:'absolute',top:'5%',right:'10%'}} onClick={()=>handleCloseProfile()}></button>
                                    </div>
                                    <hr/>
                                    <p className='px-2'>Applied Jobs : {appliedJobs.length}</p>
                                    <hr/>
                                    <p className='px-2'>Saved Jobs : {savedJobs.length}</p>
                                    <div data-bs-toggle="modal" data-bs-target="#profileModal" className='text-center' style={{cursor:'pointer', color:'green'}}>Expand</div>
                    </div>:''}
                </div>
            </nav>
            <div id='search-bar'>
                <div className="d-flex">
                    <input ref={e=>searchInputRef.current=e} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyDown={e=>handleSearch(e)} list='savedSearchKeyword'/>
                    <datalist id='savedSearchKeyword'>
                        {savedSearchKeyword && savedSearchKeyword.length>0 ? savedSearchKeyword.map(k=>{return <option value={k}/>}) : ''}
                    </datalist>
                </div>
                {isSearched ? <div style={saveSearchStyle} className=''>
                    Save search keyword ?
                    <img src={checkIcon} alt="" style={{height:"25px",cursor:'pointer'}} className='mx-1' onClick={()=>{checkIfKeywordExist()}}/>
                    <img src={xIcon} alt="" style={{height:"25px",cursor:'pointer'}} className='mx-1' onClick={()=>setIsSearched(false)}/>
                </div> :''}
            </div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" style={{visibility:'hidden'}} ref={e=>searchBtnRef.current=e}>Enable both scrolling & backdrop</button>
            
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                <div class="offcanvas-header">
                    <h3 class="offcanvas-title text-success mx-auto" id="offcanvasWithBothOptionsLabel">{searchResult.length>0 ? <>Found {searchResult.length} results</> : 'No result found..'}</h3>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body mx-auto">
                    {searchResult.length>0 ? 
                    <><ul>
                        {searchResult.map((result,index)=>{
                            return <li key={index} onClick={()=>handleModalData(result)} style={{cursor: 'pointer',margin:'20px'}} data-bs-toggle="modal" data-bs-target="#exampleModal" className='search-result'>{result.title}</li>
                        })}
                    </ul></> : ''}
                </div>
            </div>

            <Modal modal_data={modal_data} current_time={current_time} ></Modal>
            <HireModal/>
            <ProfileModal/>
            <Outlet/>
            <div style={{...toastStyle,visibility:!toast?'hidden':''}} className='text-center'>
                <h4 className='mt-3 text-danger'>No Job Found :(</h4>
            </div>
        </div>
    </div>
  )
}

export default Layout