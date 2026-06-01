window.addEventListener("load", function() {
    let loadingSquare = document.querySelector(".loading-square");
    loadingSquare.classList.add("stop");

    loadingSquare.addEventListener("transitionend", function() {
        loadingSquare.remove();
    });

    const elements = document.querySelectorAll('.animate-me');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });

    elements.forEach((element) => {
        observer.observe(element);
    });
});


document.addEventListener('DOMContentLoaded', function(event) {
    let header = document.querySelector(".header");
    let logospan = document.querySelector(".logo > .last");
    let links = document.querySelectorAll(".navbar > .links a");
    let s_links = document.querySelectorAll(".sidebar > .links a");
    let sections = document.querySelectorAll("section");
    let sidebar = document.querySelector(".sidebar");
    let menubar = document.querySelector(".navbar > #menu-bar");
	let scrollbarWidth = getScrollbarWidth();
    let sectionsContainer = document.querySelector('.sections');
	sectionsContainer.style.width = `calc(100vw - ${scrollbarWidth}px)`;

	window.addEventListener("resize", () => {
		if(window.innerWidth >= 650) {
			sidebar.classList.remove("active");
			document.body.style.overflowY = 'scroll';
			menubar.classList.remove("active");
			updateHeader();
		}
	});

    const scrollOffset = 150;

	menubar.onclick = toggleSidebar;

	s_links.forEach(l => {
		l.onclick = hideSidebar;
	});

    function updateActiveLinks() {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - scrollOffset;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if (top >= offset && top < offset + height) {
                links.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('.navbar > .links a[href*=' + id + ']').classList.add('active');
                });

                s_links.forEach(s_link => {
                    s_link.classList.remove('active');
                    document.querySelector('.sidebar > .links a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    }

    function toggleHeader(activeWhen) {
        if(activeWhen) {
            header.classList.add("active");	
            logospan.classList.add("active");
        } else {
            header.classList.remove("active");
            logospan.classList.remove("active");
        }
    }

    function updateHeader() {
        toggleHeader(window.scrollY > 0);
    }

    updateActiveLinks();
    updateHeader();

    window.addEventListener("scroll", function(event) {
        updateActiveLinks();
        updateHeader();
    });

    function hideSidebar() {
        sidebar.classList.remove("active");
        document.body.style.overflowY = 'scroll';
        menubar.classList.remove("active");
        updateHeader();
    }

    function toggleSidebar() {
        if(sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
            document.body.style.overflowY = 'scroll';
            menubar.classList.remove("active");
            updateHeader();
        } else {
            document.body.style.overflowY = 'hidden';
            sidebar.classList.add("active");
            header.classList.add("active");	
            logospan.classList.add("active");
            menubar.classList.add("active");
        }
    }
});

function getScrollbarWidth() {
    const outer = document.createElement('div');
    
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    outer.style.width = '100px';
    outer.style.height = '100px';

    document.body.appendChild(outer);

    const scrollbarWidth = outer.offsetWidth - outer.clientWidth;

    document.body.removeChild(outer);

    return scrollbarWidth;
}
