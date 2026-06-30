const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll(
    ".service-card, .stat-card, .industry-grid div, .partner-grid div"
).forEach(el=>{

    el.classList.add("hidden");
    observer.observe(el);

});