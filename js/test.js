return `
    <div class="card trash-card px-2 pt-4 d-flex flex-column justify-content-between shadow >
        <div class="d-flex align-items-start flex-column flex-lg-row">
            <div class="fw-bold d-lg-none">Delete date</div>
            <div class="date">
                ${task.deleteDate}
            </div>
            <div class="fw-bold d-lg-none mt-1">Deleted from</div>
            <div  class="status text-capitalize">
                ${task.deletedFrom}
            </div>
            <div class="fw-bold d-lg-none  mt-1">Category</div>
            <div class="category text-capitalize">
                ${task.category}
            </div>
            <div class="fw-bold d-lg-none mt-1">Title</div>
            <div class="title">
                ${task.title}
            </div>            
            <div class="fw-bold d-lg-none mt-1">Description</div>
            <div class="description d-inline-block">
                ${task.description.slice(0, 97) + '...'}
            </div>            
            <div class="fw-bold d-lg-none  mt-1">Assigned to</div>
            <div class="assignedTo d-flex flex-column align-items-start ">
                ${getTeam(i)}
            </div>
        </div>
        ${trashButtons(i)}
    </div>
    `;