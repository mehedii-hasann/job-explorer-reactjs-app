

const Card = ({card_data,handleModalData})=>{
    const {id,title,description,fixed_price,partialPayRate,partial_time,level,other,post_time,responsibilities,skills,skillsTag,work_type,duration} = card_data;
    const card_style = {
        width: '22rem',
        margin: '10px 0px'
    }
    const preview_style = {
        height:'50px',
        width:'100%',
        background:'grey',
        position:'absolute',
        top:'82%',
        cursor: 'pointer'
    }
    return (
      <div class="card mx-1 position-relative" style={card_style}>
        <div class="card-body">
          {title ? <h5 class="card-title">{title}</h5> : ''}
          <h6 class="card-subtitle mb-2 text-muted">
            {(skillsTag && skillsTag.length>0) ? skillsTag.map(data=>{
                return <span className="badge bg-secondary m-1">{data}</span>
            }) : ''}
          </h6>
          {description && description.length>0 ? <p class="card-text">{description.slice(0,120)+"..."}</p> : ''}
        </div>
        <p className="text-center rounded" style={preview_style} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleModalData(card_data)}>Quick View</p>
      </div>
    )
  }

  export default Card