import React from 'react'

const ModalBodyJob = (props) => {
    const {title,description,fixed_price,hourly,hrs_week,level,other,post_time,responsibilities,skills,skillsAndExpertise,work_type,duration} = props.card_data;
    return  <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h5 class="modal-title" id="exampleModalLabel">{title}</h5><br />
                        {post_time ? <p>Posted : {((Date.now()-post_time)/1000 < 60) ? <span>{Math.round((Date.now()-post_time)/1000)} seconds ago</span> : <span>{Math.round((Date.now()-post_time)/60000)} minutes ago</span>}</p> : ''}
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="card-subtitle mb-2 text-muted">
                            {(skillsAndExpertise && skillsAndExpertise.length>0) ? skillsAndExpertise.map(data=>{
                                return <span className="badge bg-secondary m-1">{data}</span>
                            }) : ''}
                        </h6>
                        <hr/>
                        {description && description.length>0? <div className="row">
                            <div className="row text-center m-1"><b>Description</b></div>
                            <div className="row p-2"><span>{description}<hr/></span></div>
                        </div>:''}
                        {responsibilities && responsibilities.length>0? <div className="row">
                            <div className="row text-center m-1"><b>Responsibilities</b></div>
                            <div className="row p-2"><ul>{responsibilities.map(res=>{
                                return <li>{res}</li>
                            })}<hr/></ul></div>
                        </div>:''}
                        {skills && skills.length>0? <div className="row">
                            <div className="row text-center mb-1"><b>Skills</b></div>
                            <div className="row"><ul className="m-2">{skills.map(res=>{
                                return <li>{res}</li>
                            })}<hr/></ul></div>
                        </div>:''}
                        <div className="row">
                            <div className="col text-center">
                                    {fixed_price ? <div>
                                        <div className="row text-center">${fixed_price}</div>
                                        <div className="row text-center">Fixed Price</div>
                                    </div>: <div>
                                        <div className="row text-center">${hourly}</div>
                                        <div className="row text-center">Hours/Week :{hrs_week}</div>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
}

export default ModalBodyJob