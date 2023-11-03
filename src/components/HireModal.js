import React, { useContext, useRef, useState } from 'react';
import { JobContext } from '../App';
import '../App.css';

const HireModal = () => {
    const {data, setData, setCurrentTime,formSubmitted,setFormSubmitted,handleFormSubmissionEffect} = useContext(JobContext);
    const [input_validate, setInput] = useState(false);
    const [resInputNum, setResInputNum] = useState(['r']);
    const [skillsInputNum, setSkillsInputNum] = useState(['s']);
    const [skillsTagInput, setSkillsTagInput] = useState(['t']);
    const [fixedPayChecked, setFixedPayChecked] = useState(false);
    const [partialPayChecked, setPartialPayChecked] = useState(false);
    const [jobDescription, setJobDescription] = useState();

    const closeModalRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const fixedPayRef = useRef();
    const partialPayRateRef = useRef();
    const durationValueRef = useRef();

    const responsRef = useRef([]);
    const skillsRef = useRef([]);
    const skillsTagRef = useRef([]);
    const workTypeRef = useRef();
    const levelRef = useRef();
    const durationRef = useRef();
    const partialTimeRef = useRef();
    // ref={e=>responsRef.current[index]=e}
    // qtyRef.current[index].value = 0;
    const handle_post = ()=>{
        try {
            if (titleRef.current.value && descRef.current.value && workTypeRef.current.value && ((fixedPayChecked && fixedPayRef.current.value) ||(partialPayChecked && (partialPayRateRef.current.value && partialTimeRef.current.value))))
            {
                let form_data = {};
                // form_data = jobDescription;
                if (titleRef.current.value) {
                    form_data.title = titleRef.current.value;
                }
                if (descRef.current.value) {
                    form_data.description = descRef.current.value;
                }
                if (fixedPayChecked && fixedPayRef.current.value) {
                    form_data.fixed_price = fixedPayRef.current.value;
                }
                if (partialPayChecked && partialPayRateRef.current.value) {
                    form_data.partialPayRate = partialPayRateRef.current.value;
                }
                let arr = [];
                for (let i = 0; i < responsRef.current.length; i++) {
                    if (responsRef.current[i].value) {
                        arr.push(responsRef.current[i].value);
                    }
        
                }
                form_data.responsibilities = arr;
                arr = [];
                for (let i = 0; i < skillsRef.current.length; i++) {
                    if (skillsRef.current[i].value) {
                        arr.push(skillsRef.current[i].value);
                    }
                }
                form_data.skills = arr;
                arr = [];
                for (let i = 0; i < skillsTagRef.current.length; i++) {
                    if (skillsTagRef.current[i].value) {
                        arr.push(skillsTagRef.current[i].value);
                    }
                }
                form_data.skillsTag = arr;
                if (workTypeRef.current.value) {
                    form_data.work_type = workTypeRef.current.value;
                }
                // console.log(levelRef.current);
                if (levelRef.current.value) {
                    form_data.level = levelRef.current.value;
                }
                // console.log(partialTimeRef.current);
                if (partialPayChecked && partialTimeRef.current.value) {
                    form_data.partial_time = partialTimeRef.current.value;
                }
                if (durationRef.current.value && durationValueRef.current.value) {
                    form_data.duration = durationValueRef.current.value+' '+durationRef.current.value;
                }
                // console.log(form_data);
                form_data.post_time = Date.now();
                form_data.id = data[data.length-1].id+1;
                setJobDescription(form_data);
                let temp = data;
                temp.push(form_data);
                setData(temp); // setting job data
                setCurrentTime(Date.now());
                reset_btn();
                closeModalRef.current.click();
                handleFormSubmissionEffect();
                setTimeout(() => {
                    handleFormSubmissionEffect()
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleInputField = (e,field_name)=>{
        // let form_data = {...jobDescription};
        // if (field_name==='title' && e.target.value !== '') {
        //     form_data.title = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='description' && e.target.value !== '') {
        //     form_data.description = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='fixedPay' && e.target.value !== '') {
        //     form_data.fixed_price = e.target.value;
        //     form_data.partialPayRate = '';
        //     setJobDescription(form_data);
        // }
        // if (field_name==='partial_amount' && e.target.value !== '') {
        //     form_data.partialPayRate = e.target.value;
        //     form_data.fixed_price = '';
        //     setJobDescription(form_data);
        // }
        // if (field_name==='partial_time') {
        //     form_data.hrs_week = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='work_type') {
        //     form_data.work_type = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='level') {
        //     form_data.level = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='duration_value' && e.target.value !== '') {
        //     form_data.duration_value = e.target.value;
        //     setJobDescription(form_data);
        // }
        // if (field_name==='duration_period') {
        //     form_data.duration_period = e.target.value;
        //     setJobDescription(form_data);
        // }
    }
    const handleInputNum = (data,name)=>{
        let temp  = [...data];
        temp.push('r');
        if (name === 'res') {
            setResInputNum(temp)
        }
        if (name === 'skills') {
            setSkillsInputNum(temp)
        }
        if (name === 'skillTag') {
            setSkillsTagInput(temp)
        }
    }
    const clear_btn = (ref)=>{
        ref.value = '';
    }
    const reset_btn = ()=>{
        titleRef.current.value = '';
        descRef.current.value = '';

        if (fixedPayChecked) {
            fixedPayRef.current.value = '';
        }
        if (partialPayChecked) {
            partialPayRateRef.current.value = '';
            partialTimeRef.current.value = '';
        }
        durationValueRef.current.value = '';
    
        for (let i = 0; i < responsRef.current.length; i++) {
            responsRef.current[i].value= '';
        }
        for (let i = 0; i < skillsRef.current.length; i++) {
            skillsRef.current[i].value= '';
        }
        for (let i = 0; i < skillsTagRef.current.length; i++) {
            skillsTagRef.current[i].value= '';
        }
        workTypeRef.current.value = '';
        levelRef.current.value = '';
        durationRef.current.value = '';

    }
    // console.log(data);
  return (
    <div>
        <div class="modal fade" id="hireModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title " id="exampleModalLabel">Create Job</h5>
                    </div>
                    <div>
                        <button className='btn btn-outline-secondary mx-3 px-1' onClick={()=>reset_btn()}>Reset Form</button>
                        <button type="button" ref={e=>closeModalRef.current=e} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h5>Title<span style={{color:'red'}}>*</span></h5>
                        </label>
                        <div class="col-sm-10 d-flex">
                            <input type="text" style={{border: input_validate ? '1px solid red':''}} class="form-control" id="title" ref={e=>titleRef.current=e}/>
                            <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(titleRef.current)}>clear</button>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Description<span style={{color:'red'}}>*</span></h6>
                        </label>
                        <div class="col-sm-10 d-flex">
                            <textarea class="form-control" id="description" rows="3" ref={e=>descRef.current=e}></textarea>
                            <button className='btn btn-outline-danger m-4' onClick={()=>clear_btn(descRef.current)}>clear</button>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Payment<span style={{color:'red'}}>*</span></h6>
                        </label>
                        <div class="col-sm-10">
                            <div className="">
                                <div className='row text-center'>
                                    <div className="col-4">
                                            <label >Fixed</label>
                                            <input type="radio" name='salary_option' className='form-check-input mx-2' onClick={()=>{
                                                setFixedPayChecked(true);
                                                setPartialPayChecked(false);
                                            }}/>
                                            <br />
                                            {fixedPayChecked ? <><input type="text" className='form-control m-2' ref={e=>fixedPayRef.current=e}/><button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(fixedPayRef.current)}>clear</button></> : ''}

                                    </div>
                                    <div className="col-8">
                                            <input type="radio" name='salary_option' className='form-check-input mx-2' onClick={()=>{
                                                setPartialPayChecked(true);
                                                setFixedPayChecked(false);
                                            }}/>
                                            <label >Partial</label>
                                            <br />
                                            {partialPayChecked ? <div className='row'>
                                            <div className="col">
                                                <input type="text" className='form-control my-3' placeholder='Amount' ref={e=>partialPayRateRef.current=e}/><button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(partialPayRateRef.current)}>clear</button>
                                            </div>
                                            <div className="col">
                                                <input type="text" className='form-control my-3' list='partialPaySchedule' placeholder='Select Time Interval' ref={e=>partialTimeRef.current=e}/>
                                                <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(partialTimeRef.current)}>clear</button>
                                                <datalist id='partialPaySchedule'>
                                                    <option value="Per Hour"></option>
                                                    <option value="Per Day"></option>
                                                    <option value="Per Month"></option>
                                                    <option value="Per Year"></option>
                                                </datalist>
                                            </div>
                                            </div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Work Type<span style={{color:'red'}}>*</span></h6>
                        </label>
                        <div class="col-sm-10 d-flex">
                            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." ref={(e)=>workTypeRef.current=e}/>
                            <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(workTypeRef.current)}>clear</button>
                            <datalist id="datalistOptions">
                                <option value="On Site"/>
                                <option value="Remote"/>
                                <option value="Hybrid"/>
                            </datalist>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Level</h6>
                        </label>
                        <div class="col-sm-10 d-flex">
                            <input class="form-control" list="levelListOptions"  placeholder="Type to search..." ref={(e)=>levelRef.current=e}/>
                            <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(levelRef.current)}>clear</button>
                            <datalist id="levelListOptions">
                                <option value="Entry level"/>
                                <option value="Intermediate"/>
                                <option value="Expert"/>
                            </datalist>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Duration</h6>
                        </label>
                        <div class="col-sm-10">
                            <div className='d-flex justify-contect-center align-items-center'>
                                <input type="number" ref={e=>durationValueRef.current=e} class="form-control" style={{width:'50%', marginRight:'10px'}} />
                                <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(durationValueRef.current)}>clear</button>
                                <input class="form-control" list="durationListOptions"  style={{width:'50%', marginLeft:'40px'}} placeholder="Select Options" ref={(e)=>durationRef.current=e}/>
                                <button className='btn btn-outline-danger mx-2' onClick={()=>clear_btn(durationRef.current)}>clear</button>
                                <datalist id="durationListOptions">
                                    <option value="DAY"/>
                                    <option value="MONTH"/>
                                    <option value="YEAR"/>
                                </datalist>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Responsibility</h6>
                        </label>
                        <div class="col-sm-10">
                            {resInputNum && resInputNum.length>0 ? resInputNum.map((data,index)=>{
                                return <div className='d-flex'><input ref={e=>responsRef.current[index]=e} type="text" class="form-control mt-2"/>
                                <button className='btn btn-outline-danger m-2' onClick={()=>clear_btn(responsRef.current[index])}>clear</button></div>
                            }) :''}
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-secondary my-3' onClick={()=>handleInputNum(resInputNum,'res')}>Add More</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Skills</h6>
                        </label>
                        <div class="col-sm-10">
                            {skillsInputNum && skillsInputNum.length>0 ? skillsInputNum.map((skill,index)=>{
                                return <div className='d-flex'><input type="text" ref={e=>skillsRef.current[index]=e} class="form-control mt-2" placeholder={index==0 ? 'example : Excellent communication skills in English' : ''}/><button className='btn btn-outline-danger m-2' onClick={()=>clear_btn(skillsRef.current[index])}>clear</button></div>
                            }) : ''}
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-secondary my-3' onClick={()=>handleInputNum(skillsInputNum,'skills')}>Add More</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label position-relative">
                            <h6>Add Skills Tag</h6>
                        </label>
                        <div class="col-sm-10">
                            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                                {skillsTagInput && skillsTagInput.length>0 ? skillsTagInput.map((tag,index)=>{
                                    return <><input type="text" ref={e=>skillsTagRef.current[index]=e} class="form-control mx-2" style={{width:'100px'}}/><br/><br/></>
                                }) : ''}
                            </div>
                            
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-secondary my-3' onClick={()=>handleInputNum(skillsTagInput,'skillTag')}>Add More</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-success' onClick={()=>handle_post()}>Post</button>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HireModal