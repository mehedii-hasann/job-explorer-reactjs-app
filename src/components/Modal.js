import { useContext, useEffect, useState } from 'react';
import { JobContext } from '../App';
import tickImg from '../tickImg.svg';
import loveImg from '../heart.svg';
const Modal = ({modal_data,current_time,children})=>{
    const {id,title,description,fixed_price,partialPayRate,partial_time,level,other,post_time,responsibilities,skills,skillsTag,work_type, duration} = modal_data;
    const {appliedJobs, handleApplyJob,savedJobs,handleSavedJob} = useContext(JobContext);

    const checkIfApplied = ()=>{
        if (appliedJobs.length>0) {
            for (let i = 0; i < appliedJobs.length; i++) {
                if (appliedJobs[i].id === id) {
                    return true;
                }
            }
        }
    }
    const checkIfSaved = ()=>{
        if (savedJobs.length>0) {
            for (let i = 0; i < savedJobs.length; i++) {
                if (savedJobs[i].id === id) {
                    return true;
                }
            }
        }
    }
    const tickImgStyle = {
        height:'18px',
        width:'18px',
        marginLeft:'5px',
        marginBottom:'5px'
    }
    const loveImgStyle = {
        height:'18px',
        width:'18px',
        marginBottom:'5px'
    }

    return (
        <div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h5 class="modal-title" id="exampleModalLabel">{title}</h5><br />
                        {current_time && current_time>0 ? <p>Posted : {((current_time-post_time)/1000 < 60) ? <span>{Math.round((current_time-post_time)/1000)} seconds ago</span> : <span>{Math.round((current_time-post_time)/60000)} minutes ago</span>}</p> : ''}
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="card-subtitle mb-2 text-muted">
                            {(skillsTag && skillsTag.length>0) ? <>{skillsTag.map(data=>{
                                return <span className="badge bg-secondary m-1">{data}</span>
                            })}<hr/></> : ''}
                        </h6>
                        
                        {description && description.length>0? <div className="row">
                            <div className="row text-center m-1"><b>Description</b></div>
                            <div className="row p-2 mx-1"><span>{description}<hr/></span></div>
                        </div>:''}
                        {responsibilities && responsibilities.length>0? <div className="row">
                            <div className="row text-center m-1"><b>Responsibilities</b></div>
                            <div className="row p-2"><ul>{responsibilities.map(res=>{
                                return <li className="mx-4">{res}</li>
                            })}<hr/></ul></div>
                        </div>:''}
                        {skills && skills.length>0? <div className="row">
                            <div className="row text-center mb-1"><b>Skills</b></div>
                            <div className="row"><ul className="m-2">{skills.map(res=>{
                                return <li className="mx-2">{res}</li>
                            })}<hr/></ul></div>
                        </div>:''}
                        <div className="row px-3">
                            <div className="col text-center">
                                    {fixed_price ? <div>
                                        <div className="row text-center">{fixed_price}</div>
                                        <div className="row text-center">Fixed Price</div>
                                    </div>: <div>
                                        <div className="row text-center">{partialPayRate}</div>
                                        <div className="row text-center">{partial_time}</div>
                                    </div>}
                            </div>
                            {level ? <div className="col">
                                    <div className="row"><span>{level}</span></div>
                                    <div className="row">Experience Level</div>
                                </div> : ''}
                            {work_type ? <div className="col">
                                <div className="row"><span>{work_type}</span></div>
                                <div className="row">Location</div>
                            </div> : ''}
                            {duration ? <div className="col">
                                <div className="row"><span>{duration}</span></div>
                                <div className="row">Duration</div>
                            </div> : ''}
                        </div>
                    </div>
                    <div class="modal-footer p-relative">
                        {checkIfApplied() ? <button className="btn btn-success" style={{position:'absolute',left:'40%',marginLeft:'10px'}}>Applied <img src={tickImg} style={tickImgStyle}/></button> : <button className="btn btn-outline-success" style={{position:'absolute',left:'45%'}} onClick={()=>handleApplyJob(id)}>Apply</button>}

                        {checkIfSaved() ? <button className="btn btn-success" style={{position:'absolute',left:'55%'}}>Saved <img src={loveImg} style={loveImgStyle}/></button> : <button className="btn btn-outline-success" style={{position:'absolute',left:'55%'}} onClick={()=>handleSavedJob(id)}>Save Job</button>}
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal