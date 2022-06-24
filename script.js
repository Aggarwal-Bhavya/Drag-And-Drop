const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

//looping over our draggable components so as to adjust opacity and adding another class name dragging to refernce in motion element
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  })
  
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  })
})

//responsible for rearranging components in conatiner and managing the dragged element
//at an instance of time, only one element is being dragged so only one component haves 'dragging' class to it and we work with it
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if(afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  })
})

//creating a function to determine where in the container we are right now
//since we can drag and drop between previous elements, we need to know our exact location or nearby element to decide current insertion
function getDragAfterElement(container, y) {
//we are selecting all elements inside of our conatiner except the one which is currently in motion 
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    //when we are above our element = negative nos
    //when we are below an element = positive no
    //when we are below all the elements of a container = positive no
    const offset = y - box.top - box.height / 2;
    //we only want negative offsets because that means we are hovering over an element but we also want them to as close to 0 as possible
    if(offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest;
    }
    console.log(offset);
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}