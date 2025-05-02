import FooterComponent from "../ui/components/footer/footerComponent.js";
import HeaderComponent from "../ui/components/header/headerComponent.js";


function AgregarFooterYHeader()
{
    const linkHeader = document.createElement('link');
    linkHeader.rel = 'stylesheet';
    linkHeader.href = '../../ui/components/header/headerComponent.css'; // agrega el css
    document.head.appendChild(linkHeader);

    const linkFooter = document.createElement('link');
    linkFooter.rel = 'stylesheet';
    linkFooter.href = '../../ui/components/footer/footerComponent.css';
    document.head.appendChild(linkFooter);

    const linkFonts = document.createElement('link');
    linkFonts.rel = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
    document.head.appendChild(linkFonts);

    const linkSweetAlert = document.createElement('script');
    linkSweetAlert.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(linkSweetAlert);
    

    HeaderComponent();
    FooterComponent();
}

AgregarFooterYHeader();