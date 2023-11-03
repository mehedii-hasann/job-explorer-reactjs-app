import { useContext, useEffect, useState , useRef} from 'react';
import { JobContext } from '../App';
import tickImg from '../tickImg.svg';
const ProfileModal = ({children})=>{
    const {appliedJobs, handleApplyJob,savedJobs,handleSavedJob, handleModalData,deleteFromAppliedJob,deleteFromSavedJob} = useContext(JobContext);
    const closeProfileModalRef = useRef();
    return (
        <div>
            <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title text-center">Dashboard</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={e=>closeProfileModalRef.current=e}></button>
                    </div>
                    <div class="modal-body">
                        <div className='row'>
                            <div className='col-md-6 text-center'>
                                <h5>Applied Jobs :{appliedJobs.length>0 ? appliedJobs.length : '0'}</h5>
                                <hr/>
                                <div>
                                    {appliedJobs.length>0 ? <ul>{appliedJobs.map(job=>{
                                        return <><li onClick={()=>{
                                            handleModalData(job);
                                            closeProfileModalRef.current.click()
                                        }} style={{cursor: 'pointer',margin:'10px',display:'inline'}} data-bs-toggle="modal" data-bs-target="#exampleModal">{job.title}</li><button className='btn btn-outline-danger rounded' onClick={()=>deleteFromAppliedJob(job.id)}>Delete</button><br/><br/></>
                                    })}</ul> : ''}
                                </div>
                            </div>
                            <div className='col-md-6 text-center' style={{borderLeft:'1px solid black'}}>
                            <h5>Saved Jobs :{savedJobs.length>0 ? savedJobs.length : '0'}</h5>
                                <hr/>
                                <div>
                                    {savedJobs.length>0 ? <ul>{savedJobs.map(job=>{
                                        return <><li onClick={()=>{
                                            handleModalData(job);
                                            closeProfileModalRef.current.click()
                                        }} style={{cursor: 'pointer',margin:'10px',display:'inline'}} data-bs-toggle="modal" data-bs-target="#exampleModal">{job.title}</li><button className='btn btn-outline-danger rounded' onClick={()=>deleteFromSavedJob(job.id)}>Delete</button><br/><br/></>
                                    })}</ul> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-relative">
                    </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ProfileModal